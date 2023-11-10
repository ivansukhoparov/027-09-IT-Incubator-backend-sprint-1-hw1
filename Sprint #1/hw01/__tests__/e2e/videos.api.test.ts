import request from 'supertest';
import {app} from "../../src/settings";

describe("/videos", ()=>{

    it ("should be 1=1", ()=>{
        expect(1).toBe(1);
    })
    it ("should be return 200 and empty array", ()=>{
       request(app).get("/videos").expect(200,[]);
    })

})