import createWindow from './helpers/window';
const { app , BrowserWindow, remote } = require('electron');
const fs = require('fs');
const path = require('path');


exports.getInfo = (callback) => {
	var obj = {
		soDienThoai: '0935080123',
		maMay: 'M01',
		passWifi: 'hunacoffee.com'
	};

	const dirPath = path.join(process.cwd(), '/print/config.json');
	try {
		if (!fs.existsSync(dirPath)) {
			var json = JSON.stringify(obj);
		  	fs.writeFile(dirPath, json, 'utf8', function() {
		  		callback(obj);
			});
		} else {
			fs.readFile(dirPath, 'utf8', function readFileCallback(err, data) {
			    if (err) {
			        console.log(err);
			    } else {
			    obj = JSON.parse(data);
			    console.log(obj);
			    if (!obj) {
			    	obj = '';
			    }
			    callback(obj);
			}});
		}
	} catch(err) {
		console.log(err);
	}
};
