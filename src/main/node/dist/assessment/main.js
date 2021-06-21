var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var DummyAI = require("../common/dummy-ai").DummyAI;
var dataProcessor = require("./dataProcessor").dataProcessor;
var csv = require("csv-parser");
var fs = require("fs");
/*
    if you don't define the maximum limit or a reasonable
    limit for the number of processes, your program will
    crash.
    In the current approach, we split the dataset to several
    part, based on the maximum process limit number.
    e.g. you have 1000 lines of data, and you have the limit
    of 500 processes at a time: so you do 2 iterations, each
    time 500 line of data.

    Unless you'ill face this issue.
    Error: spawn /Users/omid_ch/.nvm/versions/node/v12.22.1/bin/node EAGAIN
    Error: write EBADF

  */
var PROCESS_PER_USER_LIMIT = 500;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var outputPath, datasetPath, data, lines;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outputPath = "../outputData.txt";
                    datasetPath = "../../nasdaq-company-list.csv";
                    //deleting the output data from last attempt
                    if (fs.existsSync(outputPath))
                        fs.unlinkSync(outputPath);
                    data = fs.readFileSync(datasetPath, "UTF-8");
                    lines = data.split(/\r?\n/).slice(1);
                    // splitting dataset to sets and process one by one
                    return [4 /*yield*/, dataProcessor(lines, PROCESS_PER_USER_LIMIT)];
                case 1:
                    // splitting dataset to sets and process one by one
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () {
    console.log("Data available in the output path");
})
    .catch(function (err) {
    console.log("Error", err);
});
//# sourceMappingURL=main.js.map