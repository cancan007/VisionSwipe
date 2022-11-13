const fse = require('fs-extra');
const fs = require('fs');

if (fs.existsSync("./build")) {
    fse.copySync("./build", "../backend/build")
    console.log("Copied build file to backend")
}