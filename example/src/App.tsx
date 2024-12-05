import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import LightSensorModule from 'react-native-light-sensor';

const App = () => {
  const [sensorAvailable, setSensorAvailable] = useState(false);
  const [currentValue, setCurrentValue] = useState<number | null>(null);

  useEffect(() => {
    LightSensorModule.isSensorAvailable()
      .then((available) => {
        setSensorAvailable(available);
        if (available) {
          startListening();
        }
      })
      .catch((err) =>
        console.error('Error checking sensor availability:', err)
      );

    return () => {
      stopListening();
    };
  }, []);

  const startListening = () => {
    LightSensorModule.startListening(setCurrentValue);
  };

  const stopListening = () => {
    LightSensorModule.stopListening();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Light Sensor Available: {sensorAvailable ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.text}>Current Light Value: {currentValue}</Text>
      <Button title="Start Listening" onPress={startListening} />
      <Button title="Stop Listening" onPress={stopListening} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginVertical: 12,
    color: '#000000',
  },
});
