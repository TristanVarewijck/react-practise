import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import * as cors from "cors";
import { authorize } from "./services/drive";

const path = require("path");
const os = require("os");
const fs = require("fs");
const { google } = require("googleapis")
// const corsHandler = cors({ origin: true });

admin.initializeApp();

// export const getPdfFromStorageHttp = functions
// .runWith({ timeoutSeconds: 180 })
// .https.onRequest((req, res) => {
// corsHandler(req, res, () => {

// const pdfFile= Buffer.from(req.body, "base64").toString("utf-8");

// async function createFile(authClient:any) {
// const drive = google.drive({version: 'v3', auth: authClient});
// const fileMetaData = {
//   name: 'sampleName', 
//   mimeType: 'application/pdf',
//   parents: ["1RhYD-flY6x3YINE_UKoDZl5Wd8D8iPmm"],
// };

// const media = {
//     mimeType: 'application/pdf',
//     body: pdfFile,
// }

// await drive.files.create({
//   resource: fileMetaData,
//   media: media,
//   fields: 'id',
// })}

// authorize().then(createFile).catch(console.error);
//   });
// })


// upload pdf to drive when pdf is uploaded to storage
export const onPdfCreation = functions
.runWith({ timeoutSeconds: 180 })
.storage.object().onFinalize(async (object: any) => {
  const bucket = object.bucket;
  const filePath = object.name;
  const fileIdFromPath = filePath.split("/")[0];
  functions.logger.info("path", fileIdFromPath);
  const fileName = filePath.split("/").pop();
  const bucketFile = admin.storage().bucket(bucket).file(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  if (fileName.includes("pdf")) {
    await bucketFile.download({ destination: tempFilePath });
    const fileMetaData = {
      name: fileName, 
      mimeType: 'application/pdf',
      parents: ["1RhYD-flY6x3YINE_UKoDZl5Wd8D8iPmm"],
    };
    
    const media = {
        mimeType: 'application/pdf',
        body: await fs.createReadStream(tempFilePath),
    };

    const createFile = async (authClient:any) => {
      const drive = google.drive({version: 'v3', auth: authClient});

      drive.files.create({
        resource: fileMetaData,
        media: media,
        fields: 'id',
      }).then((res:any) => {
        const file = admin.storage().bucket(bucket).file(filePath);
        try {
          file.setMetadata({
            metadata: {
              driveId: res.data.id
            }
          })

           // update file in firestore with drive id
          const fileRef = admin.firestore().collection("notes").doc(fileIdFromPath as string);
          fileRef.update({
            documentRef: res.data.id
          })
        } catch (error) {
          functions.logger.info("Cannot update file metadata", fileIdFromPath);
        };
      }).catch((err:Error) => console.log("error"))
    };

      authorize().then(createFile).catch(console.error);
    }}); 

export const onPdfDeletion = functions.storage.object().onDelete(async (object: any) => {
  // const bucket = object.bucket;
  const filePath = object.name;
  const fileId = object.metadata.driveId;
  const fileName = filePath.split("/").pop();
 
  // const bucketFile = admin.storage().bucket(bucket).file(filePath);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  functions.logger.info("File deleted", { structuredData: true });
  if (fileName.includes("pdf")) {
    const deleteFile = async (authClient:any) => {
    functions.logger.info("deleted file: ", fileName, { structuredData: true });

      // delete local file 
    await fs.unlinkSync(tempFilePath);

    // delete file from drive
    const drive = google.drive({version: 'v3', auth: authClient});
    await drive.files.delete({
      fileId: fileId,
    })
    };

  
      authorize().then(deleteFile).catch(console.error);
    }});
  