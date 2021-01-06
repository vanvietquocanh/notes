import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Loading from './src/Screen/Loading';
import LoginScreen from "./src/Screen/Login"
import Dashboard from "./src/Screen/Dashboard"

import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyC1gihIJbXmHlZsH7gmgeyWASXjwxaHK8U",
    authDomain: "reflecting-poet-268910.firebaseapp.com",
    projectId: "reflecting-poet-268910",
    storageBucket: "reflecting-poet-268910.appspot.com",
    messagingSenderId: "738041064211",
    appId: "1:738041064211:web:06227d027289972c8d88e6",
    measurementId: "G-96K1PBMXCC"
}

if (!firebase.apps.length) {
   firebase.initializeApp(config)
}else {
   firebase.app();
}

import SideBar from "./src/SideBar/sideBar"

import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const RootStack = createStackNavigator()
const AuthStack = createStackNavigator();

export default class App extends React.Component {

  render(){
    return (
      <NavigationContainer>
        <StatusBar translucent barStyle="dark-content" />
        <AuthStack.Navigator initialRouteName="Loading" screenOptions={{headerShown: false}}>
          <AuthStack.Screen name={"Login"} component={LoginScreen}/>
          <AuthStack.Screen name={"Loading"} component={Loading}/>
          <AuthStack.Screen name={"Dashboard"} component={Dashboard}/>
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})