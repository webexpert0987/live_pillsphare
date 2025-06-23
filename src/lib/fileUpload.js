import apiClient from "../apis/api";
import axios from "axios";

const uploadFile = async (file, onProgress, videoType) => {
  if (!file) {
    console.error("No file provided for upload.");
    return null;
  }

  try {
    const backendRes = await apiClient.get(
      "/wp-json/wp/v2/generate-signed-url",
      {
        params: {
          fileName: file?.name || videoType?.name,
          fileType: file?.type || videoType?.type,
        },
      }
    );

    const { signedUrl, fileUrl } = backendRes;

    // Step 2: Upload file directly to S3 using the signed URL
    await axios.put(decodeURIComponent(signedUrl), file, {
      headers: {
        "Content-Type": file?.type || videoType?.type,
        "Content-Disposition": `attachment; filename="${
          file?.name || videoType?.name
        }"`,
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
