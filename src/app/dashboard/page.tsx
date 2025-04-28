'use client';

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
// import { useRouter } from 'next/navigation';
import Sidebar from "../components/sidebar";
export default function GetUserInfo() {
  // const { authToken } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  // const router = useRouter();



  return (
    <div className="flex justify-between">
      <Sidebar />
      <div id="tabs" className="mr-auto w-4/5 p-20 h-screen overflow-scroll bg-main-200">
        <h2>به داشبورد خوش آمدید</h2>
      </div>
    </div>
  );
}
