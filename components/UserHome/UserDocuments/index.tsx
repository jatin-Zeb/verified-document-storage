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
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [uplodedDocument, setUploadedDocument] = useState<any>();
  const [userDocuments, setUserUploadedDocuments] = useState<any>();
  const { addContract, getUserContracts, fetchWalletInfo } = useContext(contractContext) as ContractContextType;

  const loadMyDocuments = async () => {
    const userContracts = await getUserContracts();
    console.log("User Contracts are :=> ");
    console.log(userContracts);

    console.log("User Documents here are: => ");
    console.log(userDocuments);

    setUserUploadedDocuments(userContracts);
  }

  useEffect( ()=>{
    console.log("User Documents now are: => ");
    console.log(userDocuments);
  },[userDocuments])


  const populateUseDocuments = async () => {
    console.log("Hi I am here now I will load contacts");
    await loadMyDocuments()
    console.log("I guess the contacts would have been loaded above");
    console.log("Moving On");
    console.log("Displaying Data");
    console.log("The data is:");
    console.log(userDocuments);
    const data = userDocuments.map( (document :any,idx :any) => {
        console.log(document);
        console.log(idx);
        return (
          [
            <div key={1}>{idx+1}</div>,
            <p key={2}>{document.Type}</p>,
            <p key={3}>{document.Desc}</p>,
            <p key={4}>{document.Category}</p>,
            <p key={5}>{document.startDate}</p>,
            <p key={6}>{document.endDate}</p>,
            <div css={mixins.flexJustifiedBetween} key={4}>
              <Button type="link" onClick={() => {}}>
                View
              </Button>
              <MoreOutlined />
            </div>
          ]
        )
    }) 
    console.log("Displaying data completed");
  }

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

        //TODO : set loading state to be true here 

        const client = new NFTStorage({
          token: NFT_TOKEN,
        });
        console.log("NFT Storage Client:=>",client);

        const metadata = await client.store({
          name: values.Name,
          description: values.Description,
          image: new File([uplodedDocument], uplodedDocument.name, {
            type: uplodedDocument.type,
          }),
        });

        console.log("MetaData :=> ",metadata);
        const sha256 = await blobToSHA256(uplodedDocument);
        console.log("SHA256 of File :=> ",sha256)
        const currentTime = new Date();
        //const imageUrl = await getImageUrlFromMetaData(metadata.url)
        await addContract(
          values.Category || "",
          values.Type || "",
          values.Description || "",
          values.Name || "",
          values.Email || "",
          (values.DateRange[0]['$d']).toLocaleString() || "",
          (values.DateRange[1]['$d']).toLocaleString() || "",
          currentTime.toLocaleString(),
          sha256,
          metadata.url,
        );
        
         await loadMyDocuments();
        await populateUseDocuments();
        //TODO: set loading state to be false here
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const normFile = (e: any) => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };

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
                "Type",
                "Desciption",
                "Category",
                "StartDate",
                "EndDate",
                "Actions",
              ]}
              alignCellItems="center"

              data={
                []
              }


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
