import { Button, Upload } from "@web3uikit/core";

interface UploadDocumentsProps {}
const UploadDocuments: React.FC<UploadDocumentsProps> = ({}) => {
  const handleSubmit = () => {};
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <p>Uploaded document preview</p>
          <div>
            <p>Name </p>
            <p>Email </p>
            <p>Profession </p>
          </div>
        </div>
        <div>
          <Upload onChange={function noRefCheck() {}} theme="withIcon" />
          <Button
            id="next"
            text="proceed"
            size="large"
            isFullWidth
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
