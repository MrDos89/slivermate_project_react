import { useState } from "react";
import { Button, Alert } from "reactstrap";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import Resizer from "react-image-file-resizer";

const UploadImage = () => {
  const ACCESS_KEY = `${import.meta.env.VITE_ACCESS_KEY}`;
  const SECRET_ACCESS_KEY = `${import.meta.env.VITE_SECRET_ACCESS_KEY}`;
  const REGION = `${import.meta.env.VITE_AWS_REGION}`;
  const S3_BUCKET = `${import.meta.env.VITE_S3_BUCKET_NAME}`;

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  const s3 = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    if (file.type !== "image/jpeg" || fileExt !== "jpg") {
      alert("jpg 파일만 Upload 가능합니다.");
      return;
    }

    setFileName(`upload/${Date.now()}-${file.name}`);

    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      90,
      0,
      (uri) => {
        setSelectedFile(uri);
        setPreview(URL.createObjectURL(uri));
      },
      "blob"
    );
  };

  const uploadFile = async (file) => {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: file,
      },
    });

    upload.on("httpUploadProgress", (progress) => {
      if (progress.loaded && progress.total) {
        setProgress(Math.round((progress.loaded / progress.total) * 100));
      }
    });

    try {
      await upload.done();
      const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
      setUploadedUrl(fileUrl);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setSelectedFile(null);
        setProgress(0);
      }, 3000);
    } catch (err) {
      console.error("S3 업로드 오류:", err);
    }
  };

  return (
    <div className="text-center">
      {showAlert && <Alert color="primary">업로드 진행률 : {progress}%</Alert>}
      <input
        type="file"
        accept="image/jpeg"
        onChange={handleFileInput}
        hidden
        id="fileUpload"
      />
      <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              backgroundColor: "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/placeholder-profile.png"
              alt="profile-placeholder"
              style={{ width: "80px", height: "80px" }}
            />
          </div>
        )}
      </label>
      <br />
      {selectedFile && (
        <Button
          color="success"
          onClick={() => uploadFile(selectedFile)}
          className="mt-2"
        >
          프로필 이미지 업로드
        </Button>
      )}
      {uploadedUrl && (
        <div className="mt-3">
          <p>업로드된 이미지 URL:</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
