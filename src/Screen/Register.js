import * as React from 'react';
import { Block, Text } from 'expo-ui-kit';
import { FlatList, View, Button, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
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
            "fullname": "",
            "placeholderfullname": "Full Name",
            "plFullnameColor": "#a9a9a9",
            "email": "",
            "placeholderemail": "Email",
            "plEmailColor": "#a9a9a9",
            "password": "",
            "placeholderpassword": "Password",
            "plPasswordColor": "#a9a9a9",
            "confirmPassword": "",
            "placeholderconfirmPassword": "Confirm password",
            "plCPasswordColor": "#a9a9a9"
        }
    }
    valid() {
        let errors = 0
        if (!(/^[\ a-z0-9A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐếĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/.test(this.state.fullname))) {
            this.setState({
                "placeholderfullname": "Invalid Full Name",
                "plFullnameColor": "#dc3545",
            })
            errors++;
        }
        if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.password))) {
            this.setState({
                "placeholderemail": "Invalid Email",
                "plEmailColor": "#dc3545",
            })
            errors++;
        }
        if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(this.state.password))) {
            this.setState({
                "placeholderpassword": "Invalid Password",
                "plPasswordColor": "#dc3545",
            })
            errors++;
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                "placeholderconfirmPassword": "Confirm password not match",
                "plCPasswordColor": "#dc3545",
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
        	<Text style={[s.textCenter, s.textPrimary, styles.login]}>REGISTER</Text>
        	<TextInput onChangeText={(text)=>this.setState({"fullname": text})} placeholderTextColor={this.state.plFullnameColor} style={[styles.input, styles.items, s.textCenter]} placeholder={this.state.placeholderfullname} autoCapitalize={"words"} autoCompleteType={"name"} clearTextOnFocus={true}/>
        	<TextInput onChangeText={(text)=>this.setState({"email": text})} placeholderTextColor={this.state.plEmailColor} style={[styles.input, styles.items, s.textCenter]} placeholder={this.state.placeholderemail} keyboardType={"email-address"} autoCapitalize={"none"} autoCompleteType={"email"} clearTextOnFocus={true}/>
        	<TextInput onChangeText={(text)=>this.setState({"password": text})} placeholderTextColor={this.state.plPasswordColor} style={[styles.input, styles.items, s.textCenter]} placeholder={this.state.placeholderpassword} secureTextEntry clearTextOnFocus={true}/>
        	<TextInput onChangeText={(text)=>this.setState({"confirmPassword": text})} placeholderTextColor={this.state.plCPasswordColor} style={[styles.input, styles.items, s.textCenter]} placeholder={this.state.placeholderconfirmPassword} secureTextEntry clearTextOnFocus={true}/>
        	<TouchableOpacity onPress={()=>this.submit()} style={[styles.btnSubmit, styles.items]}><Text style={[s.textLight, styles.submitText, s.textCenter]}>Register</Text></TouchableOpacity>
        	<Text onPress={()=>this.props.navigation.navigate("Login")} style={[s.textCenter, styles.register]}>Have you an account? Login here</Text>
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
        borderRadius: 8
    },
    btnSubmit: {
        backgroundColor: "#007bff",
        borderRadius: 8,
        padding: 6
    },
    login: {
        marginTop: 50,
        marginBottom: 40,
        fontSize: 52
    }
})