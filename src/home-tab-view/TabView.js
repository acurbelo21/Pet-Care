import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

function HomeScreen() {
    return (
        <View style={styles.homeBackground}>
            <Text style={styles.centerText}>Home! This will be a sort of "My Pets" screen</Text>
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
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'Home') {
                        iconName = 'home';
                      } else if (route.name === 'Chat') {
                        iconName = 'comments';
                      }
                      else if (route.name === 'Analysis') {
                          iconName = 'chart-bar';
                      }
          
                      // You can return any component that you like here!
                      return <FontAwesome5 name={iconName} size={size} color={color} />;
                    },
                  })}
                  tabBarOptions={{
                    activeTintColor: '#c48d3f',
                    inactiveTintColor: 'gray',
                  }}
            >
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
