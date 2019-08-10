import createWindow from './helpers/window';
const { app , BrowserWindow, remote } = require('electron');
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
import { parse } from 'node-html-parser';
const fs = require('fs');
const createHTML = require('create-html');
import { render } from 'jsx-to-html';
const path = require('path');

exports.print = (billHTML, barHTML, cookerHTML, printers, callback) => {
  var html = createHTML({
    css: 'stylePrint.css',
    body: billHTML,
  });

  const dirPathFolder = path.join(process.cwd(), '/print');
   try {
    if (!fs.existsSync(dirPathFolder)) {
      fs.mkdirSync(dirPathFolder);
    }
  } catch(err) {
    console.log(err);
  }

  fs.writeFile(dirPathFolder + '\\bill.html' , html, function (err) {
    if (err) {
      console.log(err);
    } else {
      let win = new BrowserWindow({width:800, height:600, show: false});
      win.on('closed', () => {
        win = null;
      });
      win.loadURL(dirPathFolder + '\\bill.html');
      win.webContents.on('did-finish-load', () => {
        setTimeout(function(){
            win.webContents.print({silent: true, printBackground: true, deviceName: 'bill1'}, function (err) {
              win.webContents.print({silent: true, printBackground: true, deviceName: 'bill1'}, function (err) {});
            });
        }, 1000);
      });

      if (barHTML && barHTML != 'none') {
        var barHTMLTmp = createHTML({
          css: 'stylePrint.css',
          body: barHTML,
        });
        fs.writeFile(dirPathFolder + '\\bar.html' , barHTMLTmp, function (err) {
          if (err) {
            console.log(err);
          } else {
            let win1 = new BrowserWindow({width:800, height:600, show: false});
            win1.on('closed', () => {
              win1 = null;
            });
            win1.loadURL(dirPathFolder + '\\bar.html');
            win1.webContents.on('did-finish-load', () => {
              setTimeout(function(){
                win1.webContents.print({silent: true, printBackground: true, deviceName: 'bill2'}, function (err) {});
              }, 1000);
            });
          }
        });
      }

      if (cookerHTML && cookerHTML != 'none') {
        var cookerHTMLTmp = createHTML({
          css: 'stylePrint.css',
          body: cookerHTML,
        });
        fs.writeFile(dirPathFolder + '\\cooker.html' , cookerHTMLTmp, function (err) {
          if (err) {
            console.log(err);
          } else {
            let win2 = new BrowserWindow({width:800, height:600, show: false});
            win2.on('closed', () => {
              win2 = null;
            });
            win2.loadURL(dirPathFolder + '\\cooker.html');
            win2.webContents.on('did-finish-load', () => {
              setTimeout(function(){
                win2.webContents.print({silent: true, printBackground: true, deviceName: 'bill3'}, function (err) {});
              }, 1000);
            });
          }
        })
      }
    }
  })
};
