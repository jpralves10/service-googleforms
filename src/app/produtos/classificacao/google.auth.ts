import { Request, Response } from 'express';

import { google } from 'googleapis';
import privatekey from '../../../config/privatekey';

/*import { google } from 'googleapis';
import privatekey from './privatekey.json';*/

/*let google = require('googleapis');
let privatekey = require('./privatekey.json');*/

//http://isd-soft.com/tech_blog/accessing-google-apis-using-service-account-node-js/
//https://console.cloud.google.com/apis/credentials?project=my-project-1498746435911&folder&organizationId


export const googleFunction = async (req: Request, res: Response) => {

    let client = await google.auth.getClient({
        credentials: {
            client_email: privatekey.client_email,
            private_key: privatekey.private_key
        },
        scopes: [
            'https://www.googleapis.com/auth/forms',
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/calendar'
        ]
    });

    // Authenticate Request
    /*authClient.authorize(function (err, tokens) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Successfully connected!");
        }
    });*/

    /*const client = new JWT(
        privatekey.client_email,
        null,
        privatekey.private_key,
        [
            'https://www.googleapis.com/auth/forms',
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/calendar'
        ],
    );
    const url = `https://www.googleapis.com/dns/v1/projects/${ privatekey.project_id }`;
    const response = await client.request({url});
    console.log(response.data);*/


    // Google Sheets API
    let spreadsheetId = '1PZCLAymlsaBO1GLFPGxjZSONkYGwy-tYBeXyIDibjaQ';
    let range = 'A1:Q3'
    let sheets = google.sheets('v4');

    //const project = await google.auth.getProjectId();

    sheets.spreadsheets.values.get({
        auth: client,
        spreadsheetId: spreadsheetId,
        range: range
    }, function (err, response:any) {
        if (err) {
            console.log('The API returned an error: ' + err);
        } else {
            //console.log(response);

            for (let row of response.data.values) {
                console.log(row);
            }
        }
    });
}