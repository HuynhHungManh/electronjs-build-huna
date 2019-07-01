import createWindow from './helpers/window';
const { app , BrowserWindow } = require('electron');
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;


 

exports.print = (url,callback) => {
  console.log(url);

  var printer = require("node-thermal-printer");
  printer.init({
    type: 'epson',
    interface: '/dev/usb/lp0'
  });
  printer.alignCenter();
  printer.println("Hello world");
  printer.cut();
  printer.execute(function(err){
    if (err) {
      console.error("Print failed", err);
    } else {
     console.log("Print done");
    }
  });

};
