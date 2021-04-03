import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Firebase from "../../components/Firebase";
import {Text, NavHeader, Theme, Button} from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import DocumentPicker from 'react-native-document-picker';

export default class AddDocuments extends Component {
    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
    }

    render()
    {
        const { navigation } = this.props;
        return(
            <View>
                <NavHeader title="Add Document" back {...{navigation}}/>
                <SafeAreaView>
                    <Text>Add documents</Text>
                </SafeAreaView>
            </View>
        )
    }
}