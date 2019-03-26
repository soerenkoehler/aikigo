let { localFile } = require('./util');
let { Preferences } = require(localFile('preferences'));

app = {
    preferences: new Preferences(),
    remote: require('electron').remote
}
