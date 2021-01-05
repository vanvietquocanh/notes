import * as React from 'react';
import { Block, Text } from 'expo-ui-kit';

import {
	DrawerContentScrollView,
  	DrawerItemList,
  	DrawerItem
} from '@react-navigation/drawer';

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default (props) =>{
	return (
	    <DrawerContentScrollView {...props}>
	      <DrawerItemList {...props} />
	      <DrawerItem
	        label="Close"
	        onPress={() => props.navigation.closeDrawer()}
	      />
	    </DrawerContentScrollView>
	)
}