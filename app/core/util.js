const path = require('path');
const os = require('os');

module.exports.localFile = file => path.join(__dirname, file);
module.exports.userFile = file => path.join(os.homedir(), file);
