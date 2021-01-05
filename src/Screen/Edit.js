import * as React from 'react';
import { Block, Text } from 'expo-ui-kit';

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default ({ navigation }) =>{
	return (
		<Block center middle>
			<Text style={[s.textCenter]}>
				THIS IS EDIT
			</Text>
		</Block>
	)
}