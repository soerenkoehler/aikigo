const preferencesFile = util.userFile('.aikigo.json');
const preferencesDefaultFile = util.localFile('preferences-default.json');

let Preferences = function () {
    this.default = JSON.parse(util.fs.readFileSync(preferencesDefaultFile));
    this.reload();
}

Preferences.prototype.reload = function () {
    let saveNew = false;
    try {
        this.data = JSON.parse(util.fs.readFileSync(preferencesFile));
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
    util.fs.writeFileSync(preferencesFile, JSON.stringify(this.data, null, 4));
}

module.exports = Preferences;
