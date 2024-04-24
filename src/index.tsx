import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Test } from '~/ui:lib/atoms/test';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar
        key='asd'
        backgroundColor='#000'
        hidden={false}
        hideTransitionAnimation='fade'
        style='auto'
        animated
        translucent
      />
      <Test />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

registerRootComponent(App);
