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
import { stringList } from "aws-sdk/clients/datapipeline";

export class Terminal {
    TerminalName: string;
    IsPrivate: boolean;
    Status: string;
    Description: string;
    Image: string;
    TerminalLogo: string;
    FormId: string;
    WrioCode: string;
    TermType: string;
    TerminalAccessKey: string;

    constructor() {
        this.TerminalName = '';
        this.IsPrivate = false;
        this.Status = '';
        this.Description = '';
        this.Image = '';
        this.TerminalLogo = '';
        this.FormId = '';
        this.WrioCode = '';
        this.TermType = '';
        this.TerminalAccessKey = '';
    }
}

export class TerminalDetail {
    Id: string;
    SessionId: string;
    TerminalName: string;
    BusinessName: string;
    AccountId: string;
    Image: string;
    FormName: string;
    BusinessDescription: string;
    TerminalId: number;
    FT: string;
    TerminalImageLinks: Array<string>;
    WebLink: string;
    DeliveryCharges: number;
    MinimumTotalforDeliveryCharges: number;
    Name: string;
    EmailId: string;
    MobileNo: number;
    Address: string;
    City: string;
    WrioCode: string;
    Zip: number;
    State: string;
    Country: string;
    TerminalAccessKey: string;
    CheckedIn: string;
    TransactionToken: string;
    Pay: string;
    FormField: Array<FormField>;
    Sections: Array<Section>;
    MarkNoOrder: Array<NoOrder>;
    TimeSlots: Array<TimeSlots>;
    PromoCodes: Array<PromoCode>;
    PromoValue: number;
    ServiceGroups: Array<ServiceGroups>;
    Disclaimer: string;
    CurrencySymbol: string;
    AllowNoOrder: boolean;
    CN: string;
    AskComment: string;
    CommentMessage: string;
    OrderAssure: boolean;
    OrderAssureMessage: string;
    SalesBeatCollection: string;
    SSCN: string;

    constructor() {
        this.Id = '';
        this.SessionId = '';
        this.TerminalName = '';
        this.BusinessName = '';
        this.AccountId = '';
        this.Image = '';
        this.FormName = '';
        this.BusinessDescription = '';
        this.TerminalId = 0;
        this.FT = '';
        this.TerminalImageLinks = [];
        this.WebLink = '';
        this.DeliveryCharges = 0;
        this.MinimumTotalforDeliveryCharges = 0;
        this.Name = '';
        this.EmailId = '';
        this.MobileNo = 0;
        this.Address = '';
        this.City = '';
        this.WrioCode = '';
        this.Zip = 0;
        this.State = '';
        this.Country = '';
        this.TerminalAccessKey = '';
        this.CheckedIn = '';
        this.TransactionToken = '';
        this.Pay = '';
        this.FormField = [];
        this.Sections = [];
        this.MarkNoOrder = [];
        this.TimeSlots = [];
        this.PromoCodes = [];
        this.PromoValue = 0;
        this.ServiceGroups = [];
        this.Disclaimer = '';
        this.CurrencySymbol = '';
        this.AllowNoOrder = false;
        this.CN = '';
        this.AskComment = '';
        this.CommentMessage = '';
        this.OrderAssure = false;
        this.OrderAssureMessage = '';
        this.SalesBeatCollection = '';
        this.SSCN = '';
    }
}

export class FormField {
    id: string;
    M: string;
    FN: string;
    DT: string;
    KT: string;
    SQ: number;
    Values: Array<Value>;

    constructor() {
        this.id = '';
        this.M = '';
        this.FN = '';
        this.DT = '';
        this.KT = '';
        this.SQ = 0;
        this.Values = [];
    }
}

export class Value {
    DV: string;
    Data: string;

    constructor() {
        this.DV = '';
        this.Data = '';
    }
}

export class Section {
    SectionID: string;
    SectionName: string;
    SQ: number;
    Available_QTY: number;
    Image: string;
    Visible: boolean;
    SectionTotal: number;
    QTY: number;
    Items: Array<Item>;

    constructor() {
        this.SectionID = '';
        this.SectionName = '';
        this.SQ = 0;
        this.Available_QTY = 0;
        this.Image = '';
        this.Visible = false;
        this.SectionTotal = 0;
        this.QTY = 0;
        this.Items = [];
    }
}

export class Item {
    Id: string;
    section_Id: string;
    section_Email: string;
    Barcode: string;
    FN: string;
    Image: string;
    Price: number;
    QTY: number;
    Tag: string;
    MRP: string;
    UnitOfSale: string;
    Ref1_Label: string;
    Ref1_Desc: string;
    Ref2_Label: string;
    Ref2_Desc: string;
    stockColor: string;
    remainingStockQuantity: number;
    hideStock: boolean;
    stockIcon: string;

    constructor() {
        this.Id = '';
        this.section_Id = '';
        this.section_Email = '';
        this.Barcode = '';
        this.FN = '';
        this.Image = '';
        this.Price = 0;
        this.QTY = 0;
        this.Tag = '';
        this.MRP = '';
        this.UnitOfSale = '';
        this.Ref1_Label = '';
        this.Ref1_Desc = '';
        this.Ref2_Label = '';
        this.Ref2_Desc = '';
        this.stockColor = '';
        this.remainingStockQuantity = 0;
        this.hideStock = false;
        this.stockIcon = '';
    }
}

export class NoOrder {
    section_Id: string;
    section_Email: string;
    FId: string;
    Fname: string;
    price: string;
    Qty: string;

    constructor() {
        this.section_Id = '';
        this.section_Email = '';
        this.FId = '';
        this.Fname = '';
        this.price = '';
        this.Qty = '';
    }
}

export class TimeSlots {
    SlotDate: string;
    SlotDay: string;
    Slotes: Array<Slot>;

    constructor() {
        this.SlotDate = '';
        this.SlotDay = '';
        this.Slotes = [];
    }
}

export class Slot {
    Time: any;
    IsAvailable: boolean;
    Id: string;

    constructor() {
        this.Time = null;
        this.IsAvailable = false;
        this.Id = '';
    }
}

export class GetValueSlotData {
    GroupId: string;
    FormId: string;
    SlotDate: string;

    constructor() {
        this.GroupId = '';
        this.FormId = '';
        this.SlotDate = '';
    }
}

export class ServiceGroups {
    Name: string;
    Description: string;
    Id: string;

    constructor() {
        this.Name = '';
        this.Description = '';
        this.Id = '';
    }
}

export class PromoCode {
    TerminalId: number;
    PromoCode: string;
    isFlat: boolean;
    PromoValue: number;
    PreCondition: string;
    PreConditionValue: number;
    Validity: string;

    constructor() {
        this.TerminalId = 0;
        this.PromoCode = '';
        this.isFlat = false;
        this.PromoValue = 0;
        this.PreCondition = '';
        this.PreConditionValue = 0;
        this.Validity = '';
    }
}
