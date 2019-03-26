$(document).ready(() => {
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
})
