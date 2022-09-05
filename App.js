import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import Card from './src/components/Card';
import MainHeader from './src/components/MainHeader';
import {baseColor} from './src/utils/Theme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Favorite from './src/screens/Favorite';
import Search from './src/screens/Search';

import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Favorite"
            component={Favorite}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
