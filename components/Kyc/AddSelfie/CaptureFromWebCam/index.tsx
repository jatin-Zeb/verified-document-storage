/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import ReactCrop, { Crop } from "react-image-crop";
import * as styles from "./styles";
import { SerializedStyles } from "@emotion/react";
import "react-image-crop/dist/ReactCrop.css";

interface CaptureFromWebCamProps {
  addedStyles?: SerializedStyles;
  setSelfie: React.Dispatch<React.SetStateAction<string>>;
  enumerateDevices: () => Promise<MediaDeviceInfo[]>;
  loading: boolean;
  selfieData: Array<object>;
  webcamRef: React.RefObject<Webcam>;
}
export const webcamProperties = {
  mirrored: true,
  audio: false,
  height: 500,
  screenshotQuality: 1,
  screenshotFormat: "image/jpeg",
  width: "100%"
};

const USER_FILENAME = "UserSelfie.jpeg";
const IMAGE_TYPE = "image/jpeg";

const CaptureFromWebCam: React.FC<CaptureFromWebCamProps> = ({
  addedStyles,
  setSelfie,
  enumerateDevices,
  loading,
  webcamRef,
  selfieData
}) => {
  const [showCapturedImage, setShowCapturedImage] = useState<string | null>(
    null
  );
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const [completedCrop, setCompletedCrop] = useState<Partial<Crop> | null>(
    null
  );
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // const webcamRef = useRef<Webcam>(null);

  const handleDevices = React.useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    if (typeof enumerateDevices === "function") {
      navigator?.mediaDevices?.enumerateDevices().then(handleDevices);
    }
  }, [handleDevices, enumerateDevices]);
  useEffect(() => {
    if (showCapturedImage && selfieData.length === 0) {
      setShowCapturedImage("");
    }
  }, [selfieData, showCapturedImage]);

  const capture = useCallback(async () => {

      // const canvas = previewCanvasRef.current;
      // const imageUrl = (canvas && canvas.toDataURL()) as string;
      // setShowCapturedImage(imageUrl);

      // const res = await fetch(imageUrl);
      // const buff = await res.arrayBuffer();
      // const file = await new File([buff], USER_FILENAME, { type: IMAGE_TYPE });
      // setSelfie([{ file: file, filename: USER_FILENAME }]);
const imageSrc = webcamRef?.current?.getScreenshot();
        setSelfie(imageSrc||"");
    
  }, [setShowCapturedImage, setSelfie]);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop as Crop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  const showWebcam = devices.length >= 1 || true;

  return (
    <div css={addedStyles}>
        <div css={styles.cameraAndBtn}>
          {showWebcam && (
            <Webcam
              {...webcamProperties}
              screenshotFormat={IMAGE_TYPE}
              ref={webcamRef}
            />
          )}
          {devices.length <= 0 && (
            <span css={styles.noCam}>No WebCam found.</span>
          )}
          
          <div css={styles.croppedPreview}>
            <canvas
              ref={previewCanvasRef}
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0)
              }}
            />
          </div>
          {/* {showWebcam && (
            <div
              css={styles.captureBtn}
              onClick={capture}
            >
              <span>click photo</span>
            </div>
          )} */}
        </div>
    </div>
  );
};

export default CaptureFromWebCam;
