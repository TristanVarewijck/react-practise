import * as functions from "firebase-functions";
import * as cors from "cors";
const corsHandler = cors({ origin: true });

export const getPdfFromStorageHttp = functions.https.onRequest((req, res) => {
corsHandler(req, res, () => {
const data1= Buffer.from(req.body, "base64").toString("utf-8");


const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}
/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: any) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */

async function createFile(authClient:any) {
const drive = google.drive({version: 'v3', auth: authClient});

const fileMetaData = {
  name: 'sampleName', 
  mimeType: 'application/pdf',
  parents: ["1RhYD-flY6x3YINE_UKoDZl5Wd8D8iPmm"],
};

const media = {
    mimeType: 'application/pdf',
    body: data1,
}

await drive.files.create({
  resource: fileMetaData,
  media: media,
  fields: 'id',
})}
authorize().then(createFile).catch(console.error);
    });
})


