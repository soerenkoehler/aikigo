util = {
    fs: require('fs'),
    localFile: require('./util').localFile,
    userFile: require('./util').userFile,
    remote: require('electron').remote
}

factory = {
    statemachine: require(util.localFile('statemachine')),
    gtp: require(util.localFile('gtp')),
    preferences: require(util.localFile('preferences'))
}
