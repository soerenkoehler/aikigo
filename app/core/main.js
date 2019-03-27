$(document).ready(() => {
    $('#menu-play').on('click', () => {
        app.gtp.execute(app.preferences.data.gtpServer, (c) => {
            console.log('Exit', app.gtp.buffer);
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
