import * as React from 'react';
import { Block, Text } from 'expo-ui-kit';
import { Animated, FlatList, View, Button, StyleSheet, SafeAreaView } from 'react-native';
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
          <Animated.View style={styles.["penguin"]}>
            <View style={styles.["penguin-bottom"]}>
              <View style={styles.["right-hand"]}></View>
              <View style={styles.["left-hand"]}></View>
              <View style={styles.["right-feet"]}></View>
              <View style={styles.["left-feet"]}></View>
            </View>
            <View style={styles.["penguin-top"]}>
              <View style={styles.["right-cheek"]}></View>
              <View style={styles.["left-cheek"]}></View>
              <View style={styles.["belly"]}></View>
              <View style={styles.["right-eye"]}>
                <View style={styles.["sparkle"]}></View>
              </View>
              <View style={styles.["left-eye"]}>
                <View style={styles.["sparkle"]}></View>
              </View>
              <View style={styles.["blush-right"]}></View>
              <View style={styles.["blush-left"]}></View>
              <View style={styles.["beak-top"]}></View>
              <View style={styles.["beak-bottom"]}></View>
            </View>
          </Animated.View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  "penguin": {
    "animationName": "loop",
    "animationIterationCount": "infinite",
    "transformOrigin": "0% 0%",
    "animationTimingFunction": "linear"
  },
  "penguin_top": {
    "top": "10%",
    "left": "25%",
    "background": "black",
    "width": "50%",
    "height": "45%",
    "borderRadius": "70% 70% 60% 60%"
  },
  "penguin_bottom": {
    "top": "40%",
    "left": "23.5%",
    "background": "black",
    "width": "53%",
    "height": "45%",
    "borderRadius": "70% 70% 100% 100%"
  },
  "right_hand": {
    "top": "5%",
    "left": "25%",
    "background": "black",
    "width": "30%",
    "height": "60%",
    "borderRadius": "30% 30% 120% 30%",
    "transform": "rotate(130deg)",
    "zIndex": "-1",
    "animationDuration": "2s",
    "animationName": "wave",
    "animationIterationCount": "infinite",
    "transformOrigin": "0% 0%",
    "animationTimingFunction": "linear"
  },
  "left_hand": {
    "top": "0%",
    "left": "75%",
    "background": "black",
    "width": "30%",
    "height": "60%",
    "borderRadius": "30% 30% 30% 120%",
    "transform": "rotate(-45deg)",
    "zIndex": "-1"
  },
  "right_cheek": {
    "top": "15%",
    "left": "35%",
    "background": "var(--penguin-belly, white)",
    "width": "60%",
    "height": "70%",
    "borderRadius": "70% 70% 60% 60%"
  },
  "left_cheek": {
    "top": "15%",
    "left": "5%",
    "background": "var(--penguin-belly, white)",
    "width": "60%",
    "height": "70%",
    "borderRadius": "70% 70% 60% 60%"
  },
  "belly": {
    "top": "60%",
    "left": "2.5%",
    "background": "var(--penguin-belly, white)",
    "width": "95%",
    "height": "100%",
    "borderRadius": "120% 120% 100% 100%"
  },
  "right_feet": {
    "top": "85%",
    "left": "60%",
    "background": "orange",
    "width": "15%",
    "height": "30%",
    "borderRadius": "50% 50% 50% 50%",
    "transform": "rotate(-80deg)",
    "zIndex": "-2222"
  },
  "left_feet": {
    "top": "85%",
    "left": "25%",
    "background": "orange",
    "width": "15%",
    "height": "30%",
    "borderRadius": "50% 50% 50% 50%",
    "transform": "rotate(80deg)",
    "zIndex": "-2222"
  },
  "right_eye": {
    "top": "45%",
    "left": "60%",
    "background": "black",
    "width": "15%",
    "height": "17%",
    "borderRadius": "50%"
  },
  "left_eye": {
    "top": "45%",
    "left": "25%",
    "background": "black",
    "width": "15%",
    "height": "17%",
    "borderRadius": "50%"
  },
  "sparkle": {
    "top": "25%",
    "left": "15%",
    "background": "white",
    "width": "35%",
    "height": "35%",
    "borderRadius": "50%"
  },
  "blush_right": {
    "top": "65%",
    "left": "15%",
    "background": "pink",
    "width": "15%",
    "height": "10%",
    "borderRadius": "50%"
  },
  "blush_left": {
    "top": "65%",
    "left": "70%",
    "background": "pink",
    "width": "15%",
    "height": "10%",
    "borderRadius": "50%"
  },
  "beak_top": {
    "top": "60%",
    "left": "40%",
    "background": "orange",
    "width": "20%",
    "height": "10%",
    "borderRadius": "50%"
  },
  "beak_bottom": {
    "top": "65%",
    "left": "42%",
    "background": "orange",
    "width": "16%",
    "height": "10%",
    "borderRadius": "50%"
  }
})