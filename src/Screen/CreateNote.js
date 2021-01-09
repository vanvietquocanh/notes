import * as React from 'react';
import { Block, Text } from 'expo-ui-kit';
import { FlatList, View, Button, StyleSheet, SafeAreaView, TextInput, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import TagInput from 'react-native-tags-input';

import RNPickerSelect from 'react-native-picker-select';

import DateTimePicker from '@react-native-community/datetimepicker';

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            priority: "",
            description: "",
            category: "",
            title: "",
            date: new Date(Date.now()),
            mode: 'datetime',
            show: true,
            tags: {
                tag: '',
                tagsArray: []
            }
        }
    }
    updateTagState = (state) => {
        this.setState({
            tags: state
        })
    }
    onChange=(event, selectedDate)=>{
        this.setState({
            "date": selectedDate || this.state.date,
            "show": Platform.OS === 'ios'
        })
    }
    createNote(){
    	console.log(this.state);
    	// title: "",
     //        priority: "",
     //        description: "",
     //        category: "",
    }
    handlePress = (e) => {
    	console.log(e);
	    this._touchable.touchableHandlePress();
	}
    onSwipeRight(gestureState) {
        this.props.navigation.openDrawer()
        this.setState({ myText: 'You swiped right!' });
    }
    render() {

        const config = {
            velocityThreshold: 0.27,
            directionalOffsetThreshold: 80
        };
        return (
        	<GestureRecognizer
		        onSwipeRight={(state) => this.onSwipeRight(state)}
		        config={config}
		        style={{
		          flex: 1,
		          backgroundColor: "#fff"
		        }}
		        >
	            <SafeAreaView style={styles.container}>
					<ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled' style={styles.container}>
				    	<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					      	<Text style={[s.textCenter, s.textPrimary, styles.title]}>CREATE NOTE</Text>
					    </TouchableWithoutFeedback>
			    		<View>
					    	<TextInput
					    		onChangeText={(text)=>this.setState({"title": text})}
					    		style={[styles.input, styles.items]}
							    placeholder="Please enter title"
							    containerStyle={{width: (Dimensions.get('window').width - 40)}}
						    />
					    </View>
						<View style={[styles.datePicker]}>
							<View style={[styles.pickerChildren]}>
					    		<DateTimePicker
					    			style={{color: "#fff"}} 
							        testID="dateTimePicker"
							        value={this.state.date}
							        mode={'datetime'}
							        is24Hour={true}
							        display="default"
							        onChange={this.onChange}
						        />
						    </View>
							<View style={[styles.pickerChildren, styles.pickerChildrenSelect]}>
								<RNPickerSelect
									style={{...pickerSelectStyles}}
									value={this.state.priority}
									itemStyle={{color: "#fff"}}
						            onValueChange={(value) => this.setState({"priority": value})}
						            placeholder={{label: 'Select priority', value: null}}
						            items={[
						                { label: 'High', value: 'high' },
						                { label: 'Medium', value: 'medium' },
						                { label: 'Slow', value: 'slow' },
						            ]}
						        />
						    </View>
					    </View>
						<View>
						    <TextInput
							    style={[styles.input, styles.items, styles.description]}
							    placeholder="Description"
							    numberOfLines={5}
							    multiline={true}
						    />
						</View>
						<View style={[styles.input, styles.items, styles.category]}>
					    	<TagInput
					          	updateState={this.updateTagState}
					          	tags={this.state.tags}
					          	placeholder="Please enter category"
					          	tagStyle={styles.tag}
						        tagTextStyle={styles.tagText}
					        />
					    </View>
						<View>
						    <TouchableOpacity style={[styles.items, styles.btnSubmit]} onPress={()=>this.createNote()}>
						    	<Text style={[styles.colorBTN, s.textCenter]}>
						    		Save
						    	</Text>
						    </TouchableOpacity>
						</View>
				    </ScrollView>
				</SafeAreaView>
    		</GestureRecognizer>
        );
    }
}

const styles = StyleSheet.create({
	title:{
		fontSize: 40,
	},
    container: {
        flex: 1,
        paddingTop: 22
    },
    pickerChildren: {
    	marginTop: 20,
    	width: (Dimensions.get('window').width)/2+30,
    	height: 60,
    	padding: 15,
    	paddingLeft: 2,
    	color: "#fff",
    	backgroundColor: "#717171",
    },
    datePicker: {
    	flex: -1,
    	flexDirection: "row",
    	marginBottom: 0,
        shadowColor: "#000",
    	shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 10
    },
    select: {
    	width: (Dimensions.get('window').width)/2-30,
    	paddingTop: 30,
    	color: "#fff",
    },
    pickerChildrenSelect:{
    	paddingTop: 23,
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
    colorBTN: {
        color: "#fff"
    },
    tag: {
        backgroundColor: '#007bff'
    },
    tagText: {
        color: "#fff"
    },
    btnSubmit: {
        padding: 20,
        borderColor: "#222",
        position: "relative",
        backgroundColor: "#007bff",
        borderRadius: 8
    },
    category: {
        width: Dimensions.get('window').width,
    },
    description: {
        width: Dimensions.get('window').width,
        height: 100,
        paddingTop: 20,
        paddingBottom: 20,
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
    navBar: {
        paddingLeft: 3,
        justifyContent: "center",
        height: 50
    }
})
const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
	    color: '#fff',
	},

});