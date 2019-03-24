const fs = require('fs');
const os = require('os');

const settingsFile = os.homedir() + '/.aikigo.json';

let Settings = function () {
    try {
        this.data = JSON.parse(fs.readFileSync(settingsFile));
    } catch (error) {
        this.data = new Object();
        this.data.gtpServer = "gnugo";
        this.save();
    }
}

Settings.prototype.save = function () {
    fs.writeFileSync(settingsFile, JSON.stringify(this.data, null, 4 ));
}

Settings.prototype.edit = function(window){
    window.loadFile('settings.html');
}

module.exports.Settings = Settings;
