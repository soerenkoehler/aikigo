util = {
    fs: require('fs'),
    localFile: require('./util').localFile,
    userFile: require('./util').userFile,
    remote: require('electron').remote
}

factory = {
    gtp: require(util.localFile('gtp')),
    gtpServerValidator: require(util.localFile('gtpServerValidator')),
    statemachine: require(util.localFile('statemachine')),
    preferences: require(util.localFile('preferences'))
}
