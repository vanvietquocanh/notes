import * as React from 'react';
import { Block, Text } from 'expo-ui-kit';
import { FlatList, View, Button, StyleSheet, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
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
	    	"email"			        	  : "",
			"placeholderemail"			  : "Email",
			"plEmailColor" 				  : "#a9a9a9",
			"password"		    		  : "",
			"placeholderpassword"   	  : "Password",
			"plPasswordColor" 			  : "#a9a9a9",
		}
	  }
	  valid(){
	  	let errors = 0
	  	if(!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.password))){
	  		this.setState({
	  			"placeholderemail" : "Invalid Email",
	  			"plEmailColor" : "#dc3545",
	  		})
	  		errors++;
	  	}
	  	return errors
	  }
	  submit(){
	  	console.warn(this.state, this.valid());
	  }
	  render() {
    return (
        <SafeAreaView style={styles.container}>
        	<Text style={[s.textCenter, s.textPrimary, styles.login]}>LOGIN</Text>
        	<TextInput onChangeText={(text)=>this.setState({"email": text})} style={[styles.input, styles.items, s.textCenter]} placeholder={"Email"} keyboardType={"email-address"} autoCompleteType={"email"} clearTextOnFocus={true}/>
        	<TextInput onChangeText={(text)=>this.setState({"password": text})} style={[styles.input, styles.items, s.textCenter]} placeholder={"Password"} secureTextEntry clearTextOnFocus={true}/>
        	<TouchableOpacity style={[styles.btnSubmit, styles.items]}><Text style={[s.textLight, styles.submitText, s.textCenter]}>Login</Text></TouchableOpacity>
        	<Text onPress={()=>this.props.navigation.navigate("Register")} style={[s.textCenter, styles.register]}>Have you an account? Create one here</Text>
		</SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
	register:{
		marginTop: 20,
		fontSize: 18,
		color: "#74b9ff",
  		textDecorationLine: "underline",
		justifyContent: "center"
	},
  container: {
   flex: 1,
   paddingTop: 22
  },
  input:{
  	padding: 20,
  	backgroundColor: "#fff",
  	borderColor: "#222",
  	borderRadius: 8
  },
  items:{
  	shadowColor: "#000",
  	marginTop: 20,
	shadowOffset: {
		width: 0,
		height: 4,
	},
	shadowOpacity: 0.30,
	shadowRadius: 4.65,
	elevation: 10
  },
  submitText: {
  	padding: 12,
  	borderRadius: 8
  },
  btnSubmit: {
  	backgroundColor: "#007bff",
  	borderRadius: 8,
  	padding: 6
  },
  login: {
  	marginTop: 100,
  	marginBottom: 80,
    fontSize: 52
  }
})