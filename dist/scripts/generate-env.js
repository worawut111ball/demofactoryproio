/**
 * Script to generate a .env file with database configuration
 *
 * Usage:
 * npx ts-node scripts/generate-env.ts
 */
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var fs = require("fs");
var path = require("path");
var readline = require("readline");
// Define the template for the .env file
var envTemplate = "# Database Connection\nDB_PROVIDER={{provider}}\nDB_HOST={{host}}\nDB_PORT={{port}}\nDB_USER={{user}}\nDB_PASSWORD={{password}}\nDB_NAME={{database}}\nDB_SCHEMA={{schema}}\n\n# Database Connection URL (will be constructed from above variables)\nDATABASE_URL=\"{{provider}}://{{user}}:{{password}}@{{host}}:{{port}}/{{database}}{{schemaParam}}\"\n\n# Database Connection Pool\nDB_POOL_MIN=1\nDB_POOL_MAX=10\n\n# Database Logging\nDB_LOG_LEVEL=info  # options: query, info, warn, error\n\n# Database SSL\nDB_SSL_ENABLED=false\n# DB_SSL_CA_CERT=\n# DB_SSL_KEY=\n# DB_SSL_CERT=\n\n# Prisma\nPRISMA_LOG_QUERIES=true\nPRISMA_ERROR_FORMAT=pretty  # options: pretty, colorless, minimal\n\n# Application Settings\nAPP_NAME=Factory Pro\nAPP_PORT=3000\nAPP_BASE_URL=http://localhost:3000\n";
// Create readline interface for user input
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Function to ask questions and get user input
function askQuestion(question) {
    return new Promise(function (resolve) {
        rl.question(question, function (answer) {
            resolve(answer);
        });
    });
}
function generateEnvFile() {
    return __awaiter(this, void 0, void 0, function () {
        var dbProvider, dbHost, dbPort, _a, dbUser, dbPassword, dbName, dbSchema, _b, schemaParam, envContent, envPath;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log("Generating .env file for database configuration...");
                    return [4 /*yield*/, askQuestion("Database provider (mysql/postgresql) [postgresql]: ")];
                case 1:
                    dbProvider = (_c.sent()) || "postgresql";
                    return [4 /*yield*/, askQuestion("Database host [localhost]: ")];
                case 2:
                    dbHost = (_c.sent()) || "localhost";
                    if (!(dbProvider === "mysql")) return [3 /*break*/, 4];
                    return [4 /*yield*/, askQuestion("Database port [3306]: ")];
                case 3:
                    _a = (_c.sent()) || "3306";
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, askQuestion("Database port [5432]: ")];
                case 5:
                    _a = (_c.sent()) || "5432";
                    _c.label = 6;
                case 6:
                    dbPort = _a;
                    return [4 /*yield*/, askQuestion("Database username: ")];
                case 7:
                    dbUser = _c.sent();
                    return [4 /*yield*/, askQuestion("Database password: ")];
                case 8:
                    dbPassword = _c.sent();
                    return [4 /*yield*/, askQuestion("Database name [factorypro_db]: ")];
                case 9:
                    dbName = (_c.sent()) || "factorypro_db";
                    if (!(dbProvider === "postgresql")) return [3 /*break*/, 11];
                    return [4 /*yield*/, askQuestion("Database schema [public]: ")];
                case 10:
                    _b = (_c.sent()) || "public";
                    return [3 /*break*/, 12];
                case 11:
                    _b = "";
                    _c.label = 12;
                case 12:
                    dbSchema = _b;
                    schemaParam = dbProvider === "postgresql" && dbSchema ? "?schema=".concat(dbSchema) : "";
                    envContent = envTemplate
                        .replace(/{{provider}}/g, dbProvider)
                        .replace(/{{host}}/g, dbHost)
                        .replace(/{{port}}/g, dbPort)
                        .replace(/{{user}}/g, dbUser)
                        .replace(/{{password}}/g, dbPassword)
                        .replace(/{{database}}/g, dbName)
                        .replace(/{{schema}}/g, dbSchema)
                        .replace(/{{schemaParam}}/g, schemaParam);
                    envPath = path.resolve(process.cwd(), ".env");
                    fs.writeFileSync(envPath, envContent);
                    console.log("\n.env file generated at ".concat(envPath));
                    console.log("You can now run `npx prisma generate` and `npx prisma db push` to set up your database.");
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
// Run the script
generateEnvFile().catch(function (error) {
    console.error("Error generating .env file:", error);
    process.exit(1);
});
