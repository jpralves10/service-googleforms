"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var googleapis_1 = require("googleapis");
var privatekey_1 = __importDefault(require("../../../config/privatekey"));
//http://isd-soft.com/tech_blog/accessing-google-apis-using-service-account-node-js/
//https://console.cloud.google.com/apis/credentials?project=my-project-1498746435911&folder&organizationId
var sheets = googleapis_1.google.sheets('v4');
var credentials = {
    client_email: privatekey_1.default.client_email,
    private_key: privatekey_1.default.private_key
};
var scopes = [
    //'https://www.googleapis.com/auth/forms',
    'https://www.googleapis.com/auth/spreadsheets',
];
exports.getGoogleAuth = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, googleapis_1.google.auth.getClient({
                    credentials: credentials,
                    scopes: scopes
                }).then(function (response) {
                    return response;
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getParamsResource = function (spreadsheetId, range) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, exports.getGoogleAuth()];
            case 1: return [2 /*return*/, (_a.auth = _b.sent(),
                    _a.spreadsheetId = spreadsheetId,
                    _a.range = range,
                    _a)];
        }
    });
}); };
exports.getSpreedsheet = function (spreadsheetId, range) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = sheets.spreadsheets.values).get;
                return [4 /*yield*/, exports.getParamsResource(spreadsheetId, range)];
            case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()]).then(function (response) {
                    return response.data.values;
                })];
            case 2: 
            //let range = 'A1:Q10000'
            return [2 /*return*/, _c.sent()];
        }
    });
}); };
exports.getSpreedsheetHeader = function (spreadsheetId, range) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //let range = 'A1:Q1'
        sheets.spreadsheets.values.get(this.getParamsResource(spreadsheetId, range), function sheetReturn(err, response) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (err) {
                        return [2 /*return*/, []];
                    }
                    else {
                        return [2 /*return*/, response.data.values];
                    }
                    return [2 /*return*/];
                });
            });
        });
        return [2 /*return*/];
    });
}); };
exports.setSpreedsheetEmail = function (spreadsheetId, range, values) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                /*
                range: 'B2:B4',
                values: [['jpralves10@gmail.com', 'jean@eficilog.com', 'teste@eficilog.com']]
                */
                /*console.log(spreadsheetId, range, values)
                console.log('Auth', await getGoogleAuth())*/
                _b = (_a = sheets.spreadsheets.values).batchUpdate;
                _c = {};
                return [4 /*yield*/, exports.getGoogleAuth()];
            case 1:
                /*
                range: 'B2:B4',
                values: [['jpralves10@gmail.com', 'jean@eficilog.com', 'teste@eficilog.com']]
                */
                /*console.log(spreadsheetId, range, values)
                console.log('Auth', await getGoogleAuth())*/
                _b.apply(_a, [(_c.auth = _d.sent(),
                        _c.spreadsheetId = spreadsheetId,
                        _c.requestBody = {
                            valueInputOption: 'USER_ENTERED',
                            data: [{
                                    majorDimension: 'COLUMNS',
                                    range: range,
                                    values: [values]
                                }]
                        },
                        _c), function (err, response) {
                        err ?
                            console.log('The API returned an error: ' + err) :
                            response.status == 200 ? true : false;
                    }]);
                return [2 /*return*/];
        }
    });
}); };
exports.setSpreedsheetNotes = function (parametro) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
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
                _b = (_a = sheets.spreadsheets).batchUpdate;
                _c = {};
                return [4 /*yield*/, exports.getGoogleAuth()];
            case 1:
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
                _b.apply(_a, [(_c.auth = _d.sent(),
                        _c.spreadsheetId = parametro.spreadsheetId,
                        _c.requestBody = {
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
                        },
                        _c), function (err, response) {
                        err ?
                            console.log('The API returned an error: ' + err) :
                            response.status == 200 ? true : false;
                    }]);
                return [2 /*return*/];
        }
    });
}); };
