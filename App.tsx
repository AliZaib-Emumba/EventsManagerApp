import React from 'react';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventsList from './screens/eventsList';
import CreateEvent from './screens/createEvent';
const App = () => {
  const Stack = createNativeStackNavigator() ; 
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="EventsList" component={EventsList} options={{title: "My Events"}} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} options={{title: "Create New Event"}} />
      </Stack.Navigator>
    </NavigationContainer>
    );
};


export default App;
