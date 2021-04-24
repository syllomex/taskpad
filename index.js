const {
	app,
	BrowserWindow,
	Tray,
	Menu,
	autoUpdater,
	dialog,
} = require('electron');

require('update-electron-app')();

const path = require('path');
const isDev = require('electron-is-dev');

const server = 'https://taskpad-syllomex.vercel.app';
const feed = `${server}/update/${process.platform}/${app.getVersion()}`;
autoUpdater.setFeedURL({ url: feed });

let window = null;
let tray = null;

const lock = app.requestSingleInstanceLock();

if (!isDev) {
	setInterval(() => {
		autoUpdater.checkForUpdates();
	}, 60000);
}

if (!lock) {
	app.quit();
} else {
	function createWindow() {
		window = new BrowserWindow({
			minWidth: 450,
			minHeight: 450,
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
			// window.maximize();
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

	if (!isDev) {
		autoUpdater.on(
			'update-downloaded',
			(event, releaseNotes, releaseName, releaseDate, updateURL) => {
				const dialogOpts = {
					type: 'info',
					buttons: ['Restart', 'Later'],
					title: 'Application Update',
					message: process.platform === 'win32' ? releaseNotes : releaseName,
					detail:
						'A new version has been downloaded. Restart the application to apply the updates.',
				};

				dialog.showMessageBox(dialogOpts).then((returnValue) => {
					if (returnValue.response === 0) autoUpdater.quitAndInstall();
				});
			}
		);

		autoUpdater.on('error', (message) => {
			console.error('There was a problem updating the application');
			console.error(message);
		});
	}
}
