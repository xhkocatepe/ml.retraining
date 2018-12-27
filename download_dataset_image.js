/**
 * App Description  : Download files from csv
 * App Version      : 1.0
 * App Language     : Node.js
 * Project          : https://github.com/incubation-hub/....
 * Author name      : Bayram Hakan Kocatepe 
 * Author github    : https://github.com/xhkocatepe
 */

let csvFilePath = 'testo.csv',
    csv = require('csvtojson'),
    fs = require('graceful-fs'),
    request = require('request');
    groupArray = require('group-array');

let index = 23145,
    count = 0,
    iFolderNameCount = 60;

/**
 * csv to JSON
 */
csv()
  .fromFile(csvFilePath)
  .then((dataSet) => {
    getNext(dataSet);
  });

/**
 * @param {*Array} dataSet by CSV 
 */
function getNext(dataSet) {
  var sFileName = "";
  var sDownloadLink = dataSet[index].Link;
  var sFolderName = dataSet[index].Container;
  var dir = './images/' + sFolderName;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    iFolderNameCount = iFolderNameCount + 1;
    count = 0;
  }
  else {
    count = count + 1;
  }

  sFileName = dataSet[index].Container + '-' + count + ".jpg";

  var options = {
    method: 'GET',
    url: sDownloadLink,
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log("\n" + "index:" + index, 'Failed Downloaded----' + sFileName + "----" + dataSet[index].Title);
      console.log(error.message+"\n");
    }
    else {
      console.log("index:" + index, 'Finished Downloaded----' + sFileName + "----" + dataSet[index].Title);
    }
    index++;
    getNext(dataSet);
  }).pipe(fs.createWriteStream(dir + "/" + sFileName));

}