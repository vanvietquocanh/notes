import React from "react";
import { Block, Text } from 'expo-ui-kit';
import { ActivityIndicator, StyleSheet, View, SafeAreaView } from "react-native";
import RegistrationScreen from "../Screen/Register"

import * as firebase from 'firebase'

export default class Loading extends React.Component {
    componentDidMount(){
      this.checkSttLogin()
    }
    checkSttLogin (){
      firebase.auth().onAuthStateChanged(function(user){
        console.warn(user);
        if(user)
          this.prpos.navigation.navigate("Dashboard")
        else
          this.props.navigation.navigate("Login")
      }.bind(this))
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
            	<Block center middle>
            		<ActivityIndicator size="large" color="#007bff"/>
            	</Block>
		  	</SafeAreaView>
        )
    }
}
// <AuthStack.Screen name={"Register"} component={RegistrationScreen}/>

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})