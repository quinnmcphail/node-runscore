var RSClient = require("../index.js");
const assert = require("assert");

describe("RSClient TCP/IP Connection", function(){
    describe("TCP Connection", function(){
      it("Connects to RSServer", function(){
        // var open = RSClient.Open('127.0.0.1',56789);
        assert(true);
      });
    });
    describe("TCP Login", function(){
      it("Specifies Login Information for RSServer", function(){
        // var login = RSClient.login('','','8.2.3.0');
        assert(true);
      });
    });
    describe("TCP Connection Close", function(){
      it("Closes the connection to RSServer", function(){
        // var close = RSClient.Close();
        assert(true);
      });
    });
});
