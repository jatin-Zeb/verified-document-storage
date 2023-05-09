/** @jsxImportSource @emotion/react */
import { Badge, Tab, Table, TabList, Upload } from "@web3uikit/core";
import {
  Drawer,
  Form,
  Input,
  DatePicker,
  Tabs,
  Button as AntButton,
  Spin,
  Typography,
  message,
  Modal,
  Popover,
  Tag,
  Tooltip,
} from "antd";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { colors, mixins, typography } from "../../../styles1";
import { NFTStorage, File } from "nft.storage";
import * as styles from "./styles";
import { NFT_TOKEN } from "../../../constants/constants";
import { blobToSHA256 } from "file-to-sha256";
import { MoreOutlined, UploadOutlined } from "@ant-design/icons";
import { ContractContextType } from "./../Contract/context";
import { contractContext } from "./../Contract";
import Button from "../../shared/Button";
import { acceptContract, addNewContract, setUserDocs } from "../../../actions/docs";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import { Document, NewDoc } from "../../../typings/docs";
import { MPC, UploadedDocsProps } from "../../../reducers/docs";
import { UserState } from "../../../reducers/userInfo";
import { KYCDocs, KYC_STATUS } from "../../../reducers/kyc";
import crossImg from "../../../public/icons/cross.png";
import Image from "next/image";
import VerifyDoc from "../VerifyDoc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

enum ModalType {
  VIEW_PARTICIPANTS = 1,
  APPROVE_CONTRACT
}

const loadingComponent = 
<div css={styles.loader}>
    <Spin />
    <div>Fetching Documents...</div>
</div>;

const UserDocuments = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [uplodedDocument, setUploadedDocument] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { all, signed, pending } = useSelector<StoreState, UploadedDocsProps>(
    (state) => state.docs.uploadedDocs
  );
  const isDocsLoading = useSelector<StoreState, boolean>(state => state.docs.isLoading);
  console.log(isDocsLoading, "isDocsLoading");
  const [submitButton, setSubmitButton] = useState("");
  const { isLoggedIn, loginData } = useSelector<StoreState, UserState>(
    (state) => state.user
  );
  const [form] = Form.useForm();
  const { kycVerified } = useSelector<StoreState, KYCDocs>(
    (state) => state.kyc
  );
  const {
    addContract,
    getUserContracts,
    fetchWalletInfo,
    approveTransaction,
    getContractInfo,
  } = useContext(contractContext) as ContractContextType;
  const [participantsLength, setParticipantsLength] = useState(0);
  const [verifyDocOpen, setVerifyDocOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    emailsInvolved: string[];
    statuses: boolean[];
    sha: string;
  }>({
    emailsInvolved: [],
    statuses: [],
    sha: ""
  });
  const [modalType, setModalType] = useState(ModalType.VIEW_PARTICIPANTS);
  const connectToWallet = async () => {
    await fetchWalletInfo();
  };

  const contactHandler = useCallback(async () => {
    await getUserContracts();
  }, [getUserContracts]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserContracts();
    }
  }, [isLoggedIn, contactHandler]);

  const setModal = (EmailsInvolved: string[], statuses: boolean[], sha: string) => {
    setModalData({
      emailsInvolved: EmailsInvolved,
      statuses: statuses,
      sha: sha
    });
  };

  const populateUseDocuments = (documents: MPC[], tab: string) => {
    if (!documents.length) return [];
    const data = documents.map((data: MPC, idx: number) => {
      const document = data.contractDetails;
      return [
        <div key={1}>{idx + 1}</div>,
        <p key={3}>{document.Desc}</p>,
        <p key={4}>{document.Category}</p>,
        <p key={5}>{document.StartDate}</p>,
        <p key={6}>{document.EndDate}</p>,
        <div
          css={[
            mixins.flexJustifiedBetween,
            { gap: "10px", alignItems: "center" },
          ]}
          key={4}
        >
          {/* <Button type="link" onClick={() => {}}> */}
          <a href={document.IPFSURI} target="_blank" rel="noreferrer">
            View
          </a>
          {tab === "pending" && (
            <Popover content={"Please complete your kyc"}>
              <AntButton
                type="primary"
                shape="round"
                onClick={() => {
                  if (loginData && loginData.kyc_status === KYC_STATUS.VERIFIED){
                    setModalOpen(true);
                setModal(data.EmailsInvolved, data.Statuses, data.sha);
                setModalType(ModalType.APPROVE_CONTRACT);
                  }
                }}
              >
                Approve
              </AntButton>
            </Popover>
          )}
          <Popover
            content={
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setModalOpen(true);
                  setModal(data.EmailsInvolved, data.Statuses, data.sha);
                  setModalType(ModalType.VIEW_PARTICIPANTS)
                }}
              >
                View Participants
              </div>
            }
          >
            <MoreOutlined style={{ cursor: "pointer" }} />
          </Popover>
        </div>,
      ];
    });

    return data;
  };

  const onFinish = (values: any) => {
    console.log("Details Submitted For Upload:", values);
    setLoading(true);
    uploadDocToIPFS(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  async function getImageUrlFromMetaData(IPFSUri: string) {
    IPFSUri = IPFSUri.replace("ipfs://", "https://w3s.link/ipfs/");
    const response = await fetch(IPFSUri);
    const responseJSON = await response.json();
    return responseJSON["image"];
  }

  const uploadDocToIPFS = async (values: any) => {
    try {
      messageApi.info("Uploading");
      console.log("NFT TOKEN IS:", NFT_TOKEN);
      if (NFT_TOKEN) {
        //TODO : set loading state to be true here

        const client = new NFTStorage({
          token: NFT_TOKEN,
        });
        console.log("NFT Storage Client:=>", client);

        const metadata = await client.store({
          name: values.Name,
          description: values.Description,
          image: new File([uplodedDocument], uplodedDocument.name, {
            type: uplodedDocument.type,
          }),
        });

        console.log("MetaData :=> ", metadata);
        const sha256 = await blobToSHA256(uplodedDocument);
        console.log("SHA256 of File :=> ", sha256);
        const currentTime = new Date();
        const emailArray: string[] = [];
        for (var i = 1; i <= participantsLength; i++) {
          emailArray.push(values["emailAddress" + String(i)]);
        }
        // const imageUrl = await getImageUrlFromMetaData(metadata.url)
        if (submitButton === "Fiat") {
          const uploadData: NewDoc = {
            category: values.Category,
            description: values.Description,
            name: values.Name,
            start_date: values.DateRange[0]["$d"].toLocaleString(),
            end_date: values.DateRange[1]["$d"].toLocaleString(),
            sha256: sha256,
            ipfsUrl: metadata.url,
            inviteEmails: emailArray,
          };
          const googleToken = sessionStorage.getItem("google_token");
          if (googleToken) {
            displayRazorPay(uploadData, setLoading, "ADD_CONTRACT")
          } else {
            alert("PLEASE LOG IN");
            setLoading(false);
          }
        } else {
          await addContract(
            values.Category || "",
            values.Description || "",
            values.Name || "",
            values.Email || "", // ADD GOOGLE EMAIL HERE @TODO
            values.DateRange[0]["$d"].toLocaleString() || "",
            values.DateRange[1]["$d"].toLocaleString() || "",
            currentTime.toLocaleString(),
            sha256,
            metadata.url,
            emailArray
          );
          setLoading(false);
        }

        // await loadMyDocuments();
        // await populateUseDocuments();

        //TODO: set loading state to be false here
        messageApi.success("Uploaded Successfully ");
        message.info("List will be updated in a few minutes");
        for (var i = 0; i < emailArray.length; i++) {
          await sendEmail(emailArray[i]);
        }
      }
    } catch (error) {
      setLoading(false);
      messageApi.error("Failed to Upload");
      console.error(error, "ERROR UPLOADING");
    }
  };
  async function sendEmail(email: string) {
    console.log("sending email to", email);
    const content = {
      receiverEmail: email,
      subject: "Signature Needed in Contract",
    };
    const response = await fetch(
      "https://frightened-hen-waders.cyclic.app/mail/send",
      {
        method: "POST",
        body: JSON.stringify(content),
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const displayRazorPay = async (data: NewDoc, setLoading: React.Dispatch<React.SetStateAction<boolean>>, type?: string) => {
    const options = {
      key: "rzp_test_TF1xnKd4kEZOBk",
      currency: "INR",
      amount: 100 * 100,
      name: "Docusmriti",
      description: "Pay Online",
      image:
        "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

      handler: async function(response: any) {
        const googleToken = sessionStorage.getItem("google_token");
        if (googleToken) {
          if (type === "ADD_CONTRACT") {
            const resp = await addNewContract(data, googleToken);
            if (resp) {
              setLoading(false);
              toast("Contract Uploaded Successfully")
            }
          } else {
            const resp = await acceptContract(modalData.sha, googleToken);
            if (resp) {
              setModalOpen(false);
              toast("Contract Approved");
            }
          }
        }
      },
      prefill: {
        name: "User Name",
        email: "email@gmail.com",
      },
      theme: {
        color: "rgba(48, 118, 224, 1)",
        backdrop: "#000000",
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: "Pay via these methods",
              instruments: [
                {
                  method: "upi",
                },
                {
                  method: "card",
                },
                {
                  method: "netbanking",
                },
              ],
            },
          },
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: false,
          },
        },
      },
    };
    // @ts-ignore
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div css={styles.userDocuments}>
      {contextHolder}
      <div css={styles.heading}>
        <p css={{ ...typography.H5_20_bold, color: colors.Zeb_Solid_Dark }}>
          Your Documents
        </p>
        <div css={{}}>
          <Button
            style={{ marginRight: "10px" }}
            type="secondary"
            onClick={() => setVerifyDocOpen(true)}
            disabled={!isLoggedIn}
          >
            Verify Document
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setOpenDrawer(true);
            }}
            style={{ height: "fit-content" }}
            disabled={kycVerified !== 2 || !isLoggedIn}
          >
            Upload +
          </Button>
        </div>
      </div>
      <div>
        {kycVerified === 0 && (
          <div css={styles.uploadKyc}>
            {isLoggedIn
              ? "Please Verify Your Kyc . To fill some of the details"
              : "Please Login to continue..."}
          </div>
        )}
      </div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: (
              <div>
                ALL SIGNED <span css={styles.contractCount}>{all.length}</span>
              </div>
            ),
            children: (isDocsLoading ? loadingComponent :
              <Table
                tableBackgroundColor="#F5F5F5"
                customTableBorder="border-top:1px"
                headerBgColor="#FFFFFF"
                columnsConfig="50px 2fr 1fr 2fr 2fr 1fr"
                header={[
                  "Sr.",
                  "Desciption",
                  "Category",
                  "StartDate",
                  "EndDate",
                  "Actions",
                ]}
                alignCellItems="center"
                data={populateUseDocuments(all, "allSigned")}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                onRowClick={function noRefCheck() {}}
                pageSize={4}
              />
            ),
          },
          {
            key: "2",
            label: (
              <div>
                SIGNED <span css={styles.contractCount}>{signed.length}</span>
              </div>
            ),
            children: (isDocsLoading ? loadingComponent :
              <Table
                tableBackgroundColor="#F5F5F5"
                customTableBorder="border-top:1px"
                headerBgColor="#FFFFFF"
                columnsConfig="50px 2fr 1fr 2fr 2fr 1fr"
                header={[
                  "Sr.",
                  "Desciption",
                  "Category",
                  "StartDate",
                  "EndDate",
                  "Actions",
                ]}
                alignCellItems="center"
                data={populateUseDocuments(signed, "signed")}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                onRowClick={function noRefCheck() {}}
                pageSize={4}
              />
            ),
          },
          {
            key: "3",
            label: (
              <div>
                PENDING <span css={styles.contractCount}>{pending.length}</span>
              </div>
            ),
            children: (isDocsLoading ? loadingComponent :
              <Table
                tableBackgroundColor="#F5F5F5"
                customTableBorder="border-top:1px"
                headerBgColor="#FFFFFF"
                columnsConfig="50px 2fr 1fr 2fr 2fr 1fr"
                header={[
                  "Sr.",
                  "Desciption",
                  "Category",
                  "StartDate",
                  "EndDate",
                  "Actions",
                ]}
                alignCellItems="center"
                data={populateUseDocuments(pending, "pending")}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                onRowClick={function noRefCheck() {}}
                pageSize={4}
              />
            ),
          },
        ]}
        onChange={(value) => {
          console.log(value);
        }}
      />

      <Drawer
        open={verifyDocOpen}
        onClose={() => setVerifyDocOpen(false)}
        title="Verify Document"
      >
        <VerifyDoc />
      </Drawer>

      <Drawer
        open={openDrawer}
        width={"30%"}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Spin spinning={loading}>
          <div css={mixins.textAlignmentCenter}>
            <UploadOutlined
              css={{ fontSize: "40px", color: colors.Zeb_Solid_Midnight }}
            />
            <Typography.Title level={3}>Upload Document</Typography.Title>
          </div>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Document Title"
              name="Name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="Email"
              preserve={true}
              initialValue={loginData?.email}
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                  type: "email",
                },
              ]}
            >
              <Input value={loginData?.email} disabled />
            </Form.Item>
            <Form.Item
              name="DateRange"
              label="Contract Validity Date"
              rules={[{ required: true, message: "Select date range!" }]}
            >
              <DatePicker.RangePicker />
            </Form.Item>
            <Form.Item
              label="Category"
              name="Category"
              rules={[{ required: true, message: "Enter Category" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Description"
              label="Description"
              rules={[{ required: true, message: "Enter Description" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            {[...Array(participantsLength)].map((val, key) => (
              <div key={key} css={styles.participantInput}>
                <Image
                  css={styles.cross}
                  src={crossImg}
                  height={20}
                  width={25}
                  alt=""
                  onClick={() => setParticipantsLength(participantsLength - 1)}
                />
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input Email!",
                      type: "email",
                    },
                  ]}
                  label={`Email Address ${key + 1}`}
                  name={`emailAddress${key + 1}`}
                >
                  <Input />
                </Form.Item>
              </div>
            ))}
            {participantsLength < 3 && (
              <div
                css={styles.addParticipant}
                onClick={() => setParticipantsLength(participantsLength + 1)}
              >
                Add Participant+
              </div>
            )}
            <Form.Item name="UploadedFile" label="Dragger">
              <Upload
                descriptionText="Only .jpeg files are accepted"
                onChange={(file) => {
                  setUploadedDocument(file);
                }}
                theme="withIcon"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ flex: "auto" }}>
              <div css={styles.submitContainer}>
                <Button
                  type="secondary"
                  typeAttribute="submit"
                  onClick={() => setSubmitButton("Fiat")}
                >
                  Pay via FIAT
                </Button>
                <Button
                  type="primary"
                  typeAttribute="submit"
                  onClick={() => setSubmitButton("Metamask")}
                >
                  Pay via Metamask
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Spin>
      </Drawer>
      <ToastContainer position="bottom-left" />
      <Modal
        width={400}
        title={modalType===ModalType.APPROVE_CONTRACT ? "Choose Payment type" : "Participants"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        {
          modalType === ModalType.VIEW_PARTICIPANTS ?
            <div css={styles.participants}>
              <React.Fragment>
                <span
                  style={{
                    gridRow: "1/2",
                    fontWeight: "700",
                    paddingBottom: "10px",
                  }}
                >
                  Email
                </span>
                <span style={{ gridRow: "1/2", fontWeight: "700" }}>Status</span>
              </React.Fragment>
              {modalData.emailsInvolved.map((val, key) => {
                return (
                  <React.Fragment key={key}>
                    <span>{val}</span>
                    <span style={{ paddingBottom: "10px" }}>
                      <Tag color={modalData.statuses[key] ? "green" : "gold"}>
                        {modalData.statuses[key] ? "SIGNED" : "PENDING"}
                      </Tag>
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
            :
            <div css={styles.modalPayment}>
              <Button type="secondary" onClick={() => displayRazorPay({} as NewDoc, setLoading)}>
                Pay via Fiat
              </Button>
              <Button type="primary" onClick={() => approveTransaction(loginData?.email ?? "", modalData.sha)}>
                Pay via Metamask
              </Button>
            </div>
        }
        
      </Modal>
    </div>
  );
};

export default UserDocuments;
