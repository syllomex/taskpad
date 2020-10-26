const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
	const window = new BrowserWindow({
		minWidth: 1024,
		minHeight: 768,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
		},
		icon: path.resolve(__dirname, 'web', 'src', 'assets', 'icons', 'icon.png'),
		title: 'TaskPad',
	});

	window.setMenu(null);

	if (isDev) {
		window.loadURL('http://localhost:25554');
		window.maximize();
		window.webContents.openDevTools();
	} else {
		const webPath = path.join(__dirname, 'web', 'build', 'index.html');
		window.loadFile(webPath);
	}
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
