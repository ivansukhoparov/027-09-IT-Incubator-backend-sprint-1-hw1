"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const AvailableResolution = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
const videos = [{
        id: 1,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createAt: "string",
        publicationDate: "string",
        avaliableResolution: ["P144"],
    }];
