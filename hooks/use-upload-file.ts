import { useUploadFileMutation } from "../services/upload";

export const useUploadFile = () => {
  const [uploadFile, { isLoading, isError, error }] = useUploadFileMutation();

  const upload = async (file: File): Promise<string | undefined> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadFile(formData).unwrap();
      if (response && response?.data?.generatedUrl) {
        return response?.data?.generatedUrl; // Assuming `s3Link` contains the uploaded file's URL
      } else {
        throw new Error("Failed to retrieve S3 link from the response.");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      return undefined; // Return undefined in case of an error
    }
  };

  return { upload, isLoading, isError, error };
};
