
const MODULE_OPCODE = 0x12;

const
    PRESSURE = 0x1,
    ALTITUDE = 0x2,
    CONFIG   = 0x3,
    CYCLIC   = 0x4;

const SCALE = 256;

var Barometer = function(device) {
    this.device = device;
};

Barometer.prototype.enable = function(callback) {
    var buffer = new Buffer(3);
    buffer[0]  = MODULE_OPCODE;
    buffer[1]  = PRESSURE;
    buffer[2]  = 0x1;

    this.emitter.on([MODULE_OPCODE, PRESSURE], function(buffer) {
        var pressure = buffer.readInt16LE(0) / SCALE;
        callback(pressure);
    });

    this.device.send(buffer);
};

Barometer.prototype.disable = function() {
    var buffer = new Buffer(3);
    buffer[0]  = MODULE_OPCODE;
    buffer[1]  = PRESSURE;
    buffer[2]  = 0x0;
    this.device.send(buffer);
};

module.exports = Barometer;
