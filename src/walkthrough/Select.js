// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import {Text, Theme, Button} from "../components";
import Firebase from "../components/Firebase";
import TextInputComponent from "./TextInputComponent";

type VisibleState = {
    visible: boolean
};

type PetNameTextInputIsVisibleState = {
    petNameTextInputIsVisible: boolean
};

type SpeciesSelected = {
    speciesSelected: string
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
export default class Select extends React.Component<VisibleState, PetNameTextInputIsVisibleState, SpeciesSelected> {
    state = {
        visible: false,
        petNameTextInputIsVisible: false,
        speciesSelected: ""
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

    selectDog = (event, species, onPressSpeciesButtonCallback) => {
        this.showPetNameTextInput();
        this.setState({ speciesSelected: pets[0].image });

        // After the user presses a species button, call this function!
        onPressSpeciesButtonCallback(species);
    }

    selectCat = (event, species, onPressSpeciesButtonCallback) => {
        this.showPetNameTextInput();
        this.setState({ speciesSelected: pets[1].image });

        // After the user presses a species button, call this function!
        onPressSpeciesButtonCallback(species);
    }

    selectBird = (event, species, onPressSpeciesButtonCallback) => {
        this.showPetNameTextInput();
        this.setState({ speciesSelected: pets[2].image });

        // After the user presses a species button, call this function!
        onPressSpeciesButtonCallback(species);
    }

    render(): React.Node {
        const selectPetBreedMessage = <Text style={styles.message}>Please select the breed of your first pet. </Text>;
        // var selectedPet = pets.map((pet) => {
        //     return (
        //         <View key={pet.label}>
        //             <FontAwesome5 name={pet.image} size={Theme.typography.header2.fontSize} color={Theme.palette.white} />
        //         </View>
        //     )
        // })
        var selectedPet = <FontAwesome5 name={this.state.speciesSelected} size={Theme.typography.header2.fontSize} color={Theme.palette.white} />

        if (!this.state.visible) {
            return <View />;
        }

        return (
            <>
                <View style={styles.image}>
                    {this.state.petNameTextInputIsVisible ? selectedPet : <Text /> }
                </View>
                <View style={styles.container}>
                    <SelectPetButton
                        label={pets[0].label}
                        onPress={this.selectDog}
                        style={styles.button}
                    />
                    <SelectPetButton
                        label={pets[1].label}
                        onPress={this.selectCat}
                        style={styles.button}
                    />
                    <SelectPetButton
                        label={pets[2].label}
                        onPress={this.selectBird}
                        style={styles.button}
                    />
                </View>
                <View>
                    {this.state.petNameTextInputIsVisible ? <TextInputComponent /> : selectPetBreedMessage}
                </View>
            </>
        );
    }
}

const pets = [
    {
        label: "Dog",
        image: "dog"
    },
    {
        label: "Cat",
        image: "cat"
    },
    {
        label: "Bird",
        image: "dove"
    }
];

const styles = StyleSheet.create({
    container: {
        width: 283,
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginVertical: Theme.spacing.base
    },
    image: {
        padding: 10
    },
    message: {
        color: Theme.palette.white,
        fontSize: 18,
        fontFamily: Theme.typography.semibold,
        textAlign: "center",
        marginBottom: Theme.spacing.base
    }
});
