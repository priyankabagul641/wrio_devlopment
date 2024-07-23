import axios from "axios";
import { AuthModel, UserModel } from "./_models";


const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function login1(mobile: any, otp: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    mobile,
    otp,
  });
}

export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  });
}

// Server should return AuthModel
export function register(mobile: any, otp: any) {
  return axios.post(REGISTER_URL, {
    mobile,
    otp,
  });
}

export const sendOtp = async (mobile: string) => {
  const url = `https://api.checkmeinweb.com/APIv2/OTP/?CountryCode=91&MobileNo=${mobile}`;
  return axios.get(url);
}

// Function to verify OTP
export const verifyOtp = async (otp: string, mobile: string) => {
  const url = `https://api.checkmeinweb.com/APIv2/OTP/auth_OTP_app/index.php?OTP=${otp}&MobileNo=91${mobile}`;
  return axios.get(url);
}

export const setVerifiedOTPInfo = async (otpInfo: any) => {
  sessionStorage.setItem('OTPInfo', JSON.stringify(otpInfo));
}



export const getVerifiedOTPInfo = async () => {
  try {
    const otpInfoString = sessionStorage.getItem('OTPInfo');
    if (!otpInfoString) {
      throw new Error('No OTPInfo found in sessionStorage');
    }
    return JSON.parse(otpInfoString);
  } catch (error) {
    console.error('Error retrieving or parsing OTPInfo:', error);
    return null; // or handle the error as appropriate for your application
  }
}

export const clientLogin = async (emailId: any) => {

    // const fcmToken = localStorage.getItem('FCMToken');
    const fcmToken='c4ycAOwME0Ohm5sYda1dgQ:APA91bECJKU7v4GcuGSWVG4z7xIF317w_saIdCV8Y-C0e-whXE5YlclrT8j3exai3BnkkAMSNc__iaqaBZFQVFIfT3bSlEGOdgsEAr9X9XtmQCcyXxZDXdk-WmrJapM5vq7DpToiFnr5'
    // let deviceOs = localStorage.getItem("currentPlatform");
    let deviceOs = 'Windows Phone'
    const url = `https://api.checkmeinweb.com/APIv2/ClientFunctions.php?function=ClientLogin&Uname=@&EmailId=${emailId}&DeviceARN=${fcmToken}&DeviceOS=${deviceOs}&FCMToken=${fcmToken}`;

    return axios.get(url);
  
  
};

export function getProfiles(userId: number) {
  const url = `https://api.checkmeinweb.com/APIv2/ClientFunctions.php?function=GetProfile&UserId=${userId}`;
  return axios.get(url);
}

export function getUserAcccountInfo(userId: number) {
  const url = `https://api.checkmeinweb.com/APIv2/ClientFunctions.php?function=GetUserAccountImage&UserId=${userId}`;
  return axios.get(url);
}

export function UserLoginOrRegister(user: UserModel) {
  const url = 'https://api.checkmeinweb.com/APIv2/ClientFunctions.php';
  return axios.post(url, user);
}


// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}
