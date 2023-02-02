/** @jsxImportSource @emotion/react */
import { Badge, Tab, Table, TabList, Upload } from "@web3uikit/core";
import { Drawer, Form, Input, DatePicker, Tabs } from "antd";
import { toast } from "react-toastify";
import { useEffect, useState, useContext } from "react";
import { colors, mixins, typography } from "../../../styles1";
import Button from "../../shared/Button";
import { NFTStorage, File } from "nft.storage";
import * as styles from "./styles";
import { NFT_TOKEN } from "../../../constants/constants";
import { blobToSHA256 } from "file-to-sha256";
import { MoreOutlined } from "@ant-design/icons";
import { ContractContextType } from "./../Contract/context";
import { contractContext } from "./../Contract";

const UserDocuments = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [uplodedDocument, setUploadedDocument] = useState<any>();

  const { addContract, fetchWalletInfo } = useContext(contractContext) as ContractContextType;
  fetchWalletInfo()

  const onFinish = (values: any) => {
    console.log("Details Submitted For Upload:", values);
    uploadDocToIPFS(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  async function getImageUrlFromMetaData(IPFSUri: string) {
    IPFSUri = IPFSUri.replace("ipfs://", "https://w3s.link/ipfs/");
    const response =  await fetch(IPFSUri)
    const responseJSON = await response.json()
    return responseJSON["image"]
  }

  const uploadDocToIPFS = async (values: any) => {
    try {
      console.log("NFT TOKEN IS:",NFT_TOKEN);
      if (NFT_TOKEN) {
        const client = new NFTStorage({
          token: NFT_TOKEN,
        });
        console.log("NFT Storage Client:=>",client);

        const metadata = await client.store({
          name: name,
          description: description,
          image: new File([uplodedDocument], uplodedDocument.name, {
            type: uplodedDocument.type,
          }),
        });

        console.log("MetaData :=> ",metadata);
        const sha256 = await blobToSHA256(uplodedDocument);
        console.log("SHA256 of File :=> ",sha256)
        const currentTime = new Date();
        const imageUrl = await getImageUrlFromMetaData(metadata.url)
        addContract(
          values.Category || "",
          values.Type || "",
          values.Description || "",
          values.Name || "",
          values.Email || "",
          (values.DateRange[0]['$d']).toLocaleString() || "",
          (values.DateRange[1]['$d']).toLocaleString() || "",
          currentTime.toLocaleString(),
          sha256,
          imageUrl,
        );

      }
    } catch (error) {
      console.error(error);
    }
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  useEffect(() => {
    console.log(uplodedDocument);
  }, [uplodedDocument]);
  return (
    <div css={styles.userDocuments}>
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
            label: `ALL`,
            children: (
              <Table
                tableBackgroundColor="#F5F5F5"
                customTableBorder="border-top:1px"
                headerBgColor="#FFFFFF"
                columnsConfig="50px  2fr 1fr 1fr 1fr 1fr 1fr"
                header={[
                  "Sr.",
                  "Name",
                  "Total Participants",
                  "Status",
                  "Created On",
                  "Updated On",
                  "Actions",
                ]}
                alignCellItems="center"
                data={[
                  [
                    <div key={1}>1</div>,
                    <p key={2}>sdcscscscscdscscscdscddscscdscscdscscsd.....</p>,
                    10,
                    <Badge state="success" text="SIGNED" key={3} />,
                    "09/02/2021 10:00 PM",
                    "09/02/2021 10:00 PM",
                    <div css={mixins.flexJustifiedBetween} key={4}>
                      <Button type="link" onClick={() => {}}>
                        View
                      </Button>
                      <MoreOutlined />
                    </div>,
                  ],
                  [
                    <div key={1}>1</div>,
                    <p key={2}>sdcscscscscdscscscdscddscscdscscdscscsd.....</p>,
                    10,
                    <Badge state="success" text="SIGNED" key={3} />,
                    "09/02/2021 10:00 PM",
                    "09/02/2021 10:00 PM",
                    <div css={mixins.flexJustifiedBetween} key={4}>
                      <Button type="link" onClick={() => {}}>
                        View
                      </Button>
                      <MoreOutlined />
                    </div>,
                  ],
                  [
                    <div key={1}>1</div>,
                    <p key={2}>sdcscscscscdscscscdscddscscdscscdscscsd.....</p>,
                    10,
                    <Badge state="success" text="SIGNED" key={3} />,
                    "09/02/2021 10:00 PM",
                    "09/02/2021 10:00 PM",
                    <div css={mixins.flexJustifiedBetween} key={4}>
                      <Button type="link" onClick={() => {}}>
                        View
                      </Button>
                      <MoreOutlined />
                    </div>,
                  ],
                  [
                    <div key={1}>1</div>,
                    <p key={2}>sdcscscscscdscscscdscddscscdscscdscscsd.....</p>,
                    10,
                    <Badge state="success" text="SIGNED" key={3} />,
                    "09/02/2021 10:00 PM",
                    "09/02/2021 10:00 PM",
                    <div css={mixins.flexJustifiedBetween} key={4}>
                      <Button type="link" onClick={() => {}}>
                        View
                      </Button>
                      <MoreOutlined />
                    </div>,
                  ],
                  [
                    <div key={1}>1</div>,
                    <p key={2}>sdcscscscscdscscscdscddscscdscscdscscsd.....</p>,
                    10,
                    <Badge state="success" text="SIGNED" key={3} />,
                    "09/02/2021 10:00 PM",
                    "09/02/2021 10:00 PM",
                    <div css={mixins.flexJustifiedBetween} key={4}>
                      <Button type="link" onClick={() => {}}>
                        View
                      </Button>
                      <MoreOutlined />
                    </div>,
                  ],
                  [
                    <div key={1}>1</div>,
                    <p key={2}>sdcscscscscdscscscdscddscscdscscdscscsd.....</p>,
                    10,
                    <Badge state="success" text="SIGNED" key={3} />,
                    "09/02/2021 10:00 PM",
                    "09/02/2021 10:00 PM",
                    <div css={mixins.flexJustifiedBetween} key={4}>
                      <Button type="link" onClick={() => {}}>
                        View
                      </Button>
                      <MoreOutlined />
                    </div>,
                  ],
                ]}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                onRowClick={function noRefCheck() {}}
                pageSize={4}
              />
            ),
          },
          {
            key: "2",
            label: `SIGNED`,
            children: `Content of Tab Pane 1`,
          },
          {
            key: "3",
            label: `PENDING`,
            children: `Content of Tab Pane 1`,
          },
        ]}
        onChange={(value) => {
          console.log(value);
        }}
      />
      ;
      <Drawer
        open={openDrawer}
        width={"30%"}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
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
          <Form.Item label="Type" name="Type">
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="Category">
            <Input />
          </Form.Item>
          <Form.Item name="Description" label="Description">
            <Input.TextArea
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="UploadedFile" label="Dragger">
            <Upload
              acceptedFiles="image/jpeg"
              descriptionText="Only .jpeg files are accepted"
              onChange={(file) => {
                console.log(file);
                setUploadedDocument(file);
              }}
              theme="withIcon"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" typeAttribute="submit" onClick={() => {}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default UserDocuments;
function addContract(
  category: any,
  description: string,
  name: string,
  email: any,
  arg4: string,
  sha256: string,
  arg6: string
) {
  throw new Error("Function not implemented.");
}
