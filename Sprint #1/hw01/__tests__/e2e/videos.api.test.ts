import request from 'supertest';
import {app} from "../../src/settings";


const testName = "/videos/";

describe(testName, ()=>{
    beforeAll(async ()=>{
        await request(app).delete("/testing/all-data");
    })

    it ("01 - should be return 200 and empty array", async ()=>{
       await request(app).get(testName).expect(200,[]);
    })

    it("02 - POST does not create the video with incorrect data (no title, no author)", async ()=>{
        await request(app).post(testName).send({
            "title": "",
            "author": "",
        }).expect(400, {errorsMessages:[{message:"Invalid title", field:"title"}, {message:"Invalid author", field:"author"}]});

        await request(app).get(testName).expect(200,[]);
    })

    it("03 - POST does not create the video with incorrect data (title and author over length)", async ()=>{
        await request(app).post(testName).send({
            "title": "qwertyuiopasdfghjklzxcvbnasdfghqwedfgxcvewr",
            "author": "qwertyuiopasdfghjklzxcvbnasdfghqwedfgxcvewr",
        }).expect(400, {errorsMessages:[{message:"Invalid title", field:"title"}, {message:"Invalid author", field:"author"}]});

        await request(app).get(testName).expect(200,[]);
    })

    it("04 - POST does not create the video with incorrect data (title or author over length)", async ()=>{
        await request(app).post(testName).send({
            "title": "qwertyuiopasdfghjklzxcvbnasdfghqwedfgxcvewr",
            "author": "Ivan",
        }).expect(400, {errorsMessages:[{message:"Invalid title", field:"title"}]});

        await request(app).post(testName).send({
            "title": "New video",
            "author": "qwertyuiopasdfghjklzxcvbnasdfghqwedfgxcvewr",
        }).expect(400, {errorsMessages:[{message:"Invalid author", field:"author"}]});

        await request(app).get(testName).expect(200,[]);
    })

    let testVideo1:any;

    it("05 - POST should be create the video with correct data (only title and author)", async ()=>{
        const res = await request(app).post(testName).send({
            "title": "New Video 1",
            "author": "Ivan",
        }).expect(201);

        testVideo1= res.body;

        await request(app).get(testName+testVideo1.id).expect(testVideo1);
    })

    let testVideo2:any;

    it("06 - POST should be create the video with correct data (only title and author and invalid AvailableResolutions)", async ()=>{
        const res = await request(app).post(testName).send({
            "title": "New Video 1",
            "author": "Ivan",
            "availableResolutions":50
        }).expect(201);

        testVideo2= res.body;

        await request(app).get(testName+testVideo2.id).expect(testVideo2);

        expect(testVideo2.availableResolutions).toEqual([]);
    })

    let testVideo3:any;

    it("07 - POST should be create the video with correct data (only title and author and  AvailableResolutions)", async ()=>{
        const res = await request(app).post(testName).send({
            "title": "New Video 1",
            "author": "Ivan",
            "availableResolutions": ["P144", "P240"]
        }).expect(201);

        testVideo3= res.body;

        await request(app).get(testName+testVideo3.id).expect(testVideo3);

        expect(testVideo3.availableResolutions).toEqual(["P144", "P240"]);
    })

})