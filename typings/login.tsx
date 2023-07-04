export interface GoogleLoginData {
  email: string;
  family_name: string;
  given_name: string;
  hd: string;
  id: string;
  link: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface LoginData {
  created_at: string;
  email: string;
  id: number;
  is_active: boolean;
  kyc_status: string;
  name: string;
  updated_at: string;
}