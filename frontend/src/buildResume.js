import axios from "axios";
import { useState } from "react";

export default function BuildResume() {
  const [selectedFile, setSelectedFile] = useState(null);
  const onFileChange = (event) => {
    console.log(event.target);
    setSelectedFile(event.target.files[0]);
  };
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
    console.log(selectedFile);

    axios
      .post("http://localhost:8000/api/uploadfile", formData)
      .then((response) => {
        console.log(response.data);
        alert(
          `✅ ${response.data.message} (Filename: ${response.data.filename})`
        );
      })
      .catch((error) => {
        console.error(error);
        alert("❌ Upload failed. Please try again.");
      });
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Browse...</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>AI-tailored resume in seconds</h1>
      <h3>Upload your CV file</h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData()}
    </div>
  );
}

//axios used in place of 'fetch' to make HTTP requests from web browsers or Node.js environments.
