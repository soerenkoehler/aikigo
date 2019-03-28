let currentState;
let stateMachine;

function beginState(start, definition) {
    if (definition) {
        stateMachine = definition;
    }
    currentState = stateMachine[start];
    currentState.in();
}

function updateState(response) {
    currentState.out(response);
}

$(document).ready(() => {
    let prefs = app.preferences.data;

    /*
     * Menu
     */
    $('#menu-play').on('click', () => {
        app.gtp.start(
            prefs.gtpServer,
            prefs.gtpOptions.replace(/\s\s+/g, ' ').split(' '),
            updateState);
        let waitForGTP = setTimeout(() => {
            app.gtp.proc.kill();
            $('#dialog-gtp-error').modal('show');
        }, 2000);
        beginState('name', {
            name: {
                in: () => app.gtp.send('name'),
                out: (response) => {
                    console.log('Name=' + response);
                    beginState('version');
                }
            },
            version: {
                in: () => app.gtp.send('version'),
                out: (response) => {
                    console.log('Version=' + response);
                    beginState('quit');
                }
            },
            quit: {
                in: () => app.gtp.send('quit'),
                out: (response) => {
                    clearTimeout(waitForGTP);
                    console.log(response);
                }
            }
        });
    });

    $('#menu-quit').on('click', () => app.remote.getCurrentWindow().close());

    /*
     * Preferences dialog
     */
    $('#dialog-preferences').on('show.bs.modal', () => {
        Object.entries(prefs).forEach(([k, v]) => {
            $('#dialog-preferences-' + k).val(v);
        });
    });
    $('#dialog-preferences-save').on('click', () => {
        Object.keys(prefs).forEach(k => {
            prefs[k] = $('#dialog-preferences-' + k).val();
        });
        app.preferences.save();
    });
    $('#dialog-preferences-gtpServer-select').on('click', () => {
        app.remote.dialog.showOpenDialog({
            title: "Select GTP Server executable",
        }, files => {
            if (files) {
                $('#dialog-preferences-gtpServer').val(files[0])
            }
        });
    })
})
