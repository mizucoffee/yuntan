const fs = require("fs-extra");
const path = require("path");
const legalEagle = require("legal-eagle");

legalEagle({ path: "./" }, (err, p) => {
  if (err) return console.log(err);
  else {
    fs.ensureDirSync("./dist");
    if (fs.pathExistsSync(path.join(__dirname, "./dist/license.json")))
      fs.removeSync(path.join(__dirname, "./dist/license.json"));
    fs.writeJsonSync("./dist/license.json", p);
  }
});
