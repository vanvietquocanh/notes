import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from "expo-sqlite"

import Loading from './src/Screen/Loading';
import LoginScreen from "./src/Screen/Login"
import Register from "./src/Screen/Register"
const db = SQLite.openDatabase("db.db")

import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyC1gihIJbXmHlZsH7gmgeyWASXjwxaHK8U",
    authDomain: "reflecting-poet-268910.firebaseapp.com",
    databaseURL: "https://reflecting-poet-268910-default-rtdb.firebaseio.com",
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

const AuthStack = createStackNavigator();


export default class App extends React.Component {
  UNSAFE_componentWillMount(){
    var createTable = `CREATE TABLE if not exists notes(
                          uid         STRING  NOT NULL,
                          title       STRING  NOT NULL PRIMARY KEY,
                          createTime  INTEGER NOT NULL,
                          description STRING,
                          priority    STRING  NOT NULL,
                          beginDate   INTEGER NOT NULL,
                          endDate     INTEGER NOT NULL,
                          category    STRING
                      );`
    var drop = `DROP TABLE notes`
    db.transaction(tx=>{
      tx.executeSql(createTable, (tx, result)=>{
        console.log(tx, result);
      })
    })
  }
  render(){
    return (
      <NavigationContainer>
        <StatusBar translucent barStyle="dark-content" />
        <AuthStack.Navigator initialRouteName="Loading" screenOptions={{headerShown: false}}>
          <AuthStack.Screen name={"Login"} component={LoginScreen}/>
          <AuthStack.Screen name={"Loading"} component={Loading}/>
          <AuthStack.Screen 
            name={"SideBar"} 
            component={SideBar}
          />
          <AuthStack.Screen name={"Register"} component={Register}/>
        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}