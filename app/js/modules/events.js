const { shell } = require('electron')

document.querySelector('body').onclick = e => {
    shell.beep()
}
