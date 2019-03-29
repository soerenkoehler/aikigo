
let GtpServerValidator = function () {
    this.gtp = new factory.gtp()
}

GtpServerValidator.prototype.validate = function (gtpServer, gtpOptions, callback) {
    this.valid = false
    this.name = "";
    this.version = "";
    this.statemachine = new factory.statemachine({
        init: {
            in: (machine) => this.gtp.start(gtpServer, gtpOptions.replace(/\s\s+/g, ' ').split(' '), machine.end),
            out: (machine) => machine.begin('name')
        },
        name: {
            in: () => {
                this.gtpTimeout = setTimeout(() => beginState('invalid'), 2000);
                this.gtp.send('name')
            },
            out: (machine, data) => {
                this.name = data;
                machine.begin(data == 'GNU Go' ? 'version' : 'invalid');
            }
        },
        version: {
            in: () => this.gtp.send('version'),
            out: (machine, data) => {
                this.version = data;
                machine.begin(data == '3.8' ? 'valid' : 'invalid');
            }
        },
        valid: {
            in: () => this.gtp.send('quit'),
            out: () => {
                clearTimeout(this.gtpTimeout);
                this.preferences.save();
                this.valid = true
                callback(this);
                // $('#dialog-preferences').modal('hide');
            }
        },
        invalid: {
            in: () => {
                this.gtp.proc.kill();
                callback(this);
                // $('#dialog-preferences-gtp-error-text').text(gtpResponse);
                // $('#dialog-preferences-gtp-error').removeClass('d-none');
                // $('#dialog-preferences-save').attr('disabled', false);
            },
            out: () => { }
        }
    });
}

module.exports = GtpServerValidator
