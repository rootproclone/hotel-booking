import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, Select, Modal, message } from "antd";
import { addDoc, collection,setDoc,doc } from "firebase/firestore";
import { db } from "../App/Firebase/firebase";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import dayjs from "dayjs";

const EditTable = ({ itemEdit, onClose }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(itemEdit !== null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const formatTimestamp = (timestamp) => {
    return format(timestamp, "yyyy-MM-dd"); // Customize the date format as needed
  };

  // Use useEffect to update form fields when itemEdit changes
  useEffect(() => {
    if (itemEdit) {
      form.setFieldsValue({
        name: itemEdit.name,
        checkIn: dayjs(
          formatTimestamp(itemEdit.checkIn.toDate()),
          "YYYY-MM-DD"
        ), // Convert to Date object
        checkOut: dayjs(
          formatTimestamp(itemEdit.checkOut.toDate()),
          "YYYY-MM-DD"
        ), // Convert to Date object
        roomNumber: itemEdit.roomNumber,
      });
    }
  }, [itemEdit, form]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(false);
        setVisible(false);
        onFinish(values);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setVisible(false);
    onClose(null);
  };


  const onFinish = async (values) => {
    try {
      message.loading({ content: "Updating...", key: "loading" });
  
      const formattedValues = {
        name: values.name,
        checkIn: Timestamp.fromDate(values.checkIn.toDate()),
        checkOut: Timestamp.fromDate(values.checkOut.toDate()),
        roomNumber: values.roomNumber,
      };
      console.log(formattedValues);
      const docRef = doc(db, "bookings", itemEdit.id); // Specify the ID of the document to update
  
      await setDoc(docRef, formattedValues); // Use setDoc to update the document
  
      message.success({ content: "Updated!", key: "loading", duration: 2 });
      handleCancel(); // Close the modal or do any other necessary actions after the update
    } catch (error) {
      console.error("Error updating booking in Firestore:", error);
      message.error("Error updating booking in Firestore", 5);
      handleCancel(); // Close the modal or do any other necessary actions after the update

    }
  };


  return (
    <>
      <Modal
        title="Edit Table"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} name="reservation_form" onFinish={onFinish}>
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
              <Select.Option value="101">101</Select.Option>
              <Select.Option value="102">102</Select.Option>
              <Select.Option value="103">103</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditTable;
