# react-native-light-sensor

React Native Light Sensor is a library that provides access to the device's light sensor, allowing you to:

Detect the presence of a light sensor on the device.
Listen to real-time changes in the light sensor values.

This package is compatible with React Native versions up to 0.76. 
Currently supports Android only.

## Installation

```sh
npm install react-native-light-sensor
```

## Usage


```js
import LightSensorModule from 'react-native-light-sensor';

// ...

LightSensorModule.isSensorAvailable()
    .then((available) => {})
    .catch((err) => {});

const startListening = () => {
    LightSensorModule.startListening((sensorValue) => {});
};

const stopListening = () => {
    LightSensorModule.stopListening();
};
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
