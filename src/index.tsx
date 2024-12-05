import LightSensor from './NativeLightSensor';
import { DeviceEventEmitter, type EmitterSubscription } from 'react-native';

// Ensure LightSensor module is available during initialization
if (!LightSensor) {
  throw new Error('LightSensor module is not available');
}

// Define callback type for sensor value changes
type SensorCallback = (sensorValue: number) => void;

// Define the LightSensor interface
export interface LightSensorInterface {
  isSensorAvailable: () => Promise<boolean>;
  startListening: (callback: SensorCallback) => void;
  stopListening: () => void;
}

// Hold references to all active listeners
const sensorChangeListeners: EmitterSubscription[] = [];

// LightSensor module implementation
export const LightSensorModule: LightSensorInterface = {
  /**
   * Check if the light sensor is available on the device.
   */
  isSensorAvailable: async () => {
    return await LightSensor.isSensorAvailable();
  },

  /**
   * Start listening to light sensor changes.
   * Automatically removes all existing listeners before adding a new one.
   */
  startListening: (callback: SensorCallback) => {
    // Stop all existing listeners
    LightSensorModule.stopListening();

    // Start the sensor and add a new listener
    LightSensor.startListening();
    const listener = DeviceEventEmitter.addListener(
      'LightSensorChanged',
      callback
    );
    sensorChangeListeners.push(listener);
  },

  /**
   * Stop listening to light sensor changes.
   * Ensures the sensor and all listeners are properly cleaned up.
   */
  stopListening: () => {
    // Stop the sensor
    LightSensor.stopListening();

    // Remove all active listeners
    while (sensorChangeListeners.length) {
      const listener = sensorChangeListeners.pop();
      listener?.remove();
    }
  },
};

export default LightSensorModule;
