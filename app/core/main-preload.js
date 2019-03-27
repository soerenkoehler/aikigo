const { localFile } = require('./util');
const { Preferences } = require(localFile('preferences'));
const { GTP } = require(localFile('gtp-executor'));

app = {
    gtp: new GTP(),
    preferences: new Preferences(),
    remote: require('electron').remote
}
