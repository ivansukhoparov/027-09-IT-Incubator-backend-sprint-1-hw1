
const port:80 = 80;

import {app} from "./settings";

app.listen(port, ():void=>{
    console.log(`listening port: ${port}`);
})

