import React from "react";
import { Form, Input, DatePicker, Button, Select, message } from "antd"; // Import Select from Ant Design
import { addDoc, collection } from "firebase/firestore";
import { db } from "../App/Firebase/firebase";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { useForm } from 'antd/lib/form/Form';


const { Option } = Select; // Destructure Option from Select

const ReservationForm = () => {
  const [form] = useForm(); // Get the form instance
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";



  const onFinish = async (values) => {
    try {
      messageApi.open({
        key,
        type: "loading",
        content: "Loading...",
      });
      const bookingsCollection = collection(db, "bookings");
      const formattedValues = {
        name: values.name,
        checkIn: Timestamp.fromDate(values.checkIn.toDate()),
        checkOut: Timestamp.fromDate(values.checkOut.toDate()),
        roomNumber: values.roomNumber, // Get the selected room number
      };
      await addDoc(bookingsCollection, formattedValues);
      console.log("Booking added to Firestore:", formattedValues);
      form.resetFields(); // Use resetFields method
      messageApi.open({
        key,
        type: "success",
        content: "Loaded!",
        duration: 2,
      });
    } catch (error) {
      console.error("Error adding booking to Firestore:", error);
    }
  };

  return (
    <>
      {contextHolder}
      <h1 className="heading">Hotel Reservation System</h1>
      <Form
        form={form}
        name="reservation_form"
        className="reservation-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="checkIn"
          label="Check-In Date"
          rules={[
            {
              required: true,
              message: "Please select your check-in date",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="checkOut"
          label="Check-Out Date"
          rules={[
            {
              required: true,
              message: "Please select your check-out date",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="roomNumber"
          label="Room Number"
          rules={[
            {
              required: true,
              message: "Please select a room number",
            },
          ]}
        >
          <Select>
            <Option value="101">101</Option>
            <Option value="102">102</Option>
            <Option value="103">103</Option>
            {/* Add more room options as needed */}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Reserve
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ReservationForm;
