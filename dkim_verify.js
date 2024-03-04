const DKIM = require('dkim');
const fs = require('fs');
const path = require('path');

var filename = "yahoo.eml";//process.argv.slice( 2 ).shift()
if( !filename ) {
  console.error( 'Usage: node dkim_verify.js <filename>' )
  process.exit( 1 )
}

var message = fs.readFileSync( path.join( __dirname, filename ) )
DKIM.verify( message, function( error, res ) {
    if(error){
        console.log("error:",error);
    }else{
        console.log("res:",res);
        console.log("hash:",res[0].signature.hash.toString("base64"));
        console.log("signature:",res[0].signature.signature.toString("base64"));
    }
})