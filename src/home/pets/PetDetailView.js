import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, SafeAreaView, View } from 'react-native';
import Firebase from "../../components/Firebase";
import type { ScreenParams } from "../../components/Types";
import {Text, NavHeader, Theme, Button} from "../../components";
import { LinearGradient } from "expo-linear-gradient";

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
            <View>
                <NavHeader title={this.state.petDetails.name} back {...{ navigation }} />
            <SafeAreaView>
                
                <View>
                    <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
                    <Text
                    style={{
                        fontSize: 20,
                    }}>{this.state.petDetails.species}</Text>
                    <Text
                    style={{
                        fontSize: 20,
                    }}>{this.state.petDetails.breed}</Text>
                </View>
            </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    gradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    message: {
      color: Theme.palette.black,
      fontSize: 20,
      fontFamily: Theme.typography.semibold,
      textAlign: "center",
      marginBottom: Theme.spacing.base
    },
    buttonContainer: {
      justifyContent: "space-evenly",
      flexDirection: "row",
      marginVertical: Theme.spacing.base
    },
    image: {
      padding: 10,
      color: Theme.palette.white
    },
    iconContainer: {
      justifyContent: "center",
      flexDirection: "column",
      marginHorizontal: Theme.spacing.base
    },
    multiSelectContainer: {
      padding: 10,
      alignSelf: "stretch",
    }
  });