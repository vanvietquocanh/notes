import React from "react"
import RegistrationScreen from "../Screen/Register"
import LoginScreen from "../Screen/Login"
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

export default ()=>{
	return (
			<AuthStack.Navigator screenOptions={{headerShown: false}}>
				<AuthStack.Screen name={"Login"} component={LoginScreen}/>
				<AuthStack.Screen name={"Register"} component={RegistrationScreen}/>
			</AuthStack.Navigator>
		)
}