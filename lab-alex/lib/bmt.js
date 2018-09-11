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
    console.log('inverting');
    //transform colors
    bitmap.invert = new Buffer.from(bitmap.body.map(decVal => 255 - parseInt(decVal)));
    callback(null, bitmap);
    // console.log(bitmap.invert);
  }

  save(bitmap, outputFile, callback){
    //Write transformed butmap to disk
    //NOTE: transformed colors might still be encoded, they need to be raw.
    //NOTE: bitmap is NOT a Buffer, but fs.writeFile takes a buffer
    // console.log(bitmap);
    console.log(this.invert);
    const transformed = Buffer.concat([bitmap.fileHeaderBuf, bitmap.infoHeaderBuf, bitmap.invert]);

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