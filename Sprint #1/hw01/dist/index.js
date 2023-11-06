"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
const port = 80;
console.log(`run ${port}`);
settings_1.app.listen(port, () => {
    console.log(`listen port ${port}`);
});
