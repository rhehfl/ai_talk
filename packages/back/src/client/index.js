"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callGemini = void 0;
var geminiClient_1 = require("./geminiClient");
Object.defineProperty(exports, "callGemini", { enumerable: true, get: function () { return __importDefault(geminiClient_1).default; } });
