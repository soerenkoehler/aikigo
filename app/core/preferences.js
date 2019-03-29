const { localFile, userFile } = require('./util');
const fs = require('fs');

const preferencesFile = userFile('.aikigo.json');
const preferencesDefaultFile = localFile('preferences-default.json');

let Preferences = function () {
    this.default = JSON.parse(fs.readFileSync(preferencesDefaultFile));
    this.reload();
}

Preferences.prototype.reload = function () {
    let saveNew = false;
    try {
        this.data = JSON.parse(fs.readFileSync(preferencesFile));
    }
    catch (error) {
        // ignore errors
    }
    Object.keys(this.default).forEach(k => {
        if (this.data[k] === undefined) {
            this.data[k] = this.default[k];
            saveNew = true;
        }
    });
    if (saveNew) {
        this.save();
    }
}

Preferences.prototype.save = function () {
    fs.writeFileSync(preferencesFile, JSON.stringify(this.data, null, 4));
}

module.exports.Preferences = Preferences;
