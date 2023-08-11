/* eslint-disable no-underscore-dangle */
const fs = require('fs');

class StorageService {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const fileName = +new Date() + meta.filename;
    const path = `${this._folder}/${fileName}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, rejects) => {
      fileStream.on('error', (error) => rejects(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(fileName));
    });
  }
}

module.exports = StorageService;
