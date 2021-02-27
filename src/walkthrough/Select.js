// @flow
import * as React from "react";
import {StyleSheet, View, Text} from "react-native";

import {Button} from "../components";
import Firebase from "../components/Firebase";
import TextInputComponent from "./TextInputComponent";

type VisibleState = {
    visible: boolean
};

type PetNameTextInputIsVisibleState = {
    petNameTextInputIsVisible: boolean
};

export class SelectPetButton extends React.Component {
    // Call after species button is pressed
    addPetSpeciesToFirestore(species) {
        const { uid } = Firebase.auth.currentUser;

        Firebase.firestore.collection("pets").doc(uid).update({
            species
        })
            .then(() => {
                console.log("TO DA MOOON 🙌💎🙌 - Pet species added: ", species);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    render() {
        return (
            <Button
                label={this.props.label}
                onPress={(event) => this.props.onPress(event, this.props.label, this.addPetSpeciesToFirestore)}
                full
                primary
            />
        );
    }
}

// eslint-disable-next-line react/no-multi-comp
export default class Select extends React.Component<VisibleState, PetNameTextInputIsVisibleState> {
    state = {
        visible: false,
        petNameTextInputIsVisible: false
    };

    hide() {
        this.setState({ visible: false });
    }

    show() {
        this.setState({ visible: true });
    }

    // Use this for a cancel putting in pet name/go back to selecting pet species button also you look great today :)
    hidePetNameTextInput() {
        this.setState({ petNameTextInputIsVisible: false });
    }

    showPetNameTextInput() {
        this.setState({ petNameTextInputIsVisible: true });
    }

    selectPet = (event, species, onPressSpeciesButtonCallback) => {
        this.showPetNameTextInput();

        // After the user presses a species button, call this function!
        onPressSpeciesButtonCallback(species);
    }

    render(): React.Node {
        const selectPetBreedMessage = <Text> Please select the breed of your pet. </Text>;

        if (!this.state.visible) {
            return <View />;
        }

        return (
            <>
                <View style={styles.container}>
                    <SelectPetButton
                        label="Dog"
                        onPress={this.selectPet}
                    />
                    <SelectPetButton
                        label="Cat"
                        onPress={this.selectPet}
                    />
                    <SelectPetButton
                        label="Bird"
                        onPress={this.selectPet}
                    />
                </View>
                <View>
                    {this.state.petNameTextInputIsVisible ? <TextInputComponent /> : selectPetBreedMessage}
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 283
    }
});
