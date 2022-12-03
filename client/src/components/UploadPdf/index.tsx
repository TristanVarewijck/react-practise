import React, { useState } from "react";
import {storage} from "../../firebaseService/firebaseConfig"
import {ref, uploadBytes} from "firebase/storage";
import { Upload, Button, message } from "antd";
import {auth} from "../../firebaseService/firebaseConfig"



// parameters => dbFolderName, drive?
const UploadPdf = (): JSX.Element => {
  const [antPdfs, setAntPdfs] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: any) => {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error('You can only upload PDF file!');
    }
  };

  const dummyRequest = ({ file, onSuccess }:any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleAnt = (e:any) => {
    setAntPdfs(e.file.originFileObj);
  };

  const sendAnt = async () => {
    setLoading(true);
    const storageRef = ref(storage, "pdfs/" + antPdfs.name); 
    uploadBytes(storageRef, antPdfs).then((snapshot) => {
        console.log(snapshot); 
        setLoading(false);
    })
      .then(() => {
        const sentPDF  = async () => {
          await fetch("http://127.0.0.1:5001/notes-app-75129/us-central1/getPdfFromStorageHttp", {
          method: "POST",
          headers: { 
            "Content-Type": "application/pdf",
            "Authorization": "Bearer " + await auth.currentUser?.getIdToken(), 
            "Access-Control-Allow-Origin": "*",
          },
          body: antPdfs,      
        })
        console.log(antPdfs);
        console.log("PDF sent to backend");
        }

        sentPDF();
        setLoading(false);
      })
      .catch(error => {
        console.log("Error storing file: ", error);
      });
  };

  return (
    <div style={{ width: 256 }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          Ant Upload
          <Upload customRequest={dummyRequest} accept=".pdf" beforeUpload={beforeUpload} onChange={handleAnt}>
            <Button>Select file</Button>
          </Upload>
          <Button onClick={sendAnt}>Submit</Button>
        </div>
      )}
    </div>
  );
}

export default UploadPdf;
