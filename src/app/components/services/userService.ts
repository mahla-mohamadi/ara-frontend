import API from "../axiosInstance";

export const getUserProfile = async () => {
  const response = await API.post('/profile');
  return response.data.user;
};

export const updateUserProfile = async (data: Record<string, any>) => {
  return await API.post('/updateprofile', data);
};

export const sendOTP = async (phone: string) => {
  return await API.post('/sendotp', { phone_number: phone });
};

export const loginWithOTP = async (phone: string, otp: string) => {
  const response = await API.post('/loginotp', {
    phone_number: phone,
    otp_code: otp,
  });
  return response.data.access_token;
};
export const getAllUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data; 
  } catch (error) {
    throw new Error('Error fetching users');
  }
};