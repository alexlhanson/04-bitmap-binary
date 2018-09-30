'use strict';
const fs = require('fs');

class BMT{
  constructor(){
    this.buf = null;
    this.fileHeaderBuf = null;
    this.infoHeaderBuf = null; 
    this.fileHeader = null;
    this.infoHeader = null;
    this.body = null;
  }
  
  open(file, callback){

    fs.readFile(file, (err, data) => {
      if(err) callback(err);
      this.buf = data;
      
      _parseBitMapBuffer(this);
      _decodeBodyBuffer(this);
      
      callback(null, this);
    });
  }

  invert(bitmap, callback){
    bitmap.body = new Buffer.from(bitmap.body.map(decVal => 255 - parseInt(decVal)));
    callback(null, bitmap);
  }

  lighten(bitmap, callback){
    bitmap.body = new Buffer.from(bitmap.body.map(decVal => {
      if (parseInt(decVal) < 220) {
        return parseInt(decVal) + 35;
      } else {
        return 255;
      }
    }));
    callback(null, bitmap);
  }

  darken(bitmap, callback){
    bitmap.body = new Buffer.from(bitmap.body.map(decVal => {
      if (parseInt(decVal) > 35) {
        return parseInt(decVal) - 35;
      } else {
        return 0;
      }
    }));
    callback(null, bitmap);
  }
  
  sunny(bitmap, callback){
    bitmap.body = new Buffer.from(bitmap.body.map((decVal, index) => {
      if (index % 3 !== 0) {
        return parseInt(decVal);
      } else {
        return 0;
      }
    }));

    callback(null, bitmap);
  }

  save(bitmap, outputFile, callback){
    const transformed = Buffer.concat([bitmap.fileHeaderBuf, bitmap.infoHeaderBuf, bitmap.body]);

    fs.writeFile(outputFile, transformed, (err) =>{
      if (err) callback (err);
    });
    
    callback(null);
  }
}

let _parseBitMapBuffer = function(self){
  self.fileHeaderBuf = self.buf.slice(0, 14);
  self.fileHeader = {
    fileType: self.fileHeaderBuf.toString('ascii', 0 , 2),
    fileSize: self.fileHeaderBuf.readUInt32LE(2),
    reserved: self.fileHeaderBuf.readUInt32LE(6),
    dataOffset: self.fileHeaderBuf.readUInt32LE(10),
  };
  self.infoHeaderBuf = self.buf.slice(14, 54);
  self.infoHeader = {
    infoHeaderSize: self.infoHeaderBuf.readUInt32LE(0),
    widthPx: self.infoHeaderBuf.readUInt32LE(4),
    heightPx: self.infoHeaderBuf.readUInt32LE(8),
    planes: self.infoHeaderBuf.readUInt16LE(12),
    bitPerPx: self.infoHeaderBuf.readUInt16LE(14),
  };
  self.body = Array.from(self.buf.slice(54));
};

let _decodeBodyBuffer = function(self){
  
};

module.exports = exports = BMT;