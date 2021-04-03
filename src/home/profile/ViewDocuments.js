import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Firebase from "../../components/Firebase";
import { Text, NavHeader, Theme, Button } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import { NavHeaderWithButton } from '../../components';
import * as DocumentPicker from 'expo-document-picker';

export default class ViewDocuments extends Component {
    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
    }

    buttonFn = async () => {
        //this.props.navigation.navigate("AddPets", { onSelect: this.onSelect, getData: () => this.retrieveFireStorePets() });
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            //Setting the state to show single file attributes
            setSingleFile(res);
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }

    render() {
        const { navigation } = this.props;

        return (
            <View>
                <NavHeaderWithButton title="Documents" back {...{ navigation }} buttonFn={this.buttonFn} buttonIcon="plus" />
                <SafeAreaView>
                    <Text>View documents</Text>
                </SafeAreaView>
            </View>
        )
    }
}