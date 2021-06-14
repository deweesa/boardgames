const { app, BrowserWindow } = require('electron');

const path  = require('path');

function createWindow () {
	const win = new BrowserWindow({
		width: 800,
		heigth: 600,
		webPrefrences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
			contextIsolation: false,
		}
	});

	win.loadFile('index.html');
}

app.whenReady().then(() => {
	createWindow();
});

app.on('window-all-close', function () {
	if (process.platform !== 'darwin') app.quit();
});