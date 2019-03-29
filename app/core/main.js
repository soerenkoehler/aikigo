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
    let prefs = app.preferences;

    /*
     * Menu
     */
    $('#menu-play').on('click', () => console.log('play...'));

    $('#menu-quit').on('click', () => app.remote.getCurrentWindow().close());

    /*
     * Preferences dialog
     */
    $('#dialog-preferences').on('show.bs.modal', () => {
        $('#dialog-preferences-gtp-error').addClass('d-none');
        $('#dialog-preferences-save').attr('disabled', false);
        prefs.reload();
        Object.entries(prefs.data).forEach(([k, v]) => {
            $('#dialog-preferences-' + k).val(v);
        });
    });
    $('#dialog-preferences-save').on('click', () => {
        $('#dialog-preferences-save').attr('disabled', true);
        Object.keys(prefs.data).forEach(k => {
            prefs.data[k] = $('#dialog-preferences-' + k).val();
        });
        validatePreferences(prefs.data);
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

function validatePreferences(data) {
    app.gtp.start(data.gtpServer, data.gtpOptions.replace(/\s\s+/g, ' ').split(' '), updateState);
    let waitForGTP;
    let gtpResponse = "";
    beginState('name', {
        name: {
            in: () => {
                waitForGTP = setTimeout(() => beginState('invalid'), 2000);
                app.gtp.send('name')
            },
            out: (response) => {
                gtpResponse += response;
                beginState(response == 'GNU Go' ? 'version' : 'invalid');
            }
        },
        version: {
            in: () => app.gtp.send('version'),
            out: (response) => {
                gtpResponse += ' ' + response;
                beginState(response == '3.8' ? 'valid' : 'invalid');
            }
        },
        valid: {
            in: () => app.gtp.send('quit'),
            out: (response) => {
                clearTimeout(waitForGTP);
                app.preferences.save();
                $('#dialog-preferences').modal('hide');
            }
        },
        invalid: {
            in: () => {
                app.gtp.proc.kill();
                $('#dialog-preferences-gtp-error-text').text(gtpResponse);
                $('#dialog-preferences-gtp-error').removeClass('d-none');
                $('#dialog-preferences-save').attr('disabled', false);
            },
            out: () => { }
        }
    });
}
