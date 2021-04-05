// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import {Text, Theme, Button} from "../components";
import Firebase from "../components/Firebase";
import TextInputComponent from "./TextInputComponent";

type VisibleState = { visible: boolean };
type PetNameTextInputIsVisibleState = { petNameTextInputIsVisible: boolean };
type SpeciesSelected = { speciesSelected: string };
type Pet = { label: string, image: string };

export class SelectPetButton extends React.Component {
    // Call after species button is pressed
    addPetSpeciesToFirestore(species) {
        const { uid } = Firebase.auth.currentUser;

        Firebase.firestore
            .collection("pets")
            .doc(uid)
            .get()
            .then(documentSnapshot => {
                console.log('User exists: ', documentSnapshot.exists);
            
                if (documentSnapshot.exists) {
                    Firebase.firestore.collection("pets").doc(uid).update({
                        species
                    })
                        .then(() => {
                            console.log("TO DA MOOON 🙌💎🙌 - Pet species added: ", species, "\n");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                }
                else {
                    Firebase.firestore.collection("pets").doc(uid).set({
                        species
                    })
                        .then(() => {
                            console.log("TO DA MOOON 🙌💎🙌 - Pet species added: ", species, "\n");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                }
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

export default class Select extends React.Component<VisibleState, PetNameTextInputIsVisibleState, SpeciesSelected> {
    state = {
        visible: false,
        petNameTextInputIsVisible: false,
        speciesSelected: ""
    };

    static pets: Pet[] = [
        { label: "Dog", image: "dog" },
        { label: "Cat", image: "cat" },
        { label: "Bird", image: "dove" },
        { label: "Horse", image: "horse" },
        { label: "Fish", image: "fish" },
        { label: "Exotic", image: "spider" }
    ];

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
        this.setState({ speciesSelected: Select.pets[0].image });

        // After the user presses a species button, call this function!
        onPressSpeciesButtonCallback(species);
    }

    selectCat = (event, species, onPressSpeciesButtonCallback) => {
        this.showPetNameTextInput();
        this.setState({ speciesSelected: Select.pets[1].image });

        // After the user presses a species button, call this function!
        onPressSpeciesButtonCallback(species);
    }

    selectBird = (event, species, onPressSpeciesButtonCallback) => {
        this.showPetNameTextInput();
        this.setState({ speciesSelected: Select.pets[2].image });

        // After the user presses a species button, call this function!
        onPressSpeciesButtonCallback(species);
    }

    selectHorse = (event, species, onPressSpeciesButtonCallback) => {
        this.showPetNameTextInput();
        this.setState({ speciesSelected: Select.pets[3].image });

        // After the user presses a species button, call this function!
        onPressSpeciesButtonCallback(species);
    }

    selectFish = (event, species, onPressSpeciesButtonCallback) => {
        this.showPetNameTextInput();
        this.setState({ speciesSelected: Select.pets[4].image });

        // After the user presses a species button, call this function!
        onPressSpeciesButtonCallback(species);
    }

    selectExotic = (event, species, onPressSpeciesButtonCallback) => {
        this.showPetNameTextInput();
        this.setState({ speciesSelected: Select.pets[5].image });

        // After the user presses a species button, call this function!
        onPressSpeciesButtonCallback(species);
    }

    render(): React.Node {
        const selectPetBreedMessage = <Text style={styles.message}>Please select the breed of your first pet. </Text>;

        var selectedPet = <FontAwesome5 name={this.state.speciesSelected} size={Theme.typography.header1.fontSize} color={Theme.palette.white} />

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
                        label={Select.pets[0].label}
                        onPress={this.selectDog}
                    />
                    <SelectPetButton
                        label={Select.pets[1].label}
                        onPress={this.selectCat}
                    />
                    <SelectPetButton
                        label={Select.pets[2].label}
                        onPress={this.selectBird}
                    />
                </View>
                <View style={styles.container}>
                    <SelectPetButton
                        label={Select.pets[3].label}
                        onPress={this.selectHorse}
                    />
                    <SelectPetButton
                        label={Select.pets[4].label}
                        onPress={this.selectFish}
                    />
                    <SelectPetButton
                        label={Select.pets[5].label}
                        onPress={this.selectExotic}
                    />
                </View>
                {/* <View style={{marginTop: Theme.spacing.large}}> */}
                {/* Removed marginTop ^ because TextInput and button was being covered by white bottom slide container */}
                <View>
                    {this.state.petNameTextInputIsVisible ? <TextInputComponent /> : selectPetBreedMessage}
                </View>
            </>
        );
    }
}

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
        color: Theme.palette.black,
        fontSize: 20,
        fontFamily: Theme.typography.semibold,
        textAlign: "center",
        marginBottom: Theme.spacing.base
    }
});
