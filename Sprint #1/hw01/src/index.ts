import { app } from "./settings"

const port: 80 = 80;

console.log(`port ${port}`);

app.listen(port, (): void => {
    console.log(`listening port ${port}`)
})