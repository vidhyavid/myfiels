const DeviceDetector = require("device-detector-js");

const getDeviceString = (req) => {
  const user_agent = req.headers["user-agent"];
  // console.log('user agent --> ', user_agent);
  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(user_agent);
  // console.log(device);
  let device_string = "";
  if (device.device) {
    if (device.device.type) {
      device_string += `__${device.device.type}`;
    }
    if (device.device.brand) {
      device_string += `__${device.device.brand}`;
    }
  }
  if (device.os) {
    if (device.os.name) {
      device_string += `__${device.os.name}`;
    }
  }

  return device_string;
};

module.exports = {
  getDeviceString,
};
