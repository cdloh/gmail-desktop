/* eslint-disable import/no-unresolved */
import { app, shell, Menu, BrowserWindow } from 'electron'
/* eslint-enable import/no-unresolved */

const APP_NAME = app.getName()
let mailtoStatus = app.isDefaultProtocolClient('mailto')

function toggleMailto() {
  if (app.isDefaultProtocolClient('mailto')) {
    app.removeAsDefaultProtocolClient('mailto')
    mailtoStatus = false
  } else {
    app.setAsDefaultProtocolClient('mailto')
    mailtoStatus = true
  }
}

const darwinMenu = [
  {
    label: APP_NAME,
    submenu: [
      {
        label: `About ${APP_NAME}`,
        role: 'about'
      },
      {
        label: `Hide ${APP_NAME}`,
        accelerator: 'Cmd+H',
        role: 'hide'
      },
      {
        label: 'Hide others',
        accelerator: 'Cmd+Shift+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: `Quit ${APP_NAME}`,
        accelerator: 'Cmd+Q',
        click() {
          app.quit()
        }
      }
    ]
  },
  {
    label: 'Settings',
    submenu: [
      {
        label: 'Default MailTo: Provider',
        type: 'checkbox',
        checked: mailtoStatus,
        click() {
          toggleMailto()
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo Typing',
        accelerator: 'Cmd+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+Cmd+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'Cmd+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'Cmd+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'Cmd+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'Cmd+A',
        role: 'selectall'
      }
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Back',
        click(item, focusedWindow) {
          if (focusedWindow && focusedWindow.webContents.canGoBack()) {
            focusedWindow.webContents.goBack()
          }
        }
      },
      {
        label: 'Forward',
        click(item, focusedWindow) {
          if (focusedWindow && focusedWindow.webContents.canGoForward()) {
            focusedWindow.webContents.goForward()
          }
        }
      },
      {
        label: 'Compose',
        accelerator: 'Cmd+N',
        click(item, focusedWindow) {
          const code = "window.location.href = window.location.origin+window.location.pathname+'#compose'"
          focusedWindow.webContents.executeJavaScript(code)
        }
      },
      {
        label: 'Compose New Window',
        accelerator: 'Cmd+Shift+N',
        click(item, focusedWindow) {
          const replyToWindow = new BrowserWindow({})
          replyToWindow.loadURL('https://mail.google.com/mail/?view=cm')
        }
      },
      {
        label: 'Minimize',
        accelerator: 'Cmd+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'Cmd+W',
        role: 'close'
      }
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: `${APP_NAME} Website`,
        click() {
          shell.openExternal('https://github.com/timche/gmail-desktop')
        }
      },
      {
        label: 'Report an issue',
        click() {
          shell.openExternal('https://github.com/timche/gmail-desktop/issues/new')
        }
      }
    ]
  }
]

export default Menu.buildFromTemplate(darwinMenu)
