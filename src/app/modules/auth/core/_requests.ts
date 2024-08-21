import axios from "axios";
import { AuthModel, TerminalDetail, User, UserModel } from "./_models";


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
export const setMobileNo = async (no: any) => {
  sessionStorage.setItem('MobileNo', JSON.stringify(no));
}

export function search(terminalName: any) {
  const url = `https://api.checkmeinweb.com/APIv2/ClientFunctions.php?function=SearchTerminal&SearchString=${terminalName}`;
  return axios.get(url).then(response => response.data).catch(error => {
    console.error("Error during search:", error);
    throw error;
  });
}
export function getProductById(wiroid: any) {
  const url = `https://api.checkmeinweb.com/APIv2/ClientFunctions.php?function=GetTerminalFormDetails&TerminalId=${wiroid}`;
  return axios.get(url);
}
// export function getTerminalById(wiroid: any) {
//   const url = `https://api.checkmeinweb.com/APIv2/ClientFunctions.php?function=GetTerminalFormDetails&TerminalId=${wiroid}`;
//   return axios.get(url);
// }
export const getTerminalById = async (wiroid: any): Promise<TerminalDetail> => {
  const response = await axios.get<TerminalDetail>(`https://api.checkmeinweb.com/APIv2/ClientFunctions.php?function=GetTerminalFormDetails&TerminalId=${wiroid}`);
  return response.data;
};

// export function getAccountInfo(accountId: any) {
//   const url = `https://api.checkmeinweb.com/APIv2/ClientFunctions.php?function=GetAccountInfo&AccountId=${accountId}`;
//   return axios.get(url);
// }
export const getAccountInfo = async (accountId: string): Promise<TerminalDetail> => {
  const response = await axios.get<TerminalDetail>(`https://api.checkmeinweb.com/APIv2/ClientFunctions.php?function=GetAccountInfo&AccountId=${accountId}`);
  return response.data;
};

export function deleteProfile(userId:any,Id: any) {
  // const url = `http://devapi.checkmeinweb.com/APIv2/ClientFunctions.php?function=DeleteProfile&UserId=${userId}&Id=${Id}`;
  const url=`https://api.checkmeinweb.com/APIv2/ClientFunctions.php?function=DeleteProfile&UserId=${userId}&Id=${Id}`
  return axios.get(url);
}

export function getAll() {
  const url = `https://api.checkmeinweb.com/APIv2/getAdsSlideShow.php`;
  return axios.get(url);
}
export function getUserProducts(userId:any){
  const url = `https://api.checkmeinweb.com/APIv2/getRecentTerminalsForUser.php?UserId=${userId}`;
  return axios.get(url);
}

export function getrecentsearch(userId: any) {
  const url = `https://api.checkmeinweb.com/APIv2/getRecentTerminalsForUser.php?UserId=${userId}`;
  return axios.get(url);
}

export function getUserCheckInLog(userId: any,startDate:any,endDate:any) {
  const url = `https://api.checkmeinweb.com/APIv2/ClientFunctions.php?function=GetUserCheckInLog&UserId=${userId}&StartDate=${startDate}&EndDate=${endDate}`;
  return axios.get(url);
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
export function UserRegisterIn(user: User) {
  const url = 'https://api.checkmeinweb.com/APIv2/ClientFunctions.php';
  return axios.post(url, user);
}
export function UserRegister (user: User) {

  const body = new FormData();
  body.append('function', 'UserLoginOrRegister');
  body.append('Uname', user.Uname);
  body.append('EmailId', user.EmailId);
  body.append('Image', user.Image);
  body.append('DeviceARN', user.DeviceARN);
  body.append('DeviceOS', user.DeviceOS);
  body.append('UserRole', user.UserRole);

  const url = `https://api.checkmeinweb.com/APIv2/ClientFunctions.php`;
  return axios.post(url, user);
};

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken() {
  sessionStorage.getItem('CurrentUserInfo');
  // return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
  //   api_token: token,
  // });
}
