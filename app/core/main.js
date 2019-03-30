$(document).ready(() => {
    let prefs = new factory.preferences();

    new factory.gtpServerValidator(
        prefs.data.gtpServer,
        prefs.data.gtpOptions,
        (validator) => updateNavbarInfo(validator)
    ).validate()

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
        new factory.gtpServerValidator(
            prefs.data.gtpServer,
            prefs.data.gtpOptions,
            (validator) => {
                if (validator.valid) {
                    prefs.save();
                    updateNavbarInfo(validator);
                }
                updatePreferencesDialog(validator);
            }
        ).validate()
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

function updateNavbarInfo(validator) {
    if (validator.valid) {
        $('#navbar-info-gtp-server').text(validator.name + ' ' + validator.version);
    } else {
        $('#navbar-info-gtp-server').text('none');
    }
}

function updatePreferencesDialog(validator, prefs) {
    if (validator.valid) {
        $('#dialog-preferences').modal('hide');
    } else {
        $('#dialog-preferences-gtp-error-text').text(validator.name + ' ' + validator.version);
        $('#dialog-preferences-gtp-error').removeClass('d-none');
        $('#dialog-preferences-save').attr('disabled', false);
    }
}

