import * as React from 'react';
import { Block, Text } from 'expo-ui-kit';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import { PieChart } from "react-native-chart-kit";

import BootstrapStyleSheet from 'react-native-bootstrap-styles';
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myText: 'Bonbon'
        };
    }
    componentDidMount() {
        this.props.navigation.closeDrawer()
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
        const data = [{
                name: "Pendding",
                population: 527612,
                color: "#ffc107",
                legendFontColor: "#222",
                legendFontSize: 15
            },
            {
                name: "Processing",
                population: 8538000,
                color: "#dc3545",
                legendFontColor: "#222",
                legendFontSize: 15
            },
            {
                name: "Done",
                population: 11920000,
                color: "#28a745",
                legendFontColor: "#222",
                legendFontSize: 15
            }
        ];
        return (
            <GestureRecognizer
		        onSwipeRight={(state) => this.onSwipeRight(state)}
		        config={config}
		        style={{
		          flex: 1,
		          backgroundColor: "#fff"
		        }}
		        >
		        <SafeAreaView>
					<Text style={[s.textCenter]}>
						THIS IS DASHBOARD
					</Text>
					<PieChart
					  data={data}
					  width={Dimensions.get('window').width}
					  height={230}
					  chartConfig={{
					      flex: 1,
					      decimalPlaces: 2,
					      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					      style: {
					        borderRadius: 16
					      },
					      propsForDots: {
					        r: "6",
					        strokeWidth: "2",
					        stroke: "#ffa726"
					      }
					    }}
					  accessor={"population"}
					  center={[10, -10]}
					   style={styles.PieChart}
					/>
				</SafeAreaView>
    		</GestureRecognizer>
        );
    }
}

const styles = StyleSheet.create({
    PieChart: {
        flex: 1,
    },
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
    navBar: {
        paddingLeft: 3,
        justifyContent: "center",
        height: 50
    }
})