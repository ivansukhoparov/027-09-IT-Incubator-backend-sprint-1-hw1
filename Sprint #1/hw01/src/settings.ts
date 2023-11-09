import express, {Request,Response} from "express";
export const app = express();

const AvailableResolutions: string[] = [ "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160" ];
app.use(express.json());

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

    availableResolutions: typeof AvailableResolutions
    /*  nullable: true
        h01.Resolutionsstring
        Enum:
            [ P144, P240, P360, P480, P720, P1080, P1440, P2160 ]
        ]
        */
}
type RequestWithParams<P> = Request<P,{},{},{}>
type RequestWithBody<B> = Request<{},{},B,{}>
type Params ={
    id: string
}
type Body = {
    title: string
    author: string
    availableResolutions: typeof AvailableResolutions
}
type ErrorType = {
    errorsMessages:ErrorsMessageType[]
}
type ErrorsMessageType = {
    field:string
    message:string
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

app.get("/videos", (req:Request,res:Response):void=>{
    res.send(videos);
})

app.get("/videos/:id", (req:RequestWithParams<Params> ,res:Response):void=>{
    const id: number = +req.params.id;
    const video:VideoType|undefined = videos.find((el)=> el.id === id);
    if (!video) {
        res.sendStatus(404)
    }else{
        res.send(video)
    }
})

app.post("/videos", (req:RequestWithBody<Body>,res:Response):void=>{
    let errors:ErrorType = {
        errorsMessages:[]
    }

    let {title,author,availableResolutions} = req.body;

    if (!title || title.trim().length<1 || title.trim().length>40){
        errors.errorsMessages.push({message:"Invalid title", field:"title"});
    }

    if (!author || author.trim().length<1 || author.trim().length>20){
        errors.errorsMessages.push({message:"Invalid author", field:"author"});
    }

    if (Array.isArray(availableResolutions)){
        availableResolutions.map((r)=>{
            !AvailableResolutions.includes(r) && errors.errorsMessages.push({message:"Invalid availableResolutions", field:"availableResolutions"});
        })
    }else{
        availableResolutions=[]
    }

    if (errors.errorsMessages.length){
        res.status(400).send(errors)
        return
    }

    const createdAt= new Date();
    const publicationDate = new Date();

    publicationDate.setDate(createdAt.getDate()+1);

    const newVideo: VideoType = {
        id : +(new Date()),
        title :   title  ,
        author :  author  ,
        canBeDownloaded : false,
        minAgeRestriction : null,
        createdAt :   createdAt.toISOString()  ,
        publicationDate :   publicationDate.toISOString()  ,
        availableResolutions : availableResolutions
    }

    videos.push(newVideo);
    res.status(201).send(newVideo);
})


/*
app.delete("/testing/all-data", (req:Request,res:Response):void=>{
    res.send(204);
})


app.put("/videos/:id", (req:Request,res:Response):void=>{
    res.send(200);
})
app.delete("/videos/:id", (req:Request,res:Response):void=>{
    res.send(204);
})
*/