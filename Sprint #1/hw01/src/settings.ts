import express, { Request, Response } from "express";

export const app = express();

const AvailableResolution: string[] = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

type VideoType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createAt: string
    publicationDate: string
    avaliableResolution: typeof AvailableResolution
}

const videos: VideoType[] = [{
    id: 1,
    title: "string",
    author: "string",
    canBeDownloaded: true,
    minAgeRestriction: null,
    createAt: "string",
    publicationDate: "string",
    avaliableResolution: ["P144"],
}]

