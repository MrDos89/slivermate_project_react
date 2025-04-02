import { useState, useEffect } from "react";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const UploadImage = () => {
  const ACCESS_KEY = `${import.meta.env.VITE_ACCESS_KEY}`;
  const SECRET_ACCESS_KEY = `${import.meta.env.VITE_SECRET_ACCESS_KEY}`;
  const REGION = `${import.meta.env.VITE_AWS_REGION}`;
  const S3_BUCKET = `${import.meta.env.VITE_S3_BUCKET_NAME}`;

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  //@note - S3 업로드 설정
  const s3 = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
    computeChecksums: false, // ✅ 체크섬 강제 해제
    useAccelerateEndpoint: false, // ✅ 가속화 엔드포인트 비활성화
  });

  //@note - 썸네일 파일 업로드
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    if (file.type !== "image/jpeg" || fileExt !== "jpg") {
      alert("jpg 파일만 Upload 가능합니다.");
      return;
    }

    setProgress(0);
    setSelectedFile(e.target.files[0]);
  };

  //@note - 썸네일 파일 업로드 기능
  const uploadFile = async (file) => {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: S3_BUCKET,
        Key: `upload/${file.name}`,
        Body: file, // Blob 사용
      },
      tags: [], // 태그 추가 가능
      queueSize: 4, // 병렬 업로드 수
      partSize: 1024 * 1024 * 5, // 5MB씩 업로드
      leavePartsOnError: false, // ✅ 업로드 실패 시 자동 정리
    });

    upload.on("httpUploadProgress", (progress) => {
      if (progress.loaded && progress.total) {
        setProgress(Math.round((progress.loaded / progress.total) * 100));
      }
    });

    try {
      await upload.done();
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setSelectedFile(null);
        setProgress(0); // 완료 후 초기화
      }, 3000);
    } catch (err) {
      console.error("S3 업로드 오류:", err);
    }
  };

  return (
    <form>
      {showAlert ? (
        <Alert color="primary">업로드 진행률 : {progress}%</Alert>
      ) : (
        <Alert color="primary">파일을 선택해 주세요.</Alert>
      )}
      <Input color="primary" type="file" onChange={handleFileInput} />
      {selectedFile ? (
        <Button color="primary" onClick={() => uploadFile(selectedFile)}>
          {" "}
          Upload to S3
        </Button>
      ) : null}
    </form>
  );
};

export default UploadImage;
