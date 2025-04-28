'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils";
import GeneralModal from "./_modal";
import Navbar from "./components/NavBar";

interface Field {
  label: string;
  key: string;
  is_binary: boolean;
  render: null;
  hidden: boolean;
}
interface User {
  first_name: string;
  last_name: string;
  // Add other user fields if needed
}

const LandingPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [fields, setFields] = useState<Field[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const userProfileFields = [
    { label: "نام", key: "first_name", render: null, is_binary: false, hidden: false },
    { label: "نام خانوادگی", key: "last_name", render: null, is_binary: false, hidden: false },
    { label: "ایمیل", key: "email", render: null, is_binary: false, hidden: false },
    { label: "کد ملی", key: "national_code", render: null, is_binary: false, hidden: false }, // ✅ Add this!
  ];
  const getUserInfo = async () => {
    try {
      const authToken = getCookie('authToken');
      if (!authToken) {
        console.warn('No token found');
        return;
      }
  
      const response = await axios.post(
        'http://localhost/ara-backend/public/api/profile',
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      const userData = response.data.user;
      console.log('👀 userData:', userData);
      setUser(userData);
  
      const allFields = userProfileFields;
  
      // Initialize formData with values from userData
      const initialFormData: Record<string, any> = {};
      allFields.forEach((field) => {
        initialFormData[field.key] = userData[field.key] ?? "";
      });
  
      // Check if any field is missing
      const hasMissingFields = allFields.some((field) => !userData[field.key]);
  
      // If there are missing fields, show the modal, otherwise hide it
      if (hasMissingFields) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
  
      setFields(allFields);
      setFormData(initialFormData);
  
    } catch (err) {
      console.error('Error fetching user info:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleModalSubmit = async (data: Record<string, any>) => {
    try {
      const authToken = getCookie('authToken');
      if (!authToken) {
        console.warn('No token found');
        return;
      }

      // Merge existing user data with modal data
      const fullData = {
        first_name: data.first_name ?? user?.first_name ?? '',
        last_name: data.last_name ?? user?.last_name ?? '',
        national_code: data.national_code ?? user?.national_code ?? '',
        email: data.email ?? user?.email ?? '',
      };

      await axios.post(
        'http://localhost/ara-backend/public/api/updateprofile',
        fullData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      alert('اطلاعات با موفقیت ثبت شد');
      setShowModal(false);
      getUserInfo(); // Refresh user info after updating

    } catch (err) {
      console.error('Error updating profile:', err);
      alert('خطا در ثبت اطلاعات');
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  if (loading) return <div>در حال بارگذاری...</div>;
  return (
    <>
      <Navbar user={user} /> {/* Pass the user to Navbar */}
      <div className="p-10">
        <h1 className="text-2xl font-bold">خوش آمدید</h1>
        {user && (
          <div className="space-y-2">
            <p>آیدی: {user.id}</p>
            <p>شماره موبایل: {user.phones?.[0]?.number || 'نامشخص'}</p>
          </div>
        )}
        <GeneralModal
          fields={fields}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          formData={formData}
          theRout={{ type: "user", rout: "profile" }}
        />
      </div>
    </>
  );
};

export default LandingPage;
