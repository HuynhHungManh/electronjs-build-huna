import createWindow from './helpers/window';
const { app , BrowserWindow, remote } = require('electron');
exports.minimum = (callback) => {
  BrowserWindow.getFocusedWindow().minimize();
};
