export interface Document {
  Category: string;
  CreateDate: string;
  Desc: string;
  Email: string;
  EndDate: string;
  IPFSURI: string;
  Name: string;
  StartDate: string;
  length: number;
}

export interface NewDoc {
  category: string;
  description: string;
  name: string;
  start_date: string;
  end_date: string;
  sha256: string;
  ipfsUrl: string;
  inviteEmails: string[];
}