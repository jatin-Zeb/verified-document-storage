/** @jsxImportSource @emotion/react */
import React, {useState, useRef, useCallback, useEffect} from "react";
import * as styles from "./styles";
import Webcam from "react-webcam";
import Image from "next/image";
import Button from "../../shared/Button";
import camera from "../../../public/icons/camera 1.png";
import CaptureFromWebCam from "./CaptureFromWebCam";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

interface AddSelfieProps {
  step: number;
  setStep: (step: number) => void;
  selfie: string;
  setSelfie: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}

const AddSelfie: React.FC<AddSelfieProps> = ({step, setStep, selfie, setSelfie, onSubmit}) => {
  const [allowed, setAllowed] = useState(false);
  const [files, setFiles] = useState<Blob[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const capture = useCallback(
    () => {
      if (webcamRef.current) {
        // @ts-ignore
        const imageSrc = webcamRef?.current?.getScreenshot();
        setSelfie(imageSrc || "");
      }
    },

    [setSelfie]
  );

  useEffect(() => {
    if (selfie.length) {
      setAllowed(false);
    }
  }, [selfie])
  useEffect(() => {
    if (files.length) {
      const imgUrl = URL.createObjectURL(new File([files[0]], "selfie"))
      setSelfie(imgUrl);
    }
  }, [files, setSelfie])

  return <div>
    <div css={styles.heading}>Upload Selfie</div>
      <div css={styles.cameraContainer}>
      {!selfie.length ?
        <div>
          {allowed ?
            <div css={styles.cameraContainer}>
              <CaptureFromWebCam
                enumerateDevices={navigator?.mediaDevices?.enumerateDevices}
                setSelfie={setSelfie}
                selfieData={files}
                loading={false}
                webcamRef={webcamRef}
              />
              <div>
                <Button type="blue"
                  onClick={async() => {
                    capture();
                  }}>
                  Capture</Button>
              </div>
            </div> : <div css={styles.allowContainer} onClick={async () => {
                setAllowed(true); 
            }}>
              <div css={styles.cameraText}>
                <Image src={camera} alt="" />
                <div>Turn on Camera</div>
              </div>
            </div>}
          </div>
        : <div css={styles.selfieContainer}>
          <Image width={266} height={200} src={selfie} alt="" />
          <div>
            <Button type="primary" onClick={() => setSelfie("")}>Reset</Button>
          </div>
        </div>}
      </div>
      <div css={styles.buttonContainer}>
      <Button style={styles.backButton} type="tertiary" onClick={() => setStep(step-1)}>Back</Button>
      <Button type="blue" onClick={() => {
        onSubmit();
      }} disabled={selfie.length===0}>Submit</Button>
    </div>
  </div>;
}

export default AddSelfie;
