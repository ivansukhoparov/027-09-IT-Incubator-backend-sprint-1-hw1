"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const port = 80;
const settings_1 = require("./settings");
settings_1.app.listen(port, () => {
    console.log(`listening port: ${port}`);
});
