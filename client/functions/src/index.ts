import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { authorize } from "./services/drive";

const path = require("path");
const os = require("os");
const fs = require("fs");
const { google } = require("googleapis")

admin.initializeApp();

// add a file from storage and drive
export const onPdfCreation = functions
  .runWith({ timeoutSeconds: 180 })
  .storage.object().onFinalize(async (object: any) => {
    const bucket = object.bucket;
    const bucketFilePath = object.name;
    const bucketFileIdFromPath = bucketFilePath.split("/")[0];
    const bucketFileNameFromPath = bucketFilePath.split("/").pop();
    const bucketFile = admin.storage().bucket(bucket).file(bucketFilePath);
    const firestoreFileRef = admin.firestore().collection("notes").doc(bucketFileIdFromPath);
    const localFilePath = path.join(os.tmpdir(), bucketFileNameFromPath);

    await firestoreFileRef.update({
        driveStatus: "processing",
      })

    await bucketFile.download({ destination: localFilePath });
    const localFile = await fs.createReadStream(localFilePath);
      
    const mediaToDrive = {
      mimeType: 'application/pdf',
      body: localFile,
    };
  
    const fileMetaDataForDrive = {
      name: bucketFileNameFromPath,
      mimeType: 'application/pdf',
      parents: ["1RhYD-flY6x3YINE_UKoDZl5Wd8D8iPmm"],
    };

    const createFile = async (authClient: any) => {
      const drive = google.drive({ version: 'v3', auth: authClient });
      try {
        const res = await drive.files.create({
          resource: fileMetaDataForDrive,
          media: mediaToDrive,
          fields: 'id',
        })
        
        await bucketFile.setMetadata({
          metadata: {
            driveId: res.data.id,
       }});
        
        await firestoreFileRef.update({
          driveStatus: "uploaded",
          docRef: bucketFilePath,
        })
        
        } catch (err) {
            functions.logger.error("Cannot update file drive status", err);
          
        }   
    };

    try {
      const auth = await authorize();
      await createFile(auth);

    } catch (e) {
      console.error(e)
    }
  });


// delete a file from storage and drive
export const onPdfDeletion = functions
  .runWith({ timeoutSeconds: 180 })
  .storage.object().onDelete(async (object: any) => {
    const bucketFilePath = object.name;
    const bucketFileDriveIdFromMetadata = object.metadata.driveId;
    const bucketFileIdFromPath = bucketFilePath.split("/")[0];
    const bucketFileNameFromPath = bucketFilePath.split("/").pop();
    const tempFilePath = path.join(os.tmpdir(), bucketFileNameFromPath);
    const firestoreFileRef = admin.firestore().collection("notes").doc(bucketFileIdFromPath);

    await firestoreFileRef.update({
        driveStatus: "processing",
      })

    const deleteFile = async (authClient: any) => {
      const drive = google.drive({ version: 'v3', auth: authClient });
      await fs.unlinkSync(tempFilePath)

      try {
        await drive.files.delete({
          fileId: bucketFileDriveIdFromMetadata,
        });
        await firestoreFileRef.update({
          driveStatus: "deleted",
          driveID: ""
        });
      } catch (err) {
        functions.logger.error("Cannot update file drive status", err);
      }
    }

      try {
        const auth = await authorize();
        await deleteFile(auth);

      } catch (e) {
        console.error(e)
      }

  });