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
    //'https://www.googleapis.com/auth/forms',
    'https://www.googleapis.com/auth/spreadsheets',
    //'https://www.googleapis.com/auth/drive',
    //'https://www.googleapis.com/auth/calendar'
]

export const getGoogleAuth = async () => {
    return await google.auth.getClient({
        credentials: credentials,
        scopes: scopes
    }).then(response => {
        return response
    });
}

export const getParamsResource = async (spreadsheetId:string, range:string) => {
    return {
        auth: await getGoogleAuth(),
        spreadsheetId: spreadsheetId,
        range: range
    }
}

export const getSpreedsheet = async (spreadsheetId:string, range:string) => {

    //let range = 'A1:Q10000'
    
    return await sheets.spreadsheets.values.get(
        await getParamsResource(spreadsheetId, range)
    ).then(response => {
        return response.data.values
    })
}

export const getSpreedsheetHeader = async (spreadsheetId:string, range:string) => {

    //let range = 'A1:Q1'

    sheets.spreadsheets.values.get(
        this.getParamsResource(spreadsheetId, range), 
        async function sheetReturn (err, response:any) {
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

    /*console.log(spreadsheetId, range, values)
    console.log('Auth', await getGoogleAuth())*/

    sheets.spreadsheets.values.batchUpdate({
        auth: await getGoogleAuth(),
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

export const setSpreedsheetNotes = async (parametro:any) => {

    /*
    range: {
        sheetId: 1997890537,
        startRowIndex: 1,
        endRowIndex: 2,
        startColumnIndex: 0,
        endColumnIndex: 1
    },
    cell: {
        note:
            'Jean Alves 30/05/2019 13:49 \n "Comentário do campo da sheet" \n --- \n' +
            'Jean Eficilog 30/05/2019 14:02 \n "Novos comentário do campo da sheet" \n --- \n'
    }
    */

    //let spreadsheetId = '1PZCLAymlsaBO1GLFPGxjZSONkYGwy-tYBeXyIDibjaQ';

    sheets.spreadsheets.batchUpdate({
        auth: await getGoogleAuth(),
        spreadsheetId: parametro.spreadsheetId,
        requestBody: {
            includeSpreadsheetInResponse: false,
            requests: [{
                repeatCell: {
                    range: {
                        sheetId: parametro.sheetId,
                        startRowIndex: parametro.startRowIndex,
                        endRowIndex: parametro.endRowIndex,
                        startColumnIndex: parametro.startColumnIndex,
                        endColumnIndex: parametro.endColumnIndex
                    },
                    cell: {
                        note: parametro.note
                    },
                    fields: 'note'
                }
            }]
        }
    }, function (err, response:any) {
        err ? 
        console.log('The API returned an error: ' + err) :
        response.status == 200 ? true : false;
    })
}