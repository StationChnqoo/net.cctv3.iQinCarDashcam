import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import * as React from 'react';
import App from './App';
import Debug from '@src/screens/Debug';
import Files from '@src/screens/Files';
import Settings from '@src/screens/Settings';

export type RootStacksParams = {
  App: undefined;
  Debug: {id: string};
  Files: undefined;
  Settings: undefined;
};

const RootStack = createNativeStackNavigator<RootStacksParams>();

export type RootStacksProp = NativeStackNavigationProp<RootStacksParams>;

export default function Stacks() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{animation: 'slide_from_right', headerShown: false}}>
        <RootStack.Screen name="App" component={App} />
        <RootStack.Screen name="Debug" component={Debug} />
        <RootStack.Screen name="Files" component={Files} />
        <RootStack.Screen name="Settings" component={Settings} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}