/** @jsxImportSource @emotion/react */
import React, { useContext, useState } from "react";
import { Form, Badge, Tag, Popover } from "antd";
import { Upload } from "@web3uikit/core";
import Button from "../../shared/Button";
import * as styles from "./styles";
import { blobToSHA256 } from "file-to-sha256";
import { ContractContextType } from "../Contract/context";
import { contractContext } from "../../UserHome/Contract";

const VerifyDoc: React.FC = () => {
    const [docsFound, setDocsFound] = useState();
  const [showState, setShowState] = useState(false);
  const [uplodedDocument, setUploadedDocument] = useState<any>();


  const { getContractInfo } = useContext(
    contractContext
  ) as ContractContextType;

  const onFinish = (values: any) => {
    // console.log("Details Submitted For Upload:", values);
    verifyDoc(values);
  };

 const verifyDoc = async (values: any) => {
  const sha256 = await blobToSHA256(uplodedDocument);
//   console.log("SHA256 of File :=> ", sha256);
   const docDetails = await getContractInfo(sha256);
   if (docDetails) {
     setShowState(true);
     setDocsFound(docDetails);
   }
 }
  return <div>
    <div css={styles.heading}>Upload a Document to Verify it on Blockchain</div>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={()=>{}}
      autoComplete="off"
      layout="vertical">
      <Form.Item>
        <Upload
          onChange={(file) => {
          setUploadedDocument(file);
          setShowState(false);
        }} />
      </Form.Item>
      <Form.Item style={{display: "flex", justifyContent: "center"}}>
        <Button disabled={false} type="primary" typeAttribute="submit" onClick={() => {}}>
          Submit
        </Button>
      </Form.Item>
      <Form.Item style={{whiteSpace: "nowrap",display: "flex", justifyContent: "center"}} wrapperCol={{ span: 12 }}>
        {showState && <>{ docsFound?.[0][7] ? 
          <Badge count="FOUND" style={{ backgroundColor: "#52c41a", height: 22 }} />
        : <Badge count="NOT FOUND" style={{ backgroundColor: "#FF5733", height: 22 }} />}</>}
      </Form.Item>
    </Form>
    {
      showState
      && docsFound?.[0][7]
      && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#444444", gap: "20px" }}>
          <div style={{textAlign: "center"}}>
            <div style={{ fontSize: "20px", fontWeight: "600" }}>{docsFound?.[0][2]}</div>
            <div>{docsFound?.[0][3]}</div>
          </div>
          <div style={{display: "flex", gap: "16px"}}>
            <div>
              <div style={{fontWeight: "600"}}>Start Date:</div>
              <div>{docsFound?.[0][4]}</div>
            </div>
            <div>
              <div style={{fontWeight: "600"}}>End Date:</div>
              <div>{docsFound?.[0][5]}</div>
            </div>
          </div>
          <div style={{display: "flex", gap: "16px", textAlign: "left", width: "100%", padding: "0 20px"}}>
            <div style={{ flex:1 }}>
              <div style={{fontWeight: "600"}}>Category:</div>
              <div>{docsFound?.[0][0]}</div>
            </div>
             <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ fontWeight: "600" }}>Created At</div>
            <div>{docsFound?.[0][6]}</div>
          </div>
          </div>
          <a href={docsFound?.[0][7]} target="_blank" rel="noreferrer">
            <div>View IPFS File</div>
          </a>
          <div style={{ padding: "0px 20px", width: "100%" }}>
            <div css={styles.participantHeading}>
              Participants
            </div>
            {/* @ts-ignore*/}
            {docsFound?.[1][0].map((val, key) => {
              return <div key={key} css={styles.participantDetails}>
              <div css={styles.name}>
                <div>{docsFound?.[1][1][key]}</div>
                <div>{val}</div>
              </div>
              <div css={styles.status}>
                  <Tag color={docsFound?.[1][2][key] ? "green" : "gold"}>{docsFound?.[1][2][key] ?"SIGNED":"PENDING"}</Tag>
              </div>
            </div>
            })}
          </div>
      </div>
    }
  </div>;
}

export default VerifyDoc;