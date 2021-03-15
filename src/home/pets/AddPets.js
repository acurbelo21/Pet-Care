import React from 'react';
import { StyleSheet, FlatList, KeyboardAvoidingView, TextInput, View, SafeAreaView, Platform, TouchableOpacity } from "react-native";
import { Text, NavHeader, Theme, Firebase } from "../../components";
import type { ScreenParams } from "../../components/Types";

export default class AddPets extends React.Component<SettingsState> {
   
    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
    }

    render() {
        const { navigation } = this.props;
        return (
            <View>
                <NavHeader title="Add Pet" back {...{ navigation }} />
                <SafeAreaView>
                    <Text style={{
                        justifyContent: "center",
                        fontSize: 30,
                    }}>yo</Text>
                </SafeAreaView>
            </View>
        );
    }
}