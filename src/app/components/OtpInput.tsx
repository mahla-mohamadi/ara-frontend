'use client';

import React, { useRef, useState , useEffect } from 'react';

interface OtpInputProps {
  length?: number;
  onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange }) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
  
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
    onChange(newOtp.join(''));
  
    // Move to next input AFTER state is updated
    if (value && index < length - 1) {
      setTimeout(() => {
        inputsRef.current[index + 1]?.focus();
      }, 10);
    }
  };
  

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);
  return (
    <div className="flex gap-2 justify-center">
      {otpValues.map((value, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
          className="w-12 h-12 text-center border border-gray-300 rounded text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />
      ))}
    </div>
  );
};

export default OtpInput;
