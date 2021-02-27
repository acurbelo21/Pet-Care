// @flow
import React from "react";
import { Text, TextInput, View, Button } from "react-native";

import Firebase from "../components/Firebase";

export class GetStartedButton extends React.Component {
    // Call after Get Started button is pressed
    addPetNameToFirestore(name) {
        const { uid } = Firebase.auth.currentUser;

        Firebase.firestore.collection("pets").doc(uid).update({
            name
        })
            .then(() => {
                console.log("Pet name added to Firestore!: ", name);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

        /* Call another function to navigate to the custom home screen HERE */

    }

    render() {
        return (
            <Button
                title="Get Started"
                name={this.props.name}
                onPress={(event) => this.props.onPress(event, this.props.name, this.addPetNameToFirestore)}
                full
                primary
            />
        );
    }
}

export default class TextInputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ""};
    }

    inputPetName = (event, name, onPressStartCallback) => {
        // After the user inputs a name in the text field and presses Start, call this function!
        onPressStartCallback(name);
    }

    render() {
        return (
            <View style={{padding: 10}}>
                <TextInput
                    style={{height: 40, fontSize: 20}}
                    placeholder="Type your pet's name here!"
                    // onChangeText={text => setText(text)}
                    onChangeText={(text) => this.setState({text})}
                    defaultValue={this.state.text}
                />
                {/* The following component appears when there is text in the input field! */}
                <Text style={{padding: 5, fontSize: 42, alignContent: "center"}}>
                    {this.state.text &&
                        <GetStartedButton
                            name={this.state.text}
                            onPress={this.inputPetName}
                        />
                    }
                </Text>
            </View>
        );
    }
}
