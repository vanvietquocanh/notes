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
import firebase from "firebase"

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "email": "",
            "error": "",
            "placeholderemail": "Email",
            "plEmailColor": "#a9a9a9",
            "password": "",
            "placeholderpassword": "Password",
            "plPasswordColor": "#a9a9a9",
        }
    }
    valid() {
        var errors = 0
        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))) {
            errors++;
        }
        if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(this.state.password))) {
            errors++;
        }
        return errors
    }
    loginUser(){
    	if(this.state.email!==""&&this.state.password!==""&&this.valid()===0){
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
                if(!user.additionalUserInfo.isNewUser){
	        		firebase.database().ref(`/users/${user.user.uid}`).update({
	        			lastLogin: Date.now(),
	        		})
	        	}
            }).catch((e)=>this.setState({error: "Invalid email/password or the account is not registered! Please try again!", email:"", password:""}))
    	}else{
        	this.setState({
        		error: "Invalid email/password or the account is not registered! Please try again!", 
        		email:"",
        		password:""
        	})
    	}
    }

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
            	console.log(googleUser.user.id, "googleUser",providerData[i].uid);
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.user.id) {
                    return true;
                }
            }
        }
        return false;
    }
    onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser){
            unsubscribe();
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );
                firebase
                	.auth()
                	.signInWithCredential(credential)
                    .then(async (result) => {
                    	if(result.additionalUserInfo.isNewUser){
	                    	var userInfo = {
	                    		email    : result.user.email,
	                    		avatar   : result.additionalUserInfo.profile.picture,
	                    		fullname : result.additionalUserInfo.profile.name,
	                    		userId   : result.user.uid,
	                    		create 	 : Date.now(),
	                    		lastLogin: Date.now()
	                    	}
	                    	firebase.database().ref(`/users/${result.user.uid}`).set(userInfo)
                    	}else{
                    		firebase.database().ref(`/users/${result.user.uid}`).update({
	                    		avatar   : result.additionalUserInfo.profile.picture,
                    			lastLogin: Date.now()
                    		})
                    	}
                    })
                    .catch((error) => {
                    	console.warn(error)
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        var email = error.email;
                        var credential = error.credential;
                    });
            } else {
                this.props.navigation.navigate("SideBar")
            }
        }.bind(this));
    }
    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: "738041064211-s40oo6plh9ej03qd0jppls8fle4cu8tv.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });
            if (result.type === 'success') {
                this.onSignIn(result)
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
    submit() {
        console.warn(this.state, this.valid());
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
	        	<Text style={[s.textCenter, s.textPrimary, styles.login]}>LOGIN</Text>
	        	<Text style={[s.textCenter, s.textDanger]}>{this.state.error}</Text>
	        	<TextInput onChangeText={(text)=>this.setState({"email": text})} value={this.state.email} style={[styles.input, styles.items, s.textCenter]} placeholder={"Email"} keyboardType={"email-address"} autoCompleteType={"email"} autoCapitalize={"none"} clearTextOnFocus={true}/>
	        	<TextInput onChangeText={(text)=>this.setState({"password": text})} value={this.state.password} style={[styles.input, styles.items, s.textCenter]} placeholder={"Password"} secureTextEntry clearTextOnFocus={true}/>
	        	<TouchableOpacity onPress={()=>this.loginUser()} style={[styles.btnSubmit, styles.items]}><Text style={[s.textLight, styles.submitText, s.textCenter]}>Login</Text></TouchableOpacity>
	        	<TouchableOpacity onPress={()=>this.signInWithGoogleAsync()} style={[styles.btnSubmit, styles.items, s.textCenter, s.btnDanger]}>
	        		<FontAwesomeIcon icon={faGoogle} color={"#fff"} size={32} style={styles.iconGG} />
	        		<Text style={[s.textLight, styles.submitText, s.textCenter, styles.btnGG]}>
	        			Continue in width Google
	        		</Text>
	        	</TouchableOpacity>
	        	<Text 
	        	onPress={()=>this.props.navigation.navigate("Register")}
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
    btnFacebook: {
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