import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header } from 'react-native/Libraries/NewAppScreen';

function HomeScreen(props) {
    return (
        <View style={styles.homeBackground}>
            {/*<Header
                leftComponent={{ icon: 'favicon.png', color: '#fff' }}
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                rightComponent={{ icon: 'favicon.png', color: '#fff' }}
            />*/}
            <Text style={styles.centerText}>Home!</Text>
        </View>


    );
}

function ChatScreen() {
    return (
        <View style={styles.chatBackground}>
            <Text style={styles.centerText}>Chat functionality with vets and bots will go here</Text>  
        </View>
    )
}

function AnalysisScreen() {
    return (
        <View style={styles.analysisBackground}>
            <Text style={styles.centerText}>Lab reports and disease analysis will go here</Text>
        </View>
    )
}

const Tab = createBottomTabNavigator();

function TabView() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Chat" component={ChatScreen} />
                <Tab.Screen name="Analysis" component={AnalysisScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    homeBackground: {
        flex: 1,
        backgroundColor: "#9dffb0",
        justifyContent: 'center',
    },

    chatBackground: {
        flex: 1,
        backgroundColor: "#81f1f7",
        justifyContent: 'center',
    },

    analysisBackground: {
        flex: 1,
        backgroundColor: "#fff563",
        justifyContent: 'center',
    },

    centerText: {
        textAlign: 'center',
    },
})

export default TabView;  