export interface AuthModel {
  api_token: any
  refreshToken?: any
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

// export interface UserModel {
//   id: number
//   username: string
//   password: string | undefined
//   email: string
//   first_name: string
//   last_name: string
//   fullname?: string
//   occupation?: string
//   companyName?: string
//   phone?: string
//   roles?: Array<number>
//   pic?: string
//   language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
//   timeZone?: string
//   website?: 'https://keenthemes.com'
//   emailSettings?: UserEmailSettingsModel
//   auth?: AuthModel
//   communication?: UserCommunicationModel
//   address?: UserAddressModel
//   socialNetworks?: UserSocialNetworksModel
// }

export interface UserModel{
  // UserId: number;
  //   Uname: string;
  //   EmailId: string;
  //   Image: string;
  //   DeviceARN: string;
  //   DeviceOS: string;
  //   UserRole: string;
  //   IsFirstTime: boolean;
  _id: { $id: string };
  UserId: number;
  UserName: string;
  EmailId: string;
  DeviceARN: string;
  FCMToken: string;
  DeviceOS: string;
  UserRole: string;
  Image: string;
  Date: string;
  Time: string;
}

export interface ICreateAppData {
  appBasic: {
    appName: string;
    appType: 'Quick Online Courses' | 'Face to Face Discussions' | 'Full Intro Training';
  };
  appFramework: string;
  appDatabase: string;
  appStorage: string;
}

export interface User {
  function:string,

  Uname: string;
  EmailId: string;
  Image: string;
  DeviceARN: string;
  DeviceOS: string;
  UserRole: string;
  IsFirstTime: boolean;
}