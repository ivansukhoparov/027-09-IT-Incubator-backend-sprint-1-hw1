import express, {Request,Response} from "express";

const app = express();
const port:80 = 80;

app.delete("/testing/all-data", (req:Request,res:Response):void=>{
    res.send(204)
})
app.get("/videos", (req:Request,res:Response):void=>{
    res.send("videos")
})
app.get("/videos/:id", (req:Request,res:Response):void=>{
    res.send("videos")
})
app.post("/videos", (req:Request,res:Response):void=>{
    res.send(200)
})
app.put("/videos/:id", (req:Request,res:Response):void=>{
    res.send(200)
})
app.delete("/videos/:id", (req:Request,res:Response):void=>{
    res.send(204)
})

app.listen(port, ():void=>{
    console.log(`listening port: ${port}`);
})

