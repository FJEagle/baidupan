import {BrowserWindow, ipcMain, webContents} from 'electron'
import {autoUpdater} from "electron-updater"

const window = BrowserWindow.fromWebContents(webContents.getFocusedWebContents());
//和之前package.json配置的一样
autoUpdater.setFeedURL('http://lee.com/app/update1');

function handleUpdate() {

    const returnData = {
        error: {status: -1, msg: '检测更新查询异常'},
        checking: {status: 0, msg: '正在检查应用程序更新'},
        updateAva: {status: 1, msg: '检测到新版本，正在下载,请稍后'},
        updateNotAva: {status: -1, msg: '您现在使用的版本为最新版本,无需更新!'},
    };

    //更新错误
    autoUpdater.on('error', (error) => {
        sendUpdateMessage(returnData.error)
    });

    //发现新版本
    autoUpdater.on('update-available', (info) => {
        sendUpdateMessage(returnData.updateAva)
    });


    // 更新下载进度事件
    autoUpdater.on('download-progress', (progressObj) => {
        window.webContents.send('downloadProgress', progressObj)
    });


    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        ipcMain.on('isUpdateNow', (e, data) => {
            autoUpdater.quitAndInstall();
        });
    });

    //执行自动更新检查
    autoUpdater.checkForUpdates();
}

function sendUpdateMessage(text) {
    console.log(text);
    window.webContents.send('message', text)
}

handleUpdate();