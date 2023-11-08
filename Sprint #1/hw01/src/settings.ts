import express, {Request,Response} from "express";
export const app = express();

const availableResolutions: string[] = [ "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160" ];

type VideoType ={
    id: number
    title:	string
    author:	string
    canBeDownloaded:	boolean
    //By default - false

    minAgeRestriction:	number |null
    /*maximum: 18
    minimum: 1
    default: null
    nullable: true
    null - no restriction*/

    createdAt: 	string //($date-time)
    publicationDate:	string //($date-time)
    //By default - +1 day from CreatedAt

    availableResolutions: typeof availableResolutions
    /*  nullable: true
        h01.Resolutionsstring
        Enum:
            [ P144, P240, P360, P480, P720, P1080, P1440, P2160 ]
        ]
        */
}

const videos: VideoType[] = [
    {
          id : 0,
          title :   "string"  ,
          author :   "string"  ,
          canBeDownloaded : true,
          minAgeRestriction : null,
          createdAt :   "2023-11-07T22:36:07.308Z"  ,
          publicationDate :   "2023-11-07T22:36:07.308Z"  ,
          availableResolutions : [
              "P144"
          ]
    }
];

app.delete("/testing/all-data", (req:Request,res:Response):void=>{
    res.send(204);
})
app.get("/videos", (req:Request,res:Response):void=>{
    res.send(videos);
})
app.get("/videos/:id", (req:Request,res:Response):void=>{
    res.send("videos by id");
})
app.post("/videos", (req:Request,res:Response):void=>{
    res.send(200);
})
app.put("/videos/:id", (req:Request,res:Response):void=>{
    res.send(200);
})
app.delete("/videos/:id", (req:Request,res:Response):void=>{
    res.send(204);
})
