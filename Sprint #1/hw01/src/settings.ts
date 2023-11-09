import express, {Request,Response} from "express";
export const app = express();

const AvailableResolutions: string[] = [ "P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160" ];
app.use(express.json());

type VideoType ={
    id: number
    title:	string
    author:	string
    canBeDownloaded:	boolean
    minAgeRestriction:	number |null
    createdAt: 	string //($date-time)
    publicationDate:	string //($date-time)
    availableResolutions: typeof AvailableResolutions

}
type RequestWithParams<P> = Request<P,{},{},{}>
type RequestWithBody<B> = Request<{},{},B,{}>
type RequestWithBodyAndParams<P,B> =Request<P, {}, B, {}>
type Params ={
    id: string
}
type CreateVideoDto = {
    title: string
    author: string
    availableResolutions: typeof AvailableResolutions
}
type UpdateVideoDto = {
    title: string
    author: string
    availableResolutions: typeof AvailableResolutions
    canBeDownloaded: boolean
    minAgeRestriction: number|null
    publicationDate: string
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


app.get("/videos", (req:Request, res:Response):void=>{
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

app.post("/videos", (req:RequestWithBody<CreateVideoDto>,res:Response):void=>{
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

app.put("/videos/:id", (req: RequestWithBodyAndParams<Params, UpdateVideoDto>, res:Response):void=> {
    const id: number = +req.params.id;

    let errors: ErrorType = {
            errorsMessages: []
        }

        let {title, author,availableResolutions,canBeDownloaded, minAgeRestriction} = req.body;

        if (!title || title.trim().length<1 || title.trim().length>40) {
            errors.errorsMessages.push({message:"Invalid title", field:"title"});
        }

        if (!author || author.trim().length<1 || author.trim().length>40) {
            errors.errorsMessages.push({message:"Invalid title", field:"title"});
        }

        if (Array.isArray(availableResolutions)){
            availableResolutions.map((r)=>{
                !AvailableResolutions.includes(r) && errors.errorsMessages.push({message:"Invalid availableResolutions", field:"availableResolutions"});
            })
        }else{
            availableResolutions=[];
        }

        if (typeof canBeDownloaded==="undefined"){
            canBeDownloaded=false;
        }

        if (typeof minAgeRestriction!== "undefined" && typeof minAgeRestriction === "number") {
            if (minAgeRestriction<1 || minAgeRestriction>18) {
                errors.errorsMessages.push({
                    message: "Invalid minAgeRestriction",
                    field: "minAgeRestriction"
                });
            }
        }else {
            minAgeRestriction=null;
        }

    const videoIndex = videos.findIndex((v) => v.id === id);
    const video  = videos.find((v) => v.id == id);

        if (errors.errorsMessages.length>0){
            res.status(400).send(errors);
            return
        }

        if(!video) {
        res.sendStatus(404)
        }
        else{

        const publicationDate = new Date();
        const updateItem: VideoType = {
                id: video.id,
                title: title,
                author: author,
                canBeDownloaded: canBeDownloaded,
                minAgeRestriction: minAgeRestriction,
                createdAt: video.createdAt,
                publicationDate: publicationDate.toISOString(),
                availableResolutions: availableResolutions
        }
        videos.splice(videoIndex,1,updateItem)
        res.sendStatus(200)
        }
})

app.delete("/videos/:id", (req:RequestWithParams<Params>,res:Response):void=>{
    const id: number = +req.params.id;
    const videoIndex = videos.findIndex((v) => v.id === id);
    if (videoIndex<0){
        res.sendStatus(404);
        return;
    }
    videos.splice(videoIndex,1)
    res.sendStatus(204)
})