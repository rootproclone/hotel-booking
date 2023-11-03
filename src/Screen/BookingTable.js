import React, { useState } from 'react';
import { Table,Button } from 'antd';
import { format } from 'date-fns';
import EditTable from './EditTable';



const formatTimestamp = (timestamp) => {
  return format(timestamp, 'yyyy-MM-dd HH:mm:ss'); // Customize the date format as needed
};

const BookingTable = ({ bookings,onReFresh }) => {
  const [editRecord, setEditRecord] = useState(null);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Check-In Date',
      dataIndex: 'checkIn',
      key: 'checkIn',
      render: (text, record) => formatTimestamp(record.checkIn.toDate()), // Format and display the date
    },
    {
      title: 'Check-Out Date',
      dataIndex: 'checkOut',
      key: 'checkOut',
      render: (text, record) => formatTimestamp(record.checkOut.toDate()), // Format and display the date
    },
    {
      title: 'Room Number',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <Button  type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditRecord(record);
    onReFresh();
  };

  return (
    <div className="booking-table-container">
      <h2>Booking List</h2>
      <Table columns={columns} dataSource={bookings} />
      {editRecord && <EditTable itemEdit={editRecord} onClose={() => setEditRecord(null)} />}
    </div>
  );
};

export default BookingTable;
