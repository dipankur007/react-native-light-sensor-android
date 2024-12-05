import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isSensorAvailable(): Promise<boolean>;
  startListening(): void;
  stopListening(): void;
}

const LightSensor = TurboModuleRegistry.getEnforcing<Spec>('LightSensor');

export default LightSensor;
