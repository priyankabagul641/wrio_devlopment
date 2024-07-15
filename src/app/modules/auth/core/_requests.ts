import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function login(mobile: any, otp: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    mobile,
    otp,
  });
}

// Server should return AuthModel
export function register(
  mobile: any,
    otp: any,
) {
  return axios.post(REGISTER_URL, {
    mobile:mobile,
    otp:otp,
  });
}

export const sendOtp = async (mobile: string) => {
  const url = `https://api.checkmeinweb.com/APIv2/OTP/?CountryCode=91&MobileNo=${mobile}`;
  return axios.get(url);
}

// Function to verify OTP
export const verifyOtp = async ( otp: string,mobile: string) => {
  const url = `https://api.checkmeinweb.com/APIv2/OTP/auth_OTP_app/index.php?OTP=${otp}&MobileNo=91${mobile}`;
  return axios.get(url);
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
