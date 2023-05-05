/** @jsxImportSource @emotion/react */
import * as styles from "./styles";
import { useCallback, useState } from "react";
import { DatePicker, Form, Input, Select, Steps, Typography } from "antd";
import Button from "../shared/Button";
import { colors, mixins } from "../../styles1";
import UploadAadhar from "./UploadAadhar";
import AddSelfie from "./AddSelfie";
import Image from "next/image";
import verification_success from "../../public/icons/verification_success.png";
import { StoreState } from "../../reducers";
import { useSelector } from "react-redux";
import { KYCDocs } from "../../reducers/kyc";
import { UserState } from "../../reducers/userInfo";
import { KycReqData } from "../../typings/kycDocs";
import { uploadKycDetails } from "../../actions/kyc";
import { useRouter } from "next/router";

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
  const [step, setStep] = useState<number>(0);
  const [selfie, setSelfie] = useState("");
  const [loading, setLoading] = useState(false);
  const { kycData } = useSelector<StoreState, KYCDocs>((state) => state.kyc);
  const { isLoggedIn } = useSelector<StoreState, UserState>(
    (state) => state.user
  );
  const router = useRouter();
  const [aadhar, setAadhar] = useState<Aadhar>({
    front: {} as FileList,
    back: {} as FileList,
  });

  const [kycDetails, setKycDetails] = useState<KycDetails>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    aadhaarNumber: "",
    selfieURL: "",
    createDate: "",
  });

  const onFormSubmit = (values: any) => {
    setKycDetails({
      ...kycDetails,
      firstName: values.firstName,
      lastName: values.lastName,
      dob: values.dob["$d"].toLocaleString(),
      gender: values.gender,
      aadhaarNumber: values.aadhaarNumber,
    });
    setStep(step + 1);
  };

  const onKYCDetailsSubmit = async () => {
    const addKYC = async () => {
      const googleToken = sessionStorage.getItem("google_token");
      const reqData: KycReqData = {
        first_name: kycDetails.firstName,
        last_name: kycDetails.lastName,
        dob: kycDetails.dob,
        gender: kycDetails.gender,
        aadhaar_number: kycDetails.aadhaarNumber,
        aadhaar_front_path: "FRONTURL",
        aadhaar_back_path: "BACKURL",
        selfie_path: "SELFIEURL",
      };
      if (googleToken) uploadKycDetails(googleToken, reqData);
    };
    addKYC().then(() => {
      setStep(step + 1);
    });
  };

  const onFinishFailed = (errorInfo: any) => {};

  const initialValues = {
    firstName: kycDetails.firstName,
    lastName: kycDetails.lastName,
    gender: kycDetails.gender,
    aadhaarNumber: kycDetails.aadhaarNumber,
  };

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
                    rules={[
                      {
                        required: true,
                        message: "Please Enter  your First Name!",
                      },
                    ]}
                    required
                    css={{ width: "33%" }}
                  >
                    <Input placeholder="Enter First Name" />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    css={{ width: "40%" }}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter  your Last Name!",
                      },
                    ]}
                    required
                  >
                    <Input placeholder="Enter Last Name" />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    label="Gender"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please Enter your Gender!",
                      },
                    ]}
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
                    rules={[
                      {
                        required: true,
                        message: "Please Enter your Date of Birth!",
                      },
                    ]}
                    css={{ width: "35%" }}
                  >
                    <DatePicker
                      placeholder="Choose Date"
                      css={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="aadhaarNumber"
                    label="Aadhaar Number"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please Enter  your Aadhar  Number!",
                      },
                    ]}
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
                <Button type="blue" onClick={() => {}} typeAttribute="submit">
                  Next
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
        break;
      case 1:
        return (
          <UploadAadhar
            step={step}
            setStep={setStep}
            aadhar={aadhar}
            setAadhar={setAadhar}
          />
        );
        break;
      case 2:
        return (
          <AddSelfie
            step={step}
            setStep={setStep}
            selfie={selfie}
            setSelfie={setSelfie}
            onSubmit={onKYCDetailsSubmit}
          />
        );
        break;
      case 3:
        return (
          <div css={styles.kycComplete}>
            <Image src={verification_success} alt={"success"} />
            <Typography.Paragraph>KYC Upload Successful</Typography.Paragraph>
            <div css={{ marginTop: "100px" }}>
              <Button
                type="secondary"
                onClick={() => {
                  router.push("/docs");
                }}
                typeAttribute="submit"
              >
                DONE
              </Button>
            </div>
          </div>
        );
        break;
    }
  }, [step, aadhar, selfie]);
  return (
    <div css={styles.addKyc}>
      {kycData && kycData.aadhaar_number.length ? (
        <div
          css={{
            background: colors.Zeb_BG_Light_Blue,
            marginTop: "40px",
            padding: "2%",
            borderRadius: "8px",
          }}
        >
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div css={styles.heading}>First Name:</div>{" "}
            <Typography.Text>{kycData.first_name}</Typography.Text>
          </div>
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div css={styles.heading}>Last Name:</div>{" "}
            <Typography.Text>{kycData.last_name}</Typography.Text>
          </div>
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div css={styles.heading}>D.O.B:</div>{" "}
            <Typography.Text>{kycData.dob}</Typography.Text>
          </div>
          <div
            css={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div css={styles.heading}>Aadhaar No : </div>{" "}
            <Typography.Text css={{ marginRight: "20px" }}>
              {kycData.aadhaar_number}{" "}
            </Typography.Text>
            {/* <Button type="link" size="small" onClick={() => {}}>
              View
            </Button> */}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default KycHome;
