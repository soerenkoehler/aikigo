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
    $('#menu-play').on('click', () => {
        app.gtp.start(app.preferences.data.gtpServer, ['--mode', 'gtp'], updateState);
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
                out: (response) => console.log(response)
            }
        });
    });

    $('#menu-quit').on('click', () => app.remote.getCurrentWindow().close());

    $('#dialog-preferences').on('show.bs.modal', () => {
        Object.entries(app.preferences.data).forEach(([k, v]) => {
            $('#dialog-preferences-' + k).val(v);
        });
    });
    $('#dialog-preferences-save').on('click', () => {
        Object.keys(app.preferences.data).forEach(k => {
            app.preferences.data[k] = $('#dialog-preferences-' + k).val();
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
