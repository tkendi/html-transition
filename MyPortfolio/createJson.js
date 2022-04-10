// const fs = require('fs');
// const process = require('process');

// // process.argv.forEach((value) => {
// //   console.log(value)
// // });

// // console.log(process.argv[2]);

// fs.readFile('./app.json', 'utf-8', (err, data) => {
//   if (err) console.error('error', err);

//   if (!process.argv[2]) throw new Error('not supported argv');

//   if (process.argv[2] === 'ios') {
//     console.log(JSON.parse(data).expo.ios.buildNumber);
//   } else if (process.argv[2] === 'android') {
//     console.log(JSON.parse(data).expo.android.versionCode);
//   } else if (process.argv[2] === 'release:ios') {
//     console.log('release');
//     console.log(JSON.parse(data).ios);
//   } else if (process.argv[2] === 'release:android') {
//     console.log('release');
//     console.log(JSON.parse(data).android);
//   }
// });
