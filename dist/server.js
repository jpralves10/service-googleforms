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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var auth_1 = __importDefault(require("./config/auth"));
var router_1 = __importDefault(require("./app/produtos/router"));
var server = express_1.default();
var request = require('request');
var cors = require('cors');
//-----------------------------------------
// Middleware
//-----------------------------------------
server.use(cors_1.default());
server.options('*', cors_1.default());
server.use(function (req, res, next) {
    //req.setHeader('Access-Control-Allow-Origin', '*');
    //req.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //req.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    //req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    /*req.setHeader('Access-Control-Request-Method', 'GET');
    req.setHeader('Access-Control-Request-Headers', 'origin, x-requested-with, accept');
    req.setHeader('Origin', 'https://localhost:3443');

    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3443');
    res.setHeader('Access-Control-Allow-Methods', 'GET');*/
    /*res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");*/
    next();
});
server.use(body_parser_1.default.json());
server.use(auth_1.default);
server.use(body_parser_1.default.urlencoded({
    extended: true
}));
//-----------------------------------------
// Rotas
//-----------------------------------------
server.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.send("<h1>Hello World 123456<h2>");
            return [2 /*return*/];
        });
    });
});
server.use('/produtos/', router_1.default);
//server.get('*', (req, res) => { res.sendStatus(404); });
server.use(function (err, req, res, next) { res.status(500).json(err); });
//-----------------------------------------
// Server Start
//-----------------------------------------
server.listen(process.env.PORT || 3443, function () {
    console.log('Server is running on http://localhost:3443');
})
    .on('error', function (err) { return console.log(err); });
/* Server Https */
/*
var options = {
    key: fs.readFileSync("./keys/key.key"),
    cert: fs.readFileSync("./keys/cert.crt")
}

var serverHttps = Https.createServer(options, server).listen(process.env.PORT || 3443, function () {
    console.log('Server is running on http://localhost:3443');
})
.on('error', err => console.log(err));

serverHttps.close(() =>{
    console.log('Finish Server!')
})

process.on('SIGTERM', () => {
    console.log('Closing http server.');
    serverHttps.close(() => {
        console.log('Http server closed.');
    });
});*/ 
