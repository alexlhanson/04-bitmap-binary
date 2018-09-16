# Bitmap Transformer Project

## Description
This project takes a bitmap file as an input and will apply transformations to it which are saved into a new bitmap file. It uses the command line interface to run.  In order to test it you can use the following format in CLI: "node ./lab-alex/index.js <file-path> <transformed file-path> <transformation name>"  
  Please note the transformations include :
  - invert
  - lighten
  - darken
  - sunny

###Functionality
The program takes the bitmap file, and grabs the data via the buffer module which is able to read the data of the file as binary data buffer.  It then parses out portions of the raw data via standard header and body format for a bitmap file.  The parsed body data is transformed according to RGB values they represent for each pixel.

## Limitations
The transformartions are limited to the ones listed above.  Additionally, this transformer is set to work with a 24 bits/pixel configuration.