'use client';

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import DataTable from "../components/Table";
import Sidebar from "../components/sidebar";
import { getAllUsers } from "../components/services/userService";


export default function GetUserInfo() {
  // const { authToken } = useContext(AuthContext);

  const openModal = () => {
    alert("hiii"); 
    };

  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  // const router = useRouter();
  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response); // The returned value from getAllUsers() should be the array of users
    } catch (err) {
      setError("خطا در دریافت اطلاعات کاربران");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const userColumns = [
    { label: "شناسه", key: "id", hidden: false },
    { label: "نام", key: "firstName", hidden: false },
    { label: "نام خانوادگی", key: "lastName", hidden: false },
    { label: "کد ملی", key: "nationalCode", hidden: false },
    { label: "ادمین است؟", key: "isAdmin", is_binary: true, hidden: false },
    { label: "مشتری است؟", key: "isCustomer", is_binary: true, hidden: false },
  ];

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div id="tabs" className="mr-auto w-4/5 p-20 h-screen overflow-scroll bg-main-200">
        <h2>به داشبورد خوش آمدید</h2>
        <DataTable data={users} columns={userColumns} />
      </div>
    </div>
  );
}
