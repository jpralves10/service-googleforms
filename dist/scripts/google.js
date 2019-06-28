/*function myFunction() {
  
    try {
        var triggers = ScriptApp.getProjectTriggers();

        for (var i in triggers)
          ScriptApp.deleteTrigger(triggers[i]);
      
        ScriptApp.newTrigger("PayloadGoogleFormData")
          .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
          .onFormSubmit().create();

    } catch (error) {
        Logger.log(error);
        throw new Error("Please add this code in the Google Spreadsheet");
    }
}

function PayloadGoogleFormData(e) {

  try {
    
    var payload = [];
    
    var
    ss = SpreadsheetApp.getActiveSheet(),
    idSheet = ss.getSheetId(),
    titulo = ss.getSheetName();
    
    payload.push([idSheet, titulo]);
    
    var range = SpreadsheetApp.getActiveSheet().getDataRange();
    range.getValues().forEach(function(item){
        payload.push(item)
    });
    
    
    /*var
    ss = SpreadsheetApp.getActiveSheet(),
    idSheet = ss.getSheetId(),
    titulo = ss.getSheetName(),
    lr = ss.getLastRow(),
    carimbo = ss.getRange(lr, 1, 1, 1).getValue(),  // column A
    email   = ss.getRange(lr, 2, 1, 1).getValue(),  // column B
    campoC  = ss.getRange(lr, 3, 1, 1).getValue(),  // column C
    campoD  = ss.getRange(lr, 4, 1, 1).getValue(),  // column D
    campoE  = ss.getRange(lr, 5, 1, 1).getValue(),  // column E
    campoF  = ss.getRange(lr, 6, 1, 1).getValue(),  // column F
    campoG  = ss.getRange(lr, 7, 1, 1).getValue(),  // column G
    campoH  = ss.getRange(lr, 8, 1, 1).getValue(),  // column H
    campoI  = ss.getRange(lr, 9, 1, 1).getValue(),  // column I
    campoJ  = ss.getRange(lr, 10, 1, 1).getValue(),  // column J
    campoK  = ss.getRange(lr, 11, 1, 1).getValue(),  // column K
    campoL  = ss.getRange(lr, 12, 1, 1).getValue(),  // column L
    campoM  = ss.getRange(lr, 13, 1, 1).getValue(),  // column M
    campoN  = ss.getRange(lr, 14, 1, 1).getValue(),  // column N
    campoO  = ss.getRange(lr, 15, 1, 1).getValue(),  // column O
    campoP  = ss.getRange(lr, 16, 1, 1).getValue(),  // column P
    campoQ  = ss.getRange(lr, 17, 1, 1).getValue();  // column Q
    
    
    /*var lastCol = ss.getLastColumn();
    var maxCols = ss.getMaxColumns();
    
    SpreadsheetApp.getActiveSpreadsheet().insertColumnsAfter(lastCol +1, (maxCols - lastCol));* /
    
    var payload = {
      "sheet": { 'idSheet': String(idSheet), 'titulo': String(titulo) },
      "resposta": { 'idResposta': String(email), 'carimbo': String(carimbo) },
      "campoC": { 'idCampo': '1', 'nmColuna': 'CÓDIGO NCM OU HS CODE UTILIZADO ATUALMENTE', 'deCampo': String(campoC) },
      "campoD": { 'idCampo': '2', 'nmColuna': 'DESCRIÇÃO COMPLETA DA MERCADORIA', 'deCampo': String(campoD) },
      "campoE": { 'idCampo': '3', 'nmColuna': 'FUNÇÃO DA MERCADORIA', 'deCampo': String(campoE) },
      "campoF": { 'idCampo': '4', 'nmColuna': 'APLICAÇÃO DA MERCADORIA', 'deCampo': String(campoF) },
      "campoG": { 'idCampo': '5', 'nmColuna': 'COMPOSIÇÃO DA MERCADORIA', 'deCampo': String(campoG) },
      "campoH": { 'idCampo': '6', 'nmColuna': '% II', 'deCampo': String(campoH) },
      "campoI": { 'idCampo': '7', 'nmColuna': '% IPI', 'deCampo': String(campoI) },
      "campoJ": { 'idCampo': '8', 'nmColuna': '% PIS', 'deCampo': String(campoJ) },
      "campoK": { 'idCampo': '9', 'nmColuna': '% COFINS', 'deCampo': String(campoK) },
      "campoL": { 'idCampo': '10', 'nmColuna': 'NVE', 'deCampo': String(campoL) },
      "campoM": { 'idCampo': '11', 'nmColuna': 'DESTAQUE -TRATAMENTO ADMINISTRATIVO', 'deCampo': String(campoM) },
      "campoN": { 'idCampo': '12', 'nmColuna': 'NECESSIDADE DE L.I', 'deCampo': String(campoN) },
      "campoO": { 'idCampo': '13', 'nmColuna': 'DESCRIÇÃO FISCAL - SUGERIDA ', 'deCampo': String(campoO) },
      "campoP": { 'idCampo': '14', 'nmColuna': 'OBSERVAÇÕES', 'deCampo': String(campoP) },
      "campoQ": { 'idCampo': '15', 'nmColuna': 'STATUS DO ITEM', 'deCampo': String(campoQ) }
    }* /
    
    //Logger.log(payload);
    
    SubmitGoogleFormData(payload);

  } catch (error) {
    Logger.log(error.toString());
  }
}

function NotesGoogleFormData(e) {

    try {
      
        /* Notes */
/*var ssp = SpreadsheetApp.getActiveSpreadsheet();
var source = ssp.getSheets()[0];

var range = source.getRange('A1:C4');
Logger.log('Note: ' + range.getNote());

var results = range.getNotes();

for (var i in results) {
  for (var j in results[i]) {
    Logger.log('Aqui: ' + results[i][j]);
  }
} * /

} catch (error) {
Logger.log(error.toString());
}
}

function SubmitGoogleFormData(payload) {

try {
var headers = {
    //"Authorization" : "Basic " + Utilities.base64Encode('99uEzPjdf3U6crJHr35p:X')
};

var options = {
    'method': 'post',
    "contentType" : "application/json",
    'headers': headers,
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': false
}

var url = "https://maestro-googleforms.herokuapp.com/produtos/sheets";
var response = UrlFetchApp.fetch(url, options);

Logger.log(JSON.stringify(response));

} catch (error) {
Logger.log(error.toString());
}
}*/ 
