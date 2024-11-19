import { USER_ROLE } from "@/constant/role";
export type userRole = keyof typeof USER_ROLE;

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

// export type userRole = "SUPER_ADMIN" | "ADMIN";

export interface DrawerItem {
  title: string;
  path: string;
  icon?: React.ElementType;
  child?: DrawerItem[];
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};


export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages?: string | string[];
}

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
export type TBanner = {
  _id: string,
  images: string[],
  title: string;
  description: string,
};
export type TService = {
  _id: string,
  title:string,
  sub_title:string,
  description:string,
  category:string,
  images:string[],
};


export type TContact = {
  _id:string,
  name:string,
  phone:number,
  email:string,
  company_name:string,
  subject:string,
  message:string
}
export type TAbout = {
  _id:string,
  description: string;
  images: string[];
  meta_title:string,
  meta_description:string,
  meta_keywords:string[]
};
export type TBrand = {
  _id:string,
  images:string[],
  title:string,
}
export type TCompliance = {
  _id:string,
  images: string[];
  description: string;
  socialCompilianceImages: string[];
  social_compliance_title: string;
  social_compliance_description: string;
  EmployeesCocCovers: string[];
  zeroToleranceImages: string[];
  zeroTolerance_Title: string;
  zeroTolerance_description: string;
  codeOfConductImages: string[];
  cod_of_conduct_title: string;
  cod_of_conduct_short_description: string;
  cod_of_conduct_description: string;
  csr_description: string;
  csr_short_description: string;
  csr_title: string;
  csrImages: string[];
};
export type TWhoWeAre = {
  _id:string,
  title: string;
  description: string;
  images: string[];
  client: number;
  shipment: number;
  experience: number;
  visited_conference: number;
  compliance_factories: number;
  production: number;
};
export type TReview = {
  _id:string,
  name:string,
  designation:string,
  description:string,
  images:string[],
}

