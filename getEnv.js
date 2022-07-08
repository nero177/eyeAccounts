const fs = require('fs');
console.log('starting')
const dotEnvExists = fs.existsSync('.env');
if (dotEnvExists) {
    console.log('getEnv.js: .env exists');
    process.exit();
}

const gcs = require('@google-cloud/storage');

const bucketName = `eyeaccounts.store`
gcs
    .bucket(bucketName)
    .file('.env')
    .download({ destination: '.env' })
    .then(() => {
        console.log('dot env downloaded successfully')
    }).catch((e) => {
        console.log('there was error while downloading dot env: ' + e)
    })