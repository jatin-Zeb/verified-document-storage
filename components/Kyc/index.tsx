/** @jsxImportSource @emotion/react */
import * as styles from "./styles";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  DatePicker,
  Form,
  Input,
  Select,
  Steps,
  Typography,
} from "antd";
import Button from "../shared/Button";
import { colors, mixins } from "../../styles1";
import UploadAadhar from "./UploadAadhar";
import AddSelfie from "./AddSelfie";
import { ContractContextType } from "./../UserHome/Contract/context";
import { contractContext } from "./../UserHome/Contract";

export enum KycPage {
  KycForm,
  UploadDocuments,
  VerificationResult,
}

export interface Aadhar {
  front: FileList;
  back: FileList;
}
export interface KycDetails {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  selfieURL: string;
  createDate: string;
}

const KycHome: React.FC = () => {
  const [kycPage, setKycPage] = useState<KycPage>(KycPage.KycForm);
  const [step, setStep] = useState<number>(0);
  const [selfie, setSelfie] = useState("");
  const [connected, setConnected] = useState<boolean>(false);
  const description = "This is a description.";
  const [loading, setLoading] = useState(false);

  const [aadhar, setAadhar] = useState<Aadhar>({ front: {} as FileList, back: {} as FileList });
    const { addUserKycInfo, getUserKycInfo, fetchWalletInfo } = useContext(
    contractContext
    ) as ContractContextType;
  const [kycData, setKycData] = useState<any>();
  const [kycDetails, setKycDetails] = useState<KycDetails>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    aadhaarNumber: "",
    selfieURL: "",
    createDate: ""
  });

  const connectToWallet = async () => {
    const isConnected = await fetchWalletInfo();
    setConnected(isConnected as boolean);
  };
  useEffect(() => {
    connectToWallet();
  });

  const contactHandler = useCallback(async () => {
    const data = await getUserKycInfo();
    setKycData(data);
    if (data) {
      setLoading(false);
    }
  }, [getUserKycInfo]);
  console.log(kycData);

  useEffect(() => {
    if (connected) {
      contactHandler();
    }
  }, [connected, contactHandler]);


  const onFormSubmit = (values: any) => {
    console.log(values);
    console.log("Success:", values.firstName);
    setKycDetails({
      ...kycDetails,
      firstName: values.firstName,
      lastName: values.lastName,
      dob: values.dob["$d"].toLocaleString(),
      gender: values.gender,
      aadhaarNumber: values.aadhaarNumber
    });
    setStep(step + 1);
  };

  const onKYCDetailsSubmit = async() => {
    await addUserKycInfo(kycDetails.firstName,
      kycDetails.lastName,
      kycDetails.gender,
      kycDetails.dob,
      kycDetails.aadhaarNumber,
      "FRONTURL",
      "BACKURL",
      "SELFIEURL",
      kycDetails.createDate);
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const goBack = () => {
    setStep(step ? step - 1 : 0);
  }

  const initialValues = {
    firstName: kycDetails.firstName,
      lastName: kycDetails.lastName,
      gender: kycDetails.gender,
      aadhaarNumber: kycDetails.aadhaarNumber
  }

  const stepperContent = useCallback(() => {
    switch (step) {
      case 0:
        return (
          <div css={styles.kycStep}>
            <Typography.Title
              level={5}
              style={{ color: colors.Zeb_Solid_Midnight, marginBottom: "10px" }}
            >
              Personal Details
            </Typography.Title>
            <Form
              name="basic"
              initialValues={initialValues}
              onFinish={onFormSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              size="large"
            >
              <div css={{ width: "100%" }}>
                <div css={mixins.flexJustifiedBetween}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    required
                    css={{ width: "33%" }}
                  >
                    <Input placeholder="Enter First Name" />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    css={{ width: "40%" }}
                    required
                  >
                    <Input placeholder="Enter Last Name" />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    label="Gender"
                    required
                    css={{ width: "25%" }}
                  >
                    <Select placeholder="Gender">
                      <Select.Option value="Male">Male</Select.Option>
                      <Select.Option value="Female">Female</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div css={mixins.flexJustifiedBetween}>
                  <Form.Item
                    name="dob"
                    label="Date of Birth"
                    required
                    css={{ width: "35%" }}
                  >
                    <DatePicker placeholder="Choose Date" css={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    name="aadhaarNumber"
                    label="Aadhaar Number"
                    required
                    css={{ width: "62%" }}
                  >
                    <Input type="number" placeholder="Enter Aadhar Number" />
                  </Form.Item>
                </div>
              </div>
              <Form.Item
                style={{
                  // marginTop: "100px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Button type="blue" onClick={()=>{}} typeAttribute="submit">Next</Button>
              </Form.Item>
            </Form>
          </div>
        );
        break;
      case 1:
        return <UploadAadhar step={step} setStep={setStep} aadhar={aadhar} setAadhar={setAadhar} />;
        break;
      case 2:
        return <AddSelfie step={step} setStep={setStep} selfie={selfie} setSelfie={setSelfie} onSubmit={onKYCDetailsSubmit} />;
        break;
      case 3:
        return <div>DONE</div>;
        break;
    }
  }, [step, aadhar, selfie]);
  return (
    <div css={styles.addKyc}>
      {kycData&&kycData["FirstName"].length ? <div>
        First Name: {kycData["FirstName"]}<br/>
        Last Name: {kycData["LastName"]}<br/>
        D.O.B: {kycData["DOB"]}<br/>
        Aadhaar No.: {kycData["AadhaarNumber"]}
      </div> :
        <div>
      <Typography.Title level={4}>Add KYC</Typography.Title>
      <Steps
        css={{ width: "100%" }}
        current={step}
        items={[
          {
            title: "Personal Details",
          },
          {
            title: "Upload Aadhar",
          },
          {
            title: "Add Selfie",
          },
          {
            title: "Done",
          },
        ]}
      />
          <div css={{ marginTop: "20px" }}>{stepperContent()}</div>
          </div>
      }
    </div>
  );
};

export default KycHome;
