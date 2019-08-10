import createWindow from './helpers/window';
const { app , BrowserWindow, remote } = require('electron');

exports.getPrint = (callback) => {
  let win = new BrowserWindow({width:800, height:600, show: false});
  var list = win.webContents.getPrinters();
  callback(list);
};
