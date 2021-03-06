
const MODULE_OPCODE = 0x11;

const
    ENABLE = 0x1,
    CONFIG = 0x2,
    OUTPUT = 0x3;

var AmbientLight = function(device) {
    this.device = device;
};

AmbientLight.prototype.enable = function(callback) {
    // todo config interface
    var ltr329Rate = 4;
    var ltr329Time = 1;
    var ltr329Gain = 1;

    var buffer = new Buffer(4);
    buffer[0] = MODULE_OPCODE;
    buffer[1] = CONFIG;
    buffer[2] = ltr329Gain.mask << 2;
    buffer[3] = (ltr329Time.mask << 3) | ltr329Rate;
    this.device.send(buffer);

    buffer = new Buffer(3);
    buffer[0] = MODULE_OPCODE;
    buffer[1] = ENABLE;
    buffer[2] = 0x1;
    this.device.send(buffer);

    this.emitter.on([MODULE_OPCODE, OUTPUT], function(buffer) {
        callback(buffer.readInt8(0));
    });
};

module.exports = AmbientLight;
