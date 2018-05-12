// image resizing and resampling
// under 5mb / over 5mb / over 10mb
// 추천은 under 5mb - 80, over 5mb - 40, over 10mb - 20 ( 대체적으로 1mb 내외)

const fs = require('fs');
const gm = require('gm');
const Path = require('path');

const getImageSize = (path) =>
    new Promise((resolve, reject) => {
        gm(Path.resolve(__dirname, path))
            .size((err, size) => {
                if (err) reject(err);
                resolve(size);
            });
    });

const resizeImg = (srcPath, name) => {
    Promise.all([10, 20, 30, 40, 50, 60, 70, 80].map(resolution => {
        new Promise((res, rej) => {
            gm(Path.resolve(__dirname, srcPath, name + '.jpg'))
                .quality(resolution)
                .write(Path.resolve(__dirname, srcPath, 'result', name + '_' + resolution + '.jpg'), (err) => err ? rej(err) : res())
        });
    }))
}

resizeImg('../../resources/img/', 'over5mb');

// getImageSize('../../resources/img/img_test_resize.jpg').then(console.log).catch(console.log)