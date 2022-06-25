/* tslint:disable */
// @ts-nocheck

const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   AWS_RUM_GUEST_ROLE_ARN: '${process.env.AWS_RUM_GUEST_ROLE_ARN}',
   AWS_RUM_IDENTITY_POOL_ID: '${process.env.AWS_RUM_IDENTITY_POOL_ID}',
   AWS_RUM_APPLICATION_ID: '${process.env.AWS_RUM_APPLICATION_ID}',
   AWS_RUM_ENDPOINT: '${process.env.AWS_RUM_ENDPOINT}',
   AWS_RUM_REGION: '${process.env.AWS_RUM_REGION}'
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});

/* tslint:enable */
