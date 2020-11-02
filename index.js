const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let window = null;
let tray = null;

const lock = app.requestSingleInstanceLock();

if (!lock) {
	app.quit();
} else {
	function createWindow() {
		window = new BrowserWindow({
			minWidth: 560,
			minHeight: 560,
			webPreferences: {
				nodeIntegration: true,
				enableRemoteModule: true,
			},
			icon: path.resolve(
				__dirname,
				'web',
				'src',
				'assets',
				'icons',
				'icon.png'
			),
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

		window.on('close', function (event) {
			if (!app.isQuiting) {
				event.preventDefault();
				window.hide();
			}

			return false;
		});

		return window;
	}

	app.whenReady().then(() => {
		window = createWindow();

		tray = new Tray(
			path.resolve(__dirname, 'web', 'src', 'assets', 'icons', 'icon.png')
		);

		const contextMenu = Menu.buildFromTemplate([
			{ label: 'Abrir', type: 'normal', click: () => window.show() },
			{ type: 'separator' },
			{
				label: 'Sair',
				type: 'normal',
				click: () => {
					app.isQuiting = true;
					app.quit();
				},
			},
		]);

		tray.setToolTip('TaskPad');
		tray.setContextMenu(contextMenu);
		tray.setTitle('TaskPad');

		tray.on('click', () => {
			window.maximize();
		});
	});

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
}
