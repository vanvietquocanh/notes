import React from "react";
import { Block, Text } from 'expo-ui-kit';
import { ActivityIndicator, StyleSheet, View, SafeAreaView } from "react-native";
import RegistrationScreen from "../Screen/Register"
import Dashboard from "../Screen/Dashboard"

import * as firebase from 'firebase'

export default class Loading extends React.Component {
    // componentDidMount(){
    //   this.checkSttLogin()
    // }
    // checkSttLogin (){
    //   firebase.auth().onAuthStateChanged(function(user){
    //     console.warn(user);
    //     if(user)
    //       this.prpos.navigation.navigation("Dashboard")
    //     else
    //       this.prpos.navigation.navigation("Login")
    //   }.bind(this))
    // }
    render() {
        return (
            <SafeAreaView style={styles.container}>
            	<Block center middle>
            		<Text>HELLo
            		</Text>
            	</Block>
		  	</SafeAreaView>
        )
    }
}
// <AuthStack.Screen name={"Register"} component={RegistrationScreen}/>

