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
  Tag
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
  const { kycVerified } = useSelector<StoreState,KYCDocs>(state=>state.kyc)
  const { addContract, getUserContracts, fetchWalletInfo, approveTransaction, getContractInfo } = useContext(
    contractContext
  ) as ContractContextType;
  const [participantsLength, setParticipantsLength] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    emailsInvolved: string[],
    statuses: boolean[],
    addressesInvolved: string[]
  }>({
    emailsInvolved: [],
    statuses: [],
    addressesInvolved: []
  });
  const connectToWallet = async () => {
    await fetchWalletInfo();
  };

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);
  useEffect(() => {
    console.log("is Logged In", isLoggedIn);
  }, [isLoggedIn]);
  const contactHandler = useCallback(async () => {
    await getUserContracts();
  }, [getUserContracts]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserContracts();
    }
  }, [isLoggedIn, contactHandler]);

  const setModal = (EmailsInvolved:string[], statuses: boolean[], AddressesInvolved: string[] ) => {
    setModalData({
      emailsInvolved: EmailsInvolved,
      statuses: statuses,
      addressesInvolved: AddressesInvolved
    })
  }

  const populateUseDocuments = (documents: MPC[], tab: string) => {
    console.log(" i m run");
    console.log(documents);
    if (!documents.length) return [];
    const data = documents.map((data: MPC, idx: number) => {
      const document = data.contractDetails;
      return [
        <div key={1}>{idx + 1}</div>,
        <p key={3}>{document.Desc}</p>,
        <p key={4}>{document.Category}</p>,
        <p key={5}>{document.StartDate}</p>,
        <p key={6}>{document.EndDate}</p>,
        <div css={[mixins.flexJustifiedBetween, {gap: "10px", alignItems: "center"}]} key={4}>
          {/* <Button type="link" onClick={() => {}}> */}
          <a href={document.IPFSURI} target="_blank" rel="noreferrer">
            View
          </a>
          {tab === "pending" && <Button type="blue" onClick={() => {
            approveTransaction(data.sha);
         }}>Approve</Button>}
          <Popover content={<div style={{cursor: "pointer"}} onClick={() => {
            setModalOpen(true);
            setModal(data.EmailsInvolved, data.Statuses, data.AddressesInvolved);
          }}>View Participants</div>} >
            <MoreOutlined style={{cursor: "pointer"}} />
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
        for (var i = 1; i <= participantsLength; i++){
          emailArray.push(values["emailAddress" + String(i)]);
          walletArray.push(values["walletAddress" + String(i)])
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
          walletArray,
          emailArray
        );

        // await loadMyDocuments();
        // await populateUseDocuments();
        setLoading(false);
        //TODO: set loading state to be false here
        messageApi.success("Uploaded Successfully ");
        message.info("List will be updated in a few minutes");
      }
    } catch (error) {
      setLoading(false);
      messageApi.error("Failed to Upload");
      console.error(error);
    }
  };

  return (
    <div css={styles.userDocuments}>
      {contextHolder}
      <div css={styles.heading}>
        <p css={{ ...typography.H5_20_bold, color: colors.Zeb_Solid_Dark }}>
          Your Documents
        </p>
        <Button
          type="primary"
          onClick={() => {
            setOpenDrawer(true);
          }}
          style={{ height: "fit-content" }}
        >
          Upload +
        </Button>
      </div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: <div>ALL SIGNED <span css={styles.contractCount}>{all.length}</span></div>,
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
            label: <div>SIGNED <span css={styles.contractCount}>{signed.length}</span></div>,
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
            label: <div>PENDING <span css={styles.contractCount}>{pending.length}</span></div>,
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
              label="Name"
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
            {
              [...Array(participantsLength)].map((val, key) => <div key={key} css={styles.participantInput}>
                <Image
                  css={styles.cross}
                  src={crossImg}
                  height={20}
                  width={25}
                  alt=""
                  onClick={() =>
                    setParticipantsLength(participantsLength - 1)}
                />
                <Form.Item
                  rules={[{ required: true, message: "Please input Email!", type: "email" }]}
                  label={`Email Address ${key + 1}`}
                  name={`emailAddress${key + 1}`}
                >
              <Input />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: "Please input your Address!" }]}
                  label={`Wallet Address ${key + 1}`}
                  name={`walletAddress${key + 1}`}
                >
              <Input />
            </Form.Item>
              </div>)
            }
            {participantsLength < 3
              && <div
                css={styles.addParticipant}
                onClick={() =>
                  setParticipantsLength(participantsLength + 1)}>
                Add Participant+
              </div>}
            <Form.Item name="UploadedFile" label="Dragger">
              <Upload
                descriptionText="Only .jpeg files are accepted"
                onChange={(file) => {
                  setUploadedDocument(file);
                }}
                theme="withIcon"
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="secondary"
                typeAttribute="submit"
                onClick={() => {
                  setOpenDrawer(false);
                }}
              >
                Cancel
              </Button>
              <Button disabled={!(kycVerified===2)} type="primary" typeAttribute="submit" onClick={() => {}}>
                Submit
              </Button>
            </Form.Item>
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
            <span style={{gridRow: "1/3", fontWeight: "700"}}> Address</span>
            <span style={{gridRow:"1/3",fontWeight: "700", paddingBottom: "10px"}}>Email</span>
            <span style={{gridRow: "1/3", fontWeight: "700"}}>Status</span>
          </React.Fragment>
          {
            modalData.emailsInvolved.map((val, key) => {
              return <React.Fragment key={key}>
                <Popover content={modalData.addressesInvolved[key]}>
                  <span>{modalData.addressesInvolved[key].slice(0, 5)}...{modalData.addressesInvolved[key].slice(38, 42)}</span>
                </Popover>
                <span>{val}</span>
                <span style={{paddingBottom: "10px"}}>
                  <Tag color={modalData.statuses[key] ? "green" : "gold"}>{modalData.statuses[key] ? "SIGNED" : "PENDING"}</Tag>
                </span>
              </React.Fragment>
            })
            }
        </div>
      </Modal>
    </div>
  );
};

export default UserDocuments;
