import apiClient from "../apis/api";
import axios from "axios";

const uploadFile = async (file, onProgress) => {
  if (!file) {
    console.error("No file provided for upload.");
    return null;
  }

  try {
    const backendRes = await apiClient.get(
      "/wp-json/wp/v2/generate-signed-url",
      {
        params: {
          fileName: file.name,
          fileType: file.type,
        },
      }
    );

    const { signedUrl, fileUrl } = backendRes;

    // Step 2: Upload file directly to S3 using the signed URL
    await axios.put(decodeURIComponent(signedUrl), file, {
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="${file.name}"`,
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });

    // Step 3: Return the public S3 file URL
    return fileUrl;
  } catch (err) {
    throw new Error(err?.message);
  }
};

export default uploadFile;
