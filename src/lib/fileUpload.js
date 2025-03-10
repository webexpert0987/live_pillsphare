import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const {
  REACT_APP_S3_ACCESS_KEY_ID,
  REACT_APP_S3_SECRET_ACCESS_KEY,
  REACT_APP_S3_BUCKET_NAME,
  REACT_APP_S3_REGION,
} = process.env;

const s3Client = new S3Client({
  region: REACT_APP_S3_REGION,
  credentials: {
    accessKeyId: REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file) => {
  if (!file) {
    return;
  }

  const fileBuffer = await file.arrayBuffer(); // Convert file to ArrayBuffer

  const params = {
    Bucket: REACT_APP_S3_BUCKET_NAME,
    Key: file.name,
    Body: new Uint8Array(fileBuffer), // Convert to Uint8Array
    ContentType: file.type,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    const fileUrl = `https://${REACT_APP_S3_BUCKET_NAME}.s3.${REACT_APP_S3_REGION}.amazonaws.com/${file.name}`;
    return fileUrl;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error(error?.message);
  }
};

export default uploadFile;
