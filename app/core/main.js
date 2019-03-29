$(document).ready(() => {
    let prefs = new factory.preferences();

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
        validatePreferences(prefs.data);
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
