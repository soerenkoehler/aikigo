
let prefs = new factory.preferences();
let gtpServer = null;

$(document).ready(() => {
    new factory.gtp.validateGtpServer(
        prefs.data.gtpServer,
        prefs.data.gtpOptions,
        (validator) => updateSelectedServer(validator.server)
    );

    /*
     * Menu
     */
    $('#menu-play').on('click', () => console.log('play...'));

    $('#menu-quit').on('click', () => util.remote.getCurrentWindow().close());

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
        new factory.gtp.validateGtpServer(
            prefs.data.gtpServer,
            prefs.data.gtpOptions,
            (validator) => {
                if (validator.server) {
                    prefs.save();
                    updateSelectedServer(validator.server);
                }
                updatePreferencesDialog(validator);
            }
        );
    });
    $('#dialog-preferences-gtpServer-select').on('click', () => {
        util.remote.dialog.showOpenDialog({
            title: "Select GTP Server executable",
        }, files => {
            if (files) {
                $('#dialog-preferences-gtpServer').val(files[0])
            }
        });
    })
});

function updateSelectedServer(server) {
    gtpServer = server;
    if (server) {
        $('#navbar-info-gtp-server').text(server.title);
    } else {
        $('#navbar-info-gtp-server').text('none');
    }
}

function updatePreferencesDialog(validator) {
    if (validator.server) {
        $('#dialog-preferences').modal('hide');
    } else {
        $('#dialog-preferences-gtp-error-text').text(validator.name + ' ' + validator.version);
        $('#dialog-preferences-gtp-error').removeClass('d-none');
        $('#dialog-preferences-save').attr('disabled', false);
    }
}
