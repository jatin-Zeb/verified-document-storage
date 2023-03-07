/** @jsxImportSource @emotion/react */
import { CloudUploadOutlined } from "@ant-design/icons";
import {
  Drawer,
  Form,
  Input,
  DatePicker,
  Tabs,
  Select,
  Typography,
} from "antd";
import { useCallback, useContext } from "react";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import { KYCDocs } from "../../../reducers/kyc";
import { colors, mixins, typography } from "../../../styles1";
import KycHome from "../../Kyc";
import Referral from "../../Referral";
import Button from "../../shared/Button";
import { contractContext } from "../../UserHome/Contract";
import { ContractContextType } from "../../UserHome/Contract/context";
import * as styles from "./styles";

const UserDetails = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [openFinanceDrawer, setOpenFinanceDrawer] = useState<boolean>(false);
  const [uplodedDocument, setUploadedDocument] = useState<
    Blob | null | undefined
  >();
  const { kycVerified, kycDocs } = useSelector<StoreState, KYCDocs>(
    (state) => state.kyc
  );
  const { getUserKycInfo } = useContext(contractContext) as ContractContextType;

  const onFinish = (values: any) => {
    console.log(values);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    console.log(" i m run");
    (async () => {
      await getUserKycInfo();
    })();
  }, []);

  return (
    <div css={styles.userDocuments}>
      <div css={styles.heading}>
        <p css={{ ...typography.H5_20_bold, color: colors.Zeb_Solid_Dark }}>
          Your Profile
        </p>
      </div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: `PROFILE`,
            children: (
              <div>
                {kycVerified === 0 && (
                  <div
                    css={styles.uploadKyc}
                    onClick={() => {
                      console.log(" i m run");
                      setActiveTab("2");
                    }}
                  >
                    Please Verify Your Kyc . To fill some of the details
                  </div>
                )}
                <div css={styles.tab1Container}>
                  <div css={styles.personal}>
                    <div css={styles.header}>
                      <div css={styles.header}>PERSONAL DETAILS</div>
                      {/* <Button
                        type="primary"
                        onClick={() => {
                          setOpenDrawer(true);
                        }}
                        style={{ borderRadius: "8px" }}
                      >
                        Edit
                      </Button> */}
                    </div>
                    <div css={styles.component}>
                      <div style={{ flex: 1.2 }}>
                        <div css={styles.info}>
                          <div css={styles.infoHead}>First Name</div>
                          <div css={styles.infoSubHead}>
                            {kycDocs.FirstName}
                          </div>
                        </div>
                        <div css={styles.info}>
                          <div css={styles.infoHead}>D.O.B</div>
                          <div css={styles.infoSubHead}>{kycDocs.DOB}</div>
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div css={styles.info}>
                          <div css={styles.infoHead}>Last Name</div>
                          <div css={styles.infoSubHead}>
                            {" "}
                            {kycDocs.LastName}
                          </div>
                        </div>
                        <div css={styles.info}>
                          <div css={styles.infoHead}>Aadhaar No.</div>
                          <div css={styles.infoSubHead}>{kycDocs.AadhaarNumber}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div css={styles.financial}>
                    <div css={styles.header}>
                      <div css={styles.header}>FINANCIAL DETAILS</div>
                      <Button
                        type="primary"
                        onClick={() => {
                          setOpenFinanceDrawer(true);
                        }}
                        style={{ borderRadius: "8px" }}
                      >
                        Edit
                      </Button>
                    </div>
                    <div css={styles.component}>
                      <div style={{ flex: 1.2 }}>
                        <div css={styles.info}>
                          <div css={styles.infoHead}>Occupation</div>
                          <div css={styles.infoSubHead}>-</div>
                        </div>
                        <div css={styles.info}>
                          <div css={styles.infoHead}>Source of Income</div>
                          <div css={styles.infoSubHead}>-</div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            ),
          },
          {
            key: "3",
            label: `KYC`,
            children: <KycHome />,
          },
          {
            key: "4",
            label: `SAVED ADDRESSES`,
            children: `Content of Tab Pane 1`,
            disabled: kycVerified !== 2,
          },
        ]}
        onChange={(activeKey) => {
          setActiveTab(activeKey);
        }}
      />

      <Drawer
        open={openDrawer}
        width={"35%"}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <div css={mixins.textAlignmentCenter}>
            <CloudUploadOutlined css={{ fontSize: "50px" }} />
            <Typography.Title level={3}>Update Used Details</Typography.Title>
          </div>
          <div css={mixins.flexJustifiedBetween}>
            <Form.Item
              label="First Name"
              name="First Name"
              required
              css={{ width: "47%" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="Last Name"
              css={{ width: "47%" }}
              required
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            label="Email"
            name="Email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div css={mixins.flexJustifiedBetween}>
            <Form.Item
              name="Gender"
              label="Gender"
              required
              css={{ width: "35%" }}
            >
              <Select>
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="Date of Birth"
              label="Date of Birth"
              required
              css={{ width: "62%" }}
            >
              <DatePicker css={{ width: "100%" }} />
            </Form.Item>
          </div>
          <div css={mixins.flexJustifiedBetween}>
            <Form.Item
              label="Country"
              name="Country"
              required
              css={{ width: "47%" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="State"
              name="State"
              css={{ width: "47%" }}
              required
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item label="Address Line 1" name="Address Line 1" required>
            <Input />
          </Form.Item>
          <Form.Item label="Address Line 2" name="Address Line 2" required>
            <Input />
          </Form.Item>
          <Form.Item
            label="Political Affiliation"
            name="Political Affiliation"
            required
            css={{ width: "82%" }}
          >
            <Select defaultValue={"No"}>
              <Select.Option value="Yes">Yes</Select.Option>
              <Select.Option value="No">No</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item css={mixins.textAlignmentCenter}>
            <Button
              type="secondary"
              onClick={() => {}}
              style={{ margin: "10px" }}
              size="large"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              typeAttribute="submit"
              onClick={() => {}}
              style={{ margin: "10px" }}
              size="large"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        open={openFinanceDrawer}
        width={"35%"}
        onClose={() => {
          setOpenFinanceDrawer(false);
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <div css={mixins.textAlignmentCenter}>
            <CloudUploadOutlined css={{ fontSize: "50px" }} />
            <Typography.Title level={3}>
              Update Financial Details
            </Typography.Title>
          </div>

          <Form.Item label="Occupation" name="Occupation" required>
            <Input />
          </Form.Item>
          <Form.Item label="Source of Income" name="Source of Income" required>
            <Input />
          </Form.Item>

          <Form.Item css={mixins.textAlignmentCenter}>
            <Button
              type="secondary"
              onClick={() => {}}
              style={{ margin: "10px" }}
              size="large"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              typeAttribute="submit"
              onClick={() => {}}
              style={{ margin: "10px" }}
              size="large"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default UserDetails;
