const LightSensor = require('./NativeLightSensor').default;

export function multiply(a: number, b: number): number {
  return LightSensor.multiply(a, b);
}
