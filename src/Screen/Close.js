import * as React from 'react';
import { Dimensions } from 'react-native';
import { Image, SafeAreaView, Text, StyleSheet } from 'react-native';
import firebase from "firebase"
import {
	DrawerContentScrollView,
  	DrawerItemList,
  	DrawerItem
} from '@react-navigation/drawer';

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    borderRadius: 100 / 2,
    borderColor: "#007bff",
    alignSelf: 'center',
  },
  userName: {
  	marginTop: 10
  }
});

export default (props) =>{
	// console.log(firebase.auth());
	// console.log(firebase.auth().currentUser.displayName);
	return (
		<SafeAreaView style={{flex: 1}}>
		    <Image
		        source={(firebase.auth().currentUser.photoURL===null)?require('../images/NoAvt.png'):{uri: firebase.auth().currentUser.photoURL}}
		        style={styles.sideMenuProfileIcon}
		    />
		    <Text style={[s.textCenter, styles.userName]}>Wellcome back {(firebase.auth().currentUser.displayName===null)?"USER GUEST":firebase.auth().currentUser.displayName}</Text>
		    <DrawerContentScrollView {...props}>
		      <DrawerItemList {...props} />
		      <DrawerItem
		        label="Close"
		        onPress={() => props.navigation.closeDrawer()}
		      />
		      <DrawerItem
		      	style={{top: Dimensions.get('window').height-550}}
		        label="Logout"
		        onPress={() => firebase.auth().signOut()}
		      />
		    </DrawerContentScrollView>
		</SafeAreaView>
	)
}

