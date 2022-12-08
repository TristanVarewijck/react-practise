import React, { useEffect, useState } from "react";
import {db, storage} from "../../firebaseService/firebaseConfig"
import {listAll, ref, uploadBytes, deleteObject} from "firebase/storage";
import { doc, onSnapshot } from "firebase/firestore";
import { Upload, Button, message, Spin } from "antd";
import { noteProps } from "../../types";

// parameters => dbFolderName
const UploadPdf = ({noteId}:any): JSX.Element => {
  const [antPdfs, setAntPdfs] = useState<any>([]);
  const [pdfs, setPdfs] = useState<any>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const storageRef = ref(storage,`${noteId}/indentification/`);
                                     
  const beforeUpload = (file: any):void => {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error('You can only upload PDF file!');
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('PDF must smaller than 5MB!');
    }
  };

  const dummyRequest = ({onSuccess}:any):void => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleAnt = async (e:any) => {
    setAntPdfs(e.file.originFileObj);
    if(e.file.originFileObj) {
      setPdfs(
        [{
          uid: e.file.originFileObj.name,
          name: e.file.originFileObj.name,
          status: "warning",
          percent: 33
        }]
      );
    }
  };

  const sendAnt = async () => {
    const storageFileRef = ref(storage, `${noteId}/indentification/` + antPdfs.name); 
    uploadBytes(storageFileRef, antPdfs).then(async (snapshot) => {
      setPdfs([
        {
          uid: snapshot.metadata.name,
          name: snapshot.metadata.name,
          status: "progress",
          percent: 66
        }
      ])
    })

   .then(async () => {
      const list = await listAll(storageRef);
      if(list.items.length > 1) {
        deleteObject(ref(storage, `${noteId}/indentification/` + list.items[0].name));
      }})
      .catch(error => {
        console.log("Error storing file: ", error);
      });
      message.success("Pdf successfully uploaded");
  };

  const handleRemove = async () => {
    const list = await listAll(storageRef);
    if(list.items.length > 0) {
      deleteObject(ref(storage, `${noteId}/indentification/` + list.items[0].name)).then(() => {
      });
    }
     
    setPdfs([]);
    message.success("Pdf successfully deleted");
  }

   // listen to the the change of the note in firestore 
   useEffect(() => {
    const ref = doc(db, `notes/${noteId}`);
    onSnapshot(ref, (query) => {
        const docData = query.data() as noteProps;
        if(docData.driveStatus === "uploaded") {
          setPdfs([{
            uid: docData.id,
            name: docData.title,
            status: "done",
            url: docData.docRef,
            percent: 100,
          }]);
        } else if(docData.driveStatus === "processing") {
          setPdfs([{
            uid: docData.id,
            name: docData.title,
            status: "progress",
            url: "#",
          }]);
        } else if(docData.driveStatus === "deleted" || "none") {
          setPdfs([]);
        }

    }, (error) => {
        console.log('Error getting documents: ', error);
    });
  }, [noteId]);

  return (
    <div style={{ width: 256 }}>
        <div>
          <Spin spinning={pdfs[0] && pdfs[0].status === "progress" ? true : false}>
          <Upload customRequest={dummyRequest} maxCount={1} accept=".pdf" beforeUpload={beforeUpload} fileList={pdfs} onChange={handleAnt} onRemove={handleRemove}>
            <Button>Select file</Button>
          </Upload>
          <Button onClick={sendAnt}>Submit</Button>
          </Spin>
        </div>
    </div>
  );
}

export default UploadPdf;