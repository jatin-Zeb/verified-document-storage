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
import { setUserDocs } from "../../../actions/docs";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import { Document } from "../../../typings/docs";
import { MPC, UploadedDocsProps } from "../../../reducers/docs";
import { UserState } from "../../../reducers/userInfo";
import { KYCDocs } from "../../../reducers/kyc";
import crossImg from "../../../public/icons/cross.png";
import Image from "next/image";
import VerifyDoc from "../VerifyDoc";

const UserDocuments = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [uplodedDocument, setUploadedDocument] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { all, signed, pending } = useSelector<StoreState, UploadedDocsProps>(
    (state) => state.docs.uploadedDocs
  );
  const { isLoggedIn } = useSelector<StoreState, UserState>(
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
  }>({
    emailsInvolved: [],
    statuses: [],
  });
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

  const setModal = (EmailsInvolved: string[], statuses: boolean[]) => {
    setModalData({
      emailsInvolved: EmailsInvolved,
      statuses: statuses,
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
            <Button
              type="blue"
              onClick={() => {
                approveTransaction("email@gmail.com", data.sha); //@TODO: add signed in user email here
              }}
            >
              Approve
            </Button>
          )}
          <Popover
            content={
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setModalOpen(true);
                  setModal(data.EmailsInvolved, data.Statuses);
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
        const walletArray: string[] = [];
        for (var i = 1; i <= participantsLength; i++) {
          emailArray.push(values["emailAddress" + String(i)]);
          walletArray.push(values["walletAddress" + String(i)]);
        }
        // const imageUrl = await getImageUrlFromMetaData(metadata.url)
        await addContract(
          values.Category || "",
          values.Description || "",
          values.Name || "",
          values.Email || "",
          values.DateRange[0]["$d"].toLocaleString() || "",
          values.DateRange[1]["$d"].toLocaleString() || "",
          currentTime.toLocaleString(),
          sha256,
          metadata.url,
          emailArray
        );

        // await loadMyDocuments();
        // await populateUseDocuments();
        setLoading(false);
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
      console.error(error);
    }
  };
  async function sendEmail(email: string) {
    console.log("sending email to", email);
    const content = {
      receiverEmail: email,
      subject: "Signature Needed in Contract",
    };
    const response = await fetch(
      "https://shiny-bathing-suit-slug.cyclic.app/sendMail",
      {
        method: "POST",
        body: JSON.stringify(content),
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const displayRazorPay = async () => {
    const options = {
      key: "rzp_test_TF1xnKd4kEZOBk",
      currency: "INR",
      amount: 100 * 100,
      name: "Docusmriti",
      description: "Pay Online",
      image:
        "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

      handler: function(response: any) {
        alert(response.razorpay_payment_id);
        alert("Payment Successfully");
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
            disabled={kycVerified !== 2 || !isLoggedIn}
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
            children: (
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
            children: (
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
            children: (
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
            <Form.Item name="DateRange" label="Contract Validity Date">
              <DatePicker.RangePicker />
            </Form.Item>
            <Form.Item label="Category" name="Category">
              <Input />
            </Form.Item>
            <Form.Item name="Description" label="Description">
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
                <Form.Item
                  rules={[
                    { required: true, message: "Please input your Address!" },
                  ]}
                  label={`Wallet Address ${key + 1}`}
                  name={`walletAddress${key + 1}`}
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
                  onClick={() => {
                    displayRazorPay();
                  }}
                >
                  Pay via FIAT
                </Button>
                <Button
                  disabled={!(kycVerified === 2) || !isLoggedIn}
                  type="primary"
                  typeAttribute="submit"
                  onClick={() => {}}
                >
                  Pay via Metamask
                </Button>
              </div>
            </Form.Item>
            <iframe height={500} src={"/payment"} />
          </Form>
        </Spin>
      </Drawer>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
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
      </Modal>
    </div>
  );
};

export default UserDocuments;
