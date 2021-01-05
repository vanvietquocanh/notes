import React from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Block, Text } from 'expo-ui-kit';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import AuthStackNavigator from '../Navigators/Authentication';
// import Penguin from '../Items/Penguin';

import DashboardScreen from "../Screen/Dashboard"
import CategoryScreen from "../Screen/Category"
import EditNoteScreen from "../Screen/Edit"
import CreateNoteScreen from "../Screen/CreateNote"
import Close from "../Screen/Close"
// import from "./Screen/"

const Drawer = createDrawerNavigator()
const RootStack = createStackNavigator()


export default ({navigation}) =>{
	return (
			<RootStack.Navigator screenOptions={{headerShown: false}}>
		        <RootStack.Screen name="RootStack" component={AuthStackNavigator} />
		    </RootStack.Navigator>
		)
}
// export default ({navigation}) =>{
// 	return (
// 			<Drawer.Navigator initialRouteName="Create" drawerContent={props => <Close {...props} />} >
// 		        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
// 		        <Drawer.Screen name="Category" component={CategoryScreen} />
// 		        <Drawer.Screen name="Create" component={CreateNoteScreen} />
// 		        <Drawer.Screen name="EditNote" component={EditNoteScreen} />
// 		    </Drawer.Navigator>
// 		)
// }