'use strict';
const fs = require('fs');

class BMT{
  constructor(){

  }

  open(file, callback){
    fs.readFile(file, (err, data) => {
      if(err) callback(err);
      callback(null, data);
    });
  }

}

module.exports = exports = BMT;