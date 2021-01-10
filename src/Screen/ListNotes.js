import * as React from 'react';
import { Block, Text } from 'expo-ui-kit';
import { FlatList, View, StyleSheet, SafeAreaView } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import firebase from "firebase"
import * as SQLite from "expo-sqlite"

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const db = SQLite.openDatabase("db.db")

export default class ListNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        var query = `SELECT * FROM notes WHERE uid LIKE '%${firebase.auth().currentUser.uid}%'`
        var params = []
        db.transaction(tx => {
            tx.executeSql(query, params, (tx, result) => {
                if (result.rows.length > 0) {
                    this.setState({ "data": result.rows._array });
                }
            }, (tx, err) => {
                console.log(tx, err);
            })
        })
    }
    onSwipeRight(gestureState) {
        this.props.navigation.openDrawer()
        this.setState({ myText: 'You swiped right!' });
    }
    addZero(number) {
        if (number < 10) {
            return "0" + number
        } else {
            return number
        }
    }
    converTime(time) {
        return `${this.addZero(new Date(time).getHours())}:${this.addZero(new Date(time).getMinutes())}:${this.addZero(new Date(time).getSeconds())} - ${this.addZero(new Date(time).getDate())}/${this.addZero(new Date(time).getMonth()+1)}/${this.addZero(new Date(time).getFullYear())}`
    }
    render() {
        const config = {
            velocityThreshold: 0.27,
            directionalOffsetThreshold: 80
        };
        return (
            <SafeAreaView style={styles.container}>
			<View style={styles.container}>
		        <FlatList
			        data={this.state.data}
			        renderItem={({item}) =>(
			        	<View style={styles.rows}>
			        		<View style={styles.rowsChild}>
			        			<Text style={[styles.item, {color: "#dc3545"}]}>Title : <Text style={styles.item}>{item.title}</Text></Text>
			        			<Text style={[styles.item, {color: "#28a745"}]}>Priority : <Text style={styles.item}>{item.priority}</Text></Text>
			        			<Text style={[styles.item, {color: "#007bff"}]}>Category : <Text style={styles.item}>{item.category}</Text></Text>
			        		</View>
			        		<View>
			        			<Text style={[styles.item, {color: "#007bff"}]}>Create : <Text style={styles.item}>{this.converTime(item.createTime)}</Text></Text>
			        		</View>
			        		<View style={styles.rowsFlex}>
			        			<Text style={[styles.item, {color: "#007bff"}]}>Begin : <Text style={styles.item}>{this.converTime(item.beginDate)}</Text></Text>
			        			<Text style={[styles.item, {color: "#007bff"}]}>End : <Text style={styles.item}>{this.converTime(item.beginDate)}</Text></Text>
			        		</View>
			        		<Text style={[styles.item, {color: "#17a2b8"}]}>Description : <Text style={styles.item}>{item.description}</Text></Text>
			        	</View>
			        )}
			        keyExtractor={(item, index) => index.toString()}
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
    rowsFlex: {
        flex: 1,
        flexDirection: "row"
    },
    rowsChild: {
        paddingTop: 20,
        flex: 1,
        flexDirection: "row"
    },
    rows: {
        borderTopColor: "#007bff",
        borderTopWidth: 1,
        marginBottom: 0,
        paddingBottom: 0,
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
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 1,
        height: 44,
    },
    navBar: {
        paddingLeft: 3,
        justifyContent: "center",
        height: 50
    }
})