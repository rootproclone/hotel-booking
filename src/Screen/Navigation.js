import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons"; // Import Ant Design icons

const Navigation = () => {
  const userToken = localStorage.getItem("userToken");

  return (
    <Menu mode="horizontal" theme="light" className="ant-menu">
      <Menu.Item key="login">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/booking-list">Booking</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/sign-in">About</Link>
      </Menu.Item>
      <Menu.Item key="login">
        <Link to="/sign-in">Contact Us</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
