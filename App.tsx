import React from 'react';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventsList from './screens/eventsList';
import CreateEvent from './screens/createEvent';
import store from "./store";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message"

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EventsList" component={EventsList} options={{ title: "My Events" }} />
          <Stack.Screen name="CreateEvent" component={CreateEvent} options={{ title: "Create New Event" }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast/>
    </Provider>
  );
};


export default App;
