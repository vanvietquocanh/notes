import React from "react";
import { Block, Text } from 'expo-ui-kit';
import { ActivityIndicator, StyleSheet, View, SafeAreaView } from "react-native";
import RegistrationScreen from "../Screen/Register"

import * as firebase from 'firebase'

export default class Loading extends React.Component {
    componentDidMount() {
        this.checkSttLogin()
    }
    checkSttLogin() {
        const openScreen = this.props.navigation.navigate
        firebase.auth().onAuthStateChanged(function(user) {
            // console.warn(user, "Loading");
            if (user)
                openScreen("Dashboard")
            else
                openScreen("Login")
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
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
})