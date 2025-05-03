'use client';

import { useState, useRef, FormEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/utils';
import VantaBackground from '../VantaBackground';
import { SVGArrow , SVGEye , SVGBlind} from '@/svg';
import OtpModal from '@/app/components/OtpModal';
import OtpInput from '@/app/components/OtpInput';
import { sendOTP , loginWithOTP } from '../components/services/userService';


const LoginPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');


  // const handlePhoneSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError('');

  //   if (!phone) {
  //     setError('Please enter your.');
  //     return;
  //   }
  //   try {
  //     const response = await axios.post('http://localhost/ara-backend/public/api/sendotp', {
  //       phone_number: phone,
  //     });
  //     setIsModalOpen(true); // Open modal to enter OTP
  //   } catch (err) {
  //     console.error('Login error:', err);
  //     setError('خطا در ارسال کد. لطفاً دوباره تلاش کنید.');
  //   }
  // };
  const handlePhoneSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!phone) {
      setError('Please enter your.');
      return;
    }
    try {
      await sendOTP(phone);
      setIsModalOpen(true);
    } catch (err) {
      setError('خطا در ارسال کد');
    }
  };

  

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow only digits and update the phone state
    const phoneDigitsOnly = /^\d*$/; // Only numeric characters allowed
    if (phoneDigitsOnly.test(inputValue)) {
      setPhone(inputValue);
    }
  
    // Validation on each key press
    if (!inputValue.trim()) {
      setError('لطفاً شماره همراه خود را وارد کنید.');
    } else if (!phoneDigitsOnly.test(inputValue)) {
      setError('شماره همراه فقط باید شامل ارقام باشد.');
    }else if (!inputValue.startsWith('09')) {
      setError('شماره همراه باید با 09 شروع شود.');
    } else if (inputValue.length !== 11) {
      setError('شماره همراه باید ۱۱ رقم باشد.');
    }else {
      setError('');  // Clear error when input is valid
    }
  };



  // const handleOtpSubmit = async () => {
  //   setError('');
  //   try {
  //     const response = await axios.post('http://localhost/ara-backend/public/api/loginotp', {
  //       phone_number: phone,
  //       otp_code: otp,
  //     });
  //     setCookie('authToken', response.data.access_token);
  //     setIsModalOpen(false);
  //     // router.push('/dashboard');
  //     setTimeout(() => {
  //       router.push('/');
  //     }, 2000); // 200ms delay
  //   } catch (err) {
  //     setError('کد وارد شده اشتباه است.');
  //   }
  // };
  
  const handleOtpSubmit = async () => {
    setError('');
    try {
      const token = await loginWithOTP(phone, otp);
      setCookie('authToken', token);
      setIsModalOpen(false);
      setTimeout(() => {
        router.push('/');
      }, 2000); // 200ms delay
    } catch (err) {
      setError('کد وارد شده اشتباه است.');
    }
  };
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <VantaBackground />
      <section className="relative z-10 flex items-center justify-center p-4 min-h-screen bg-transparent">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex flex-col items-center mb-6">
            <h1 className="mt-4 text-xl font-semibold text-dark-700 dark:text-white">
              شماره همراه خود را وارد کنید
            </h1>
          </div>
          <form className="space-y-4" onSubmit={handlePhoneSubmit}>
            <div className="relative z-0 mb-5">
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                required
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-neutral-500 focus:outline-none focus:ring-0 focus:border-neutral-600 peer"
              />
              <label
                htmlFor="tel"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-neutral-600 peer-focus:dark:text-neutral-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                شماره همراه
              </label>

            </div>


            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full mt-5 text-white bg-dark-700 hover:bg-dark-800 focus:ring-4 focus:outline-none focus:ring-dark-300 font-medium text-sm px-5 py-4 text-center inline-flex justify-center gap-1 transition-all delay-100 cursor-pointer items-center dark:bg-dark-600 dark:hover:bg-dark-700 dark:focus:ring-dark-800"
            >
              ارسال کد
              <SVGArrow />
            </button>
          </form>
          <OtpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-lg font-bold mb-4 text-center text-dark-700 dark:text-white">کد تایید</h2>
            <OtpInput onChange={(code) => setOtp(code)} />
            {error && <p className="text-sm text-red-500 text-center mb-2">{error}</p>}
            <div className="flex justify-center gap-2 mt-5 ">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                انصراف
              </button>
              <button
                onClick={handleOtpSubmit}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                تایید
              </button>
            </div>
          </OtpModal>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
