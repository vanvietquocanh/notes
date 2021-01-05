import * as React from 'react';
import { Block, Text } from 'expo-ui-kit';
import { FlatList, View, Button, StyleSheet, SafeAreaView } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import DateTimePicker from '@react-native-community/datetimepicker';

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;


export default class Category extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
		      myText: 'Bonbon',
		      date: new Date(Date.now()),
		      mode: 'date',
		      show: false
		}
		this.onChange = this.onChange.bind(this)
	  }
	  onChange (event, selectedDate) {
	  	this.setState({
	    	"date" : selectedDate || this.state.date,
	    	"show": Platform.OS === 'ios'
	    })
	  }

	  showMode (currentMode) {
	    this.setState({"mode" : currentMode, "show": true})
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
		    	<View>
			      <View>
			        <Button onPress={()=>this.showMode('date')} title="Show date picker!" />
			      </View>
			      <View>
			        <Button onPress={()=>this.showMode('time')} title="Show time picker!" />
			      </View>
			      {this.state.show && (
			        <DateTimePicker
			          testID="dateTimePicker"
			          value={this.state.date}
			          mode={this.state.mode}
			          is24Hour={true}
			          display="default"
			          onChange={this.onChange}
			        />
			      )}
			    </View>
		    </View>
		    <View style={[s.bgPrimary, styles.navBar]}>
        		<FontAwesomeIcon icon={faBars} size={40} color={"#fff"}/>
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