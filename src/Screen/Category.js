import * as React from 'react';
import { Block, Text } from 'expo-ui-kit';
import { FlatList, View, StyleSheet, SafeAreaView } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default class Category extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
		      myText: 'Bonbon'
		};
	  }
	  onSwipeRight(gestureState) {
	  	this.props.navigation.openDrawer()
	    this.setState({myText: 'You swiped right!'});
	  }
	  render() {
 
    const config = {
      velocityThreshold: 0.27,
      directionalOffsetThreshold: 80
    };
    return (
      
        <SafeAreaView style={styles.container}>
        	<View style={[s.bgPrimary, styles.navBar]}>
        		<FontAwesomeIcon icon={faBars} size={40} color={"#fff"}/>
        	</View>
			<View style={styles.container}>
		        <FlatList
			        data={[
			          {key: 'Devin'},
			          {key: 'Dan'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Dominic'},
			          {key: 'Jackson'},
			          {key: 'James'},
			          {key: 'Joel'},
			          {key: 'John'},
			          {key: 'Jillian'},
			          {key: 'Jimmy'},
			          {key: 'Julie'},
			        ]}
			        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
			      />
		    </View>
		</SafeAreaView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  navBar:{
  	paddingLeft: 3,
    justifyContent: "center",
  	height: 50
  }
})