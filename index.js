const fs = require('fs');
const path = require('path');

console.log(__dirname);
const dirPath = path.join(__dirname, 'data');

const getDirContent = dirPath => new Promise((resolve, reject) => {
    fs.readdir(dirPath, (error, files) => {
        if (error) {
            reject(error);
        } else {
            const filesWithAbsolutePath = files.map(file => {
                return { filePath: path.join(dirPath, file) };
            });
            resolve(filesWithAbsolutePath);
        }
    })
});

const getFileContent = file => new Promise((resolve, reject) => {
    fs.readFile(file.filePath, (error, data) => {
        if (error) {
            reject(error);
        } else {
            resolve({
                ...file,
                content: data.toString(),
            });
        }
    })
});

const getFileStats = file => new Promise((resolve, reject) => {
    fs.stat(file.filePath, (error, stats) => {
        if (error) {
            reject(error);
        } else {
            resolve({
                ...file,
                size: stats.size
            });
        }
    })
});

async function doDirectoryReport(dirPath) {
    const files = await getDirContent(dirPath);

    files.forEach(async file => {
        const { filePath, content } = await getFileContent(file); // blocheaza doar functia asta
        const { size } = await getFileStats(file);
        console.log(`Size: ${size}`);
        console.log(`Content: ${content}\n`);
    });
}

doDirectoryReport('data');