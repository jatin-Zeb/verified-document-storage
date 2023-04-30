export interface KYCDocument {
  FirstName: string;
  LastName: string;
  DOB: string;
  AadhaarNumber: string;
  SelfieURL: String;
  Gender: string;
  CreateDate: string;
  AadhaarBackURL: string;
  AadhaarFrontURL: string;
}

export interface KycData {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  dob: string;
  status: string;
  gender: string;
  aadhaar_number: string;
  aadhaar_front_path: string;
  aadhaar_back_path: string;
  selfie_path: string;
  created_at: string;
  updated_at: string;
}