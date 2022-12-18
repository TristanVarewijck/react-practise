import React, { useEffect, useState } from "react";
import {db, storage} from "../../firebaseService/firebaseConfig"
import {listAll, ref, uploadBytes, deleteObject, getDownloadURL} from "firebase/storage";
import { doc, onSnapshot } from "firebase/firestore";
import { Upload, Button, message, Spin } from "antd";
import { noteProps } from "../../types";

enum UploadStatus {
  none = "none",
  processing = "processing",
  uploaded = "uploaded",
  deleted = "deleted",
}
interface UploadPdfProps {
  noteId: string;
  documentType: string;
  modalName: string; 
}

interface UploadJpegProps extends UploadPdfProps {
  isImg: boolean;
}

const UploadPdf = ({ noteId, documentType, modalName }:UploadPdfProps): JSX.Element => {
  const [antPdfs, setAntPdfs] = useState<any>([]);
  const [pdfs, setPdfs] = useState<any>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const storageRef = ref(storage,`${noteId}/${documentType}/`); 


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


  // dummy request to prevent antd from sending request to server
  const dummyRequest = ({onSuccess}:any):void => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleAnt = async (e: any) => {
    setAntPdfs(e.file.originFileObj);

    if(e.file.originFileObj){
      setPdfs((prevState: any) => [{
        ...[prevState],
        uid: e.file.originFileObj.name,
        name: e.file.originFileObj.name,
       }]);
    }
  };

  const sendAnt = async () => {
    // dynamically "folder" 
    const storageFileRef = ref(storage, `${noteId}/${documentType}/` + antPdfs.name);
    await uploadBytes(storageFileRef, antPdfs);
    const downloadUrl = await getDownloadURL(storageFileRef);

    setPdfs((prevState: any) => [{
      ...[prevState],
      uid: antPdfs.name,
      name: antPdfs.name,
      url: downloadUrl,
    }])
      setLoading(true);

      const list = await listAll(storageRef);
      if(list.items.length > 1) {
      try {
         await deleteObject(ref(storage, `${noteId}/${documentType}/` + list.items[0].name)); 
      } catch (error) {
        console.log("cannot upload file to storage" + error) 
      } 
    }
  };

  const handleRemove = async () => {
    const list = await listAll(storageRef);
    if(list.items.length > 0) {
    try {
      await deleteObject(ref(storage, `${noteId}/${documentType}/` + list.items[0].name))
      setPdfs([]);
    } catch (error) {
      console.log("cannot delete file to storage" + error) 
      }
    }
    setPdfs([]);
    setLoading(true)
  }

   useEffect(() => {
    // dynamically "notes"
    const ref = doc(db, `${modalName}/${noteId}`);
    onSnapshot(ref, (query) => {
        const docData = query.data() as noteProps;
        switch (docData.driveStatus) {
          case UploadStatus.uploaded:
            const fileName = storageRef.fullPath.split("/").pop()
            setPdfs((prevState: any) =>  [{
              ...[prevState],
              uid: docData.id,
              name: fileName,
              url: docData.docRef,
              }]);
              setLoading(false);
            break;
          case UploadStatus.processing:
            setLoading(true);
            break;
          case UploadStatus.deleted:
          case UploadStatus.none:
            setLoading(false);
            setPdfs([]);
            break;
          default:
            break;
        }

    }, (error) => {
        console.log('Error getting documents: ', error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
        <div>
          <Spin spinning={!loading ? false : true}>
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