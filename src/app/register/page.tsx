'use client';

import { useState, useRef, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import VantaBackground from '../VantaBackground';
import { SVGArrow, SVGEye, SVGBlind } from '@/svg';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const password_confirmation = passwordConfirmRef.current?.value;

    if (!name || !email || !password || !password_confirmation) {
      setError('لطفا تمام فیلدها را پر کنید.');
      return;
    }

    if (password !== password_confirmation) {
      setError('رمز عبور با تکرار آن مطابقت ندارد.');
      return;
    }

    try {
      await axios.post('http://localhost/tarabaran/public/api/register', {
        name,
        email,
        password,
        password_confirmation,
      });
      router.push('/login');
    } catch (err) {
      console.error('Register error:', err);
      setError('ثبت‌نام ناموفق بود. لطفا اطلاعات را بررسی کنید.');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <VantaBackground />
      <section className="relative z-10 flex items-center justify-center p-4 min-h-screen bg-transparent">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex flex-col items-center mb-6">
            <h1 className="mt-4 text-xl font-semibold text-dark-700 dark:text-white">
              ثبت نام در سایت
            </h1>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative z-0 mb-5">
              <input
                ref={nameRef}
                type="text"
                name="name"
                id="name"
                placeholder=" "
                required
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-neutral-500 focus:outline-none focus:ring-0 focus:border-neutral-600 peer"
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-neutral-600 peer-focus:dark:text-neutral-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                نام کامل
              </label>
            </div>

            <div className="relative z-0 mb-5">
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="email"
                placeholder=" "
                required
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-neutral-500 focus:outline-none focus:ring-0 focus:border-neutral-600 peer"
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-neutral-600 peer-focus:dark:text-neutral-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                ایمیل
              </label>
            </div>

            <div className="relative z-0">
              <input
                ref={passwordRef}
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder=" "
                required
                className="block py-2.5 pl-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-neutral-500 focus:outline-none focus:ring-0 focus:border-neutral-600 peer"
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-neutral-600 peer-focus:dark:text-neutral-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                رمز عبور
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 flex items-center pr-2 focus:outline-none"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <SVGBlind /> : <SVGEye />}
              </button>
            </div>

            <div className="relative z-0">
              <input
                ref={passwordConfirmRef}
                type={showPasswordConfirm ? 'text' : 'password'}
                name="password_confirmation"
                id="password_confirmation"
                placeholder=" "
                required
                className="block py-2.5 pl-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-neutral-500 focus:outline-none focus:ring-0 focus:border-neutral-600 peer"
              />
              <label
                htmlFor="password_confirmation"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-neutral-600 peer-focus:dark:text-neutral-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                تکرار رمز عبور
              </label>
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute inset-y-0 left-0 flex items-center pr-2 focus:outline-none"
                aria-label="Toggle Password Visibility"
              >
                {showPasswordConfirm ? <SVGBlind /> : <SVGEye />}
              </button>
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full mt-5 text-white bg-dark-700 hover:bg-dark-800 focus:ring-4 focus:outline-none focus:ring-dark-300 font-medium text-sm px-5 py-4 text-center inline-flex justify-center gap-1 transition-all delay-100 cursor-pointer items-center dark:bg-dark-600 dark:hover:bg-dark-700 dark:focus:ring-dark-800"
            >
              ثبت نام
              <SVGArrow />
            </button>

            <p className="text-xs text-center text-gray-500">
              قبلا ثبت‌نام کرده‌اید؟{' '}
              <a
                href="/login"
                className="font-medium transition-all delay-100 hover:text-main dark:text-primary-500"
              >
                وارد شوید
              </a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
