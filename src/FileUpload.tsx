import React, { useState } from "react";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files && event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUpload = async () => {
    if (file && file.size > 12 * 1024 * 1024) {
      const fileSize = file.size;
      const chunkSize = 5.3 * 1024 * 1024; // 5.3MB chunk size
      let numChunks = Math.ceil(fileSize / chunkSize);
      let start = 0;
      let end = Math.min(chunkSize, fileSize);

      console.log("File size: " + file.size);
      console.log("Approximate chunks number: " + numChunks);
      let sum: number = 0;
      for (let i = 0; i < numChunks; i++) {
        let nextPoint: number = end;
        if (i === numChunks - 2) {
          nextPoint = fileSize;
          numChunks = i + 1;
        }

        const chunk = file.slice(start, nextPoint, "text/csv");

        start = nextPoint;
        end = Math.min(start + chunkSize, fileSize);

        // Send chunk to backend using Fetch API
        console.log(
          "Uploading chunk number " +
            (i + 1) +
            ": " +
            chunk.size +
            " bytes ( " +
            chunk.size / 1024 / 1024 +
            "mb)."
        );
        sum += chunk.size;
      }
      console.log(sum);
    } else if (file && file.size < 12 * 1024 * 1024) {
      console.log("Just send it");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
