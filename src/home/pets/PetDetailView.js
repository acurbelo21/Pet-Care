import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, SafeAreaView, View } from 'react-native';
import Firebase from "../../components/Firebase";
import { NavHeader } from "../../components";
import type { ScreenParams } from "../../components/Types";

export default class PetDetailView extends React.Component<ScreenParams<{ pet_uid: String }>, SettingsState> {
    constructor(props){
        super(props);
         this.state = {
           petDetails: "",
         };
       }

    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
        const pet_uid  = navigation.state.params;

        Firebase.firestore
        .collection("pets")
        .doc(pet_uid.pet_uid)
        .get()
        .then(doc => {
            this.setState({petDetails: doc.data()});
        })
    }

    render() {
        const { navigation } = this.props;
        console.log(this.state.petDetails)
        return (
            <SafeAreaView>
                <NavHeader title={this.state.petDetails.name} back {...{ navigation }} />
                <Text
                style={{
                    fontSize: "40",
                }}>{this.state.petDetails.species}</Text>
                <Text
                style={{
                    fontSize: "40",
                }}>{this.state.petDetails.breed}</Text>
            </SafeAreaView>
        );
    }
}