import { google } from 'googleapis';
import privatekey from '../../../config/privatekey';

//http://isd-soft.com/tech_blog/accessing-google-apis-using-service-account-node-js/
//https://console.cloud.google.com/apis/credentials?project=my-project-1498746435911&folder&organizationId

const sheets = google.sheets('v4');

const credentials = {
    client_email: privatekey.client_email,
    private_key: privatekey.private_key
}

const scopes = [
    'https://www.googleapis.com/auth/forms',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/calendar'
]

export const getSpreedsheet = async (spreadsheetId:string, range:string) => {

    let googleAuth = await google.auth.getClient({
        credentials: credentials,
        scopes: scopes
    });

    //let range = 'A1:Q10000'

    return await sheets.spreadsheets.values.get({
        auth: googleAuth,
        spreadsheetId: spreadsheetId,
        range: range
    }).then(response => {
        return response.data.values
    });
}

export const getSpreedsheetHeader = async (spreadsheetId:string, range:string) => {

    let googleAuth = await google.auth.getClient({
        credentials: credentials,
        scopes: scopes
    });

    //let range = 'A1:Q1'

    sheets.spreadsheets.values.get({
        auth: googleAuth,
        spreadsheetId: spreadsheetId,
        range: range
    }, async function sheetReturn (err, response:any) {
        if(err){
            return []
        }else{
            return response.data.values;
        }
    });
}

export const setSpreedsheetEmail = async (spreadsheetId:string, range:string, values: string[]) => {

    /*
    range: 'B2:B4',
    values: [['jpralves10@gmail.com', 'jean@eficilog.com', 'teste@eficilog.com']]
    */

    let googleAuth = await google.auth.getClient({
        credentials: credentials,
        scopes: scopes
    });

    sheets.spreadsheets.values.batchUpdate({
        auth: googleAuth,
        spreadsheetId: spreadsheetId,
        requestBody: {
            valueInputOption: 'USER_ENTERED',
            data: [{
                majorDimension: 'COLUMNS',
                range: range,
                values: [values]
            }]
        }
    }, function (err, response:any) {
        err ? 
        console.log('The API returned an error: ' + err) :
        response.status == 200 ? true : false;
    })
}