import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListView from "./ListView";
import CalendarView from "./calendarView";
import Ionicons from "react-native-vector-icons/Ionicons" ;


const EventsList = ({ navigation }: { navigation: any }) => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === 'ListView') {
                iconName = focused
                  ? 'list'
                  : 'list-outline';
              }
              else {
                iconName = focused
                  ? 'calendar-sharp'
                  : 'calendar-sharp';
              }
    
              return <Ionicons name={iconName} size={30} color={color} />;
            },
            tabBarActiveTintColor: "#735F8C",
            tabBarInactiveTintColor: "gray"
          })}
        >
            <Tab.Screen options={{tabBarLabel: "List View"}} name="ListView" component={ListView} />
            <Tab.Screen options={{tabBarLabel: "Calendar View"}} name="CalendarView" component={CalendarView} />
        </Tab.Navigator>
    )
}
export default EventsList;