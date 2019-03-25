const currentWindow = require('electron').remote.getCurrentWindow();

$(document).ready(() => {
    $('#menu-quit').on('click', () => currentWindow.close());
})