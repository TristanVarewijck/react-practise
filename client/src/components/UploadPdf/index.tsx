import React, { useEffect, useState } from "react";
import {db, storage} from "../../firebaseService/firebaseConfig"
import {listAll, ref, uploadBytes, deleteObject, getDownloadURL} from "firebase/storage";
import { doc, onSnapshot } from "firebase/firestore";
import { Upload, Button, message } from "antd";

// parameters => dbFolderName
const UploadPdf = ({noteId}:any): JSX.Element => {
  console.log(noteId);
  const [antPdfs, setAntPdfs] = useState<any>([]);
  const [pdfs, setPdfs] = useState<any>([]); 
  const [canSubmit, setCanSubmit] = useState(true);
  const storageRef = ref(storage,`${noteId}/indentification/`);
 
  const beforeUpload = (file: any) => {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error('You can only upload PDF file!');
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('PDF must smaller than 5MB!');
    }
    return isPdf && isLt5M;
  };

  const dummyRequest = ({onSuccess}:any) => {
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
          url: await getDownloadURL(snapshot.ref),
        }
      ])
      setCanSubmit(false); 
      setTimeout(() => {
        setCanSubmit(true);
      }, 15000)
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
      deleteObject(ref(storage, `${noteId}/indentification/` + list.items[0].name));
    }
     
    setPdfs([]);
    message.success("Pdf successfully deleted");
  }

  useEffect(() => {
    const getCurrentPdf = async () => {
      const list = await listAll(storageRef);
      if(list.items.length > 0) {
        setPdfs(
          [{
            uid: list.items[0].name,
            name: list.items[0].name,
            status: "done",
            url: await getDownloadURL(list.items[0]),
          }]
        );
      }
    }
    getCurrentPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   // listen to the the change of the note in firestore 
   useEffect(() => {
    const ref = doc(db, `notes/${noteId}`);
    onSnapshot(ref, (query) => {
        const docData = query.data();
        console.log(docData);
    }, (error) => {
        console.log('Error getting documents: ', error);
    });
  }, [noteId]);

  return (
    <div style={{ width: 256 }}>
        <div>
          Ant Upload
          <Upload customRequest={dummyRequest} maxCount={1} accept=".pdf" beforeUpload={beforeUpload} fileList={pdfs} onChange={handleAnt} onRemove={handleRemove}>
            <Button>Select file</Button>
          </Upload>
          {
            canSubmit ? (
              <Button onClick={sendAnt}>Submit</Button>
            ) : (
              <Button loading>submit</Button>
            )
          }
        </div>
    </div>
  );
}

export default UploadPdf;