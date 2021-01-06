import * as React from 'react';
import { Block, Text } from 'expo-ui-kit';
import { FlatList, View, Button, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "email": "",
            "placeholderemail": "Email",
            "plEmailColor": "#a9a9a9",
            "password": "",
            "placeholderpassword": "Password",
            "plPasswordColor": "#a9a9a9",
        }
    }
	signInWithGoogleAsync = async() =>{
	  try {
	    const result = await Google.logInAsync({
	      // androidClientId: YOUR_CLIENT_ID_HERE,
	      iosClientId: "738041064211-s40oo6plh9ej03qd0jppls8fle4cu8tv.apps.googleusercontent.com",
	      scopes: ['profile', 'email'],
	    });

	    if (result.type === 'success') {
	      return result.accessToken;
	    } else {
	      return { cancelled: true };
	    }
	  } catch (e) {
	    return { error: true };
	  }
	}
	signInWithFacebookAsync = async() =>{
	  try {
	    await Facebook.initializeAsync({
	      appId: '482990602686098',
	    });
	    const {
	      type,
	      token,
	      expirationDate,
	      permissions,
	      declinedPermissions,
	    } = await Facebook.logInWithReadPermissionsAsync({
	      permissions: ['public_profile', 'user_photos'],
	    });
	    if (type === 'success') {
	      // Get the user's name using Facebook's Graph API
	      console.warn(token)
	      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
	      var user = await response.json()
	      console.warn(user, "user");
	      console.warn('Logged in!', `Hi ${(user).name}!`);
	      const userInfo = await (await fetch(`https://graph.facebook.com/${user.id}?fields=id,name&access_token=${token}`)).json()
	      console.warn(userInfo, "userInfo");
	    } else {
	      // type === 'cancel'
	    }
	  } catch ({ message }) {
	    console.warn(`Facebook Login Error: ${message}`);
	  }
	}
    valid() {
        let errors = 0
        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.password))) {
            this.setState({
                "placeholderemail": "Invalid Email",
                "plEmailColor": "#dc3545",
            })
            errors++;
        }	
        return errors
    }
    submit() {
        console.warn(this.state, this.valid());
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>


	        	<Text style={[s.textCenter, s.textPrimary, styles.login]}>LOGIN</Text>
	        	<TextInput onChangeText={(text)=>this.setState({"email": text})} style={[styles.input, styles.items, s.textCenter]} placeholder={"Email"} keyboardType={"email-address"} autoCompleteType={"email"} clearTextOnFocus={true}/>
	        	<TextInput onChangeText={(text)=>this.setState({"password": text})} style={[styles.input, styles.items, s.textCenter]} placeholder={"Password"} secureTextEntry clearTextOnFocus={true}/>
	        	<TouchableOpacity style={[styles.btnSubmit, styles.items]}><Text style={[s.textLight, styles.submitText, s.textCenter]}>Login</Text></TouchableOpacity>
	        	<TouchableOpacity onPress={()=>this.signInWithGoogleAsync()} style={[styles.btnSubmit, styles.items, s.textCenter, s.btnDanger]}>
	        		<FontAwesomeIcon icon={faGoogle} color={"#fff"} size={32} style={styles.iconGG} />
	        		<Text style={[s.textLight, styles.submitText, s.textCenter, styles.btnGG]}>
	        			Sign in width Google
	        		</Text>
	        	</TouchableOpacity>
	        	<TouchableOpacity onPress={()=>this.signInWithFacebookAsync()} style={[styles.btnSubmit, styles.items, s.textCenter, s.btnFacebook]}>
	        		<FontAwesomeIcon icon={faFacebookF} color={"#fff"} size={32} style={styles.iconGG} />
	        		<Text style={[s.textLight, styles.submitText, s.textCenter]}>
	        			Sign in width Facebook
	        		</Text>
	        	</TouchableOpacity>
	        	<Text 
	        	// onPress={()=>this.props.navigation.navigate("Register")}
	        	style={[s.textCenter, styles.register]}>Have you an account? Create one here</Text>
			</SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    register: {
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
    input: {
        padding: 20,
        backgroundColor: "#fff",
        borderColor: "#222",
        borderRadius: 8
    },
    items: {
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
        justifyContent: "center",
        borderRadius: 8,
    },
    btnFacebook:{
    	backgroundColor: "#4267B2"
    },
    iconGG: {
    	position: "absolute",
    	top: 12,
    	left: 45,
    },
    btnSubmit: {
    	position: "relative",
        backgroundColor: "#007bff",
        borderRadius: 8,
        padding: 6
    },
    login: {
        marginTop: 80,
        marginBottom: 60,
        fontSize: 52
    }
})