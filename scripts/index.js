
const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
let sourceDir = path.join(__dirname,'../person');
let destinationDir = path.join(__dirname,'../dist/person');
if (!fs.existsSync(destinationDir)) fs.mkdirSync(destinationDir,{ recursive: true });

fsExtra.copy(sourceDir, destinationDir,(error) => {
  if (error) throw error;
  console.log("照片目录处理完成！\n");
});