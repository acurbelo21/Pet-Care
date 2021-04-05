import React from 'react';
import { StyleSheet, View, TextInput, ScrollView, Animated, Dimensions, Keyboard, UIManager } from "react-native";
import { Text, NavHeader, Theme, Button, TextField, NavHeaderWithButton } from "../components";
import { FontAwesome5 } from '@expo/vector-icons';
import Firebase from "../components/Firebase";
import TextInputComponent from "./TextInputComponent";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from "expo-linear-gradient";
import { Container } from 'native-base';

const { State: TextInputState } = TextInput;

export default class AddPets extends React.Component<SettingsState> {
   
    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
    }

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }
    
    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
        this.props.navigation.state.params.getData();
    }

    constructor(props) {
        super(props);
        this.state = {
            species: null,
            breed: null,
            name: null,
            age: null,
            sex: null,
            shift: new Animated.Value(0),
        };
    }

    hide() {
        this.setState({ visible: false });
    }

    show() {
        this.setState({ visible: true });
    }

    handleAge = (text) => {
        this.setState({age: text})
    }

    handleBreed = (text) => {
        this.setState({breed: text})
    }

    handleName = (text) => {
        this.setState({name: text})
    }

    addPetToFireStore = (event) =>{
        var pet_uid = this.guidGenerator();
        const { uid } = Firebase.auth.currentUser;
        var owner_uid = uid;
        var pic = "null";
        const {species, breed, name, age, sex} = this.state;
        var checkForInputs = [species, breed, name, age, sex];

        for (let i = 0; i < checkForInputs.length; i++)
        {
            if (checkForInputs[i] == null)
            {
                alert("Fill all fields");
                return;
            }
        }

        var docRef = Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
                this.addPetToFireStore();
            } else {
                Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid).set({
                    species, breed, name, age, sex, pic, owner_uid
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
                console.log("POGGERS! ADDED YOUR " + species + ", " + name + " TO THE DB!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }

    guidGenerator = (event) => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }

    handleKeyboardDidShow = (event) => {
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField();
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
          const fieldHeight = height;
          const fieldTop = pageY;
          const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
          if (gap >= 0) {
            return;
          }
          Animated.timing(
            this.state.shift,
            {
              toValue: gap,
              duration: 300,
              useNativeDriver: true,
            }
          ).start();
        });
    }
    
      handleKeyboardDidHide = () => {
        Animated.timing(
          this.state.shift,
          {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }
        ).start();
    }
    

    render() {
        const { navigation } = this.props;
        const { shift } = this.state;

        return (
            
            
            <Animated.View style={[{ transform: [{translateY: shift}] }]}> 
                <DropDownPicker
                    items={[
                        {label: 'Dog', value: 'Dog', icon: () => <FontAwesome5 name="dog" size={18} color="#900" />},
                        {label: 'Cat', value: 'Cat', icon: () => <FontAwesome5 name="cat" size={18} color="#900" />},
                        {label: 'Bird', value: 'Bird', icon: () => <FontAwesome5 name="dove" size={18} color="#900" />},
                        {label: 'Horse', value: 'Horse', icon: () => <FontAwesome5 name="horse" size={18} color="#900" />},
                        {label: 'Fish', value: 'Fish', icon: () => <FontAwesome5 name="fish" size={18} color="#900" />},
                        {label: 'Exotic', value: 'Exotic', icon: () => <FontAwesome5 name="spider" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.species}
                    containerStyle={{height: 40, marginBottom: 6}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        species: item.value
                    })}
                    placeholder="Select a species"
                    isVisible={this.state.isVisibleA}
                    onOpen={() => this.setState({
                        isVisibleA: true
                    })}
                    onClose={() => this.setState({
                        isVisibleA: false
                    })}
                />

                <DropDownPicker
                    items={[
                        {label: 'Male', value: 'male', icon: () => <FontAwesome5 name="mars" size={18} color="#900" />},
                        {label: 'Female', value: 'female', icon: () => <FontAwesome5 name="venus" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.sex}
                    containerStyle={{height: 40, marginBottom: 6}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        sex: item.value
                    })}
                    placeholder="Select sex"
                    isVisible={this.state.isVisibleB}
                    onOpen={() => this.setState({
                        isVisibleB: true
                    })}
                    onClose={() => this.setState({
                        isVisibleB: false
                    })}
                />
                
                <Text>Name:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleName}
                    returnKeyType = 'done'
                />
                

                <Text>Breed:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleBreed}
                    returnKeyType = 'done'
                />
                
                <Text>Age:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleAge}
                    keyboardType="numeric"
                    returnKeyType = 'done'
                /> 
                
                <Button
                label="Add Pet"
                name={this.props.name}
                onPress={this.addPetToFireStore}
                style={{borderColor: Theme.palette.secondary}}
                full
                primary
            />
            
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 283,
        justifyContent: "space-evenly",
        flexDirection: "row",
        margin: 6,
        marginVertical: Theme.spacing.base,
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
    },
    input: {
        height: 30,
        margin: 6,
        width: 300,
        borderWidth: 1,
        paddingTop: 0,
        textAlign: 'left'
    },
    buttonContainer: {
        height: 30,
        margin: 6,
        paddingTop: 0,
        textAlign: 'left'
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: -500
      },
});
