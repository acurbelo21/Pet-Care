import React from 'react';
import { StyleSheet, TextInput, Animated, Dimensions, Keyboard, UIManager, ScrollView } from "react-native";
import { Text, Theme, NavHeaderWithButton } from "../../components";
import { FontAwesome5 } from '@expo/vector-icons';
import Firebase from "../../components/Firebase";
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from "expo-linear-gradient";

const { State: TextInputState } = TextInput;

export default class AddPets extends React.Component<SettingsState> {
   
    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
    }

    //Handles moving screen up and down with keyboard
    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }
    
      componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
        this.props.navigation.state.params.getData(); //Reloads pets list when going back
    }

    constructor(props) {
        super(props);
        this.state = {
            species: null,
            breed: null,
            name: null,
            age: null,
            yearsOwned: null, 
            sex: null,
            classification: null, 
            weight: null,
            shift: new Animated.Value(0),
        };
    }

    handleAge = (text) => {
        this.setState({age: text})
    }
    
    handleYearsOwned = (text) => {
        this.setState({yearsOwned: text})
    }

    handleBreed = (text) => {
        this.setState({breed: text})
    }

    handleName = (text) => {
        this.setState({name: text})
    }
    
    handleWeight = (text) => {
        this.setState({weight: text})
    }

    addPetToFireStore = (event) =>{
        var pet_uid = this.guidGenerator();
        const { uid } = Firebase.auth.currentUser;
        var owner_uid = uid;
        var pic = "null";
        const {species, breed, name, age, yearsOwned, sex, weight, classification} = this.state; 
        var checkForInputs = [species, breed, name, age, yearsOwned, sex, weight, classification];

        //Checks to see if any inputs are not filled out
        for (let i = 0; i < checkForInputs.length; i++)
        {
            if (checkForInputs[i] == null)
            {
                alert("Fill all fields");
                return;
            }
        }

        var docRef = Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid);

        //Add pet to firestore
        docRef.get().then((doc) => {
            if (doc.exists) {
                this.addPetToFireStore();
            } else {
                Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid).set({
                    species, breed, name, age, yearsOwned, sex, weight, classification, pic, owner_uid 
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        this.props.navigation.goBack();
    }

    //Generate pet ids
    guidGenerator = (event) => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }

    //Handles keyboard stuff
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
            <ScrollView>
            <Animated.View style={[{ transform: [{translateY: shift}] }]}>  
                <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
                <NavHeaderWithButton title="Add Pet" back {...{ navigation }} buttonFn={this.addPetToFireStore} buttonIcon="check" />

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
                    containerStyle={{height: 40, marginBottom: 150}}
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
                    containerStyle={{height: 40, marginBottom: 80}}
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

                <DropDownPicker
                    items={[
                        {label: 'Indoors', value: 'Indoors', icon: () => <FontAwesome5 name="home" size={18} color="#900" />},
                        {label: 'Outdoors', value: 'Outdoors', icon: () => <FontAwesome5 name="tree" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.classification}
                    containerStyle={{height: 40, marginBottom: 80}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        classification: item.value
                    })}
                    placeholder="Select living space"
                    isVisible={this.state.isVisibleC}
                    onOpen={() => this.setState({
                        isVisibleC: true
                    })}
                    onClose={() => this.setState({
                        isVisibleC: false
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

                <Text>Years Owned:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleYearsOwned}
                    keyboardType="numeric"
                    returnKeyType = 'done'
                />

                <Text>Weight:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleWeight}
                    keyboardType="numeric"
                    returnKeyType = 'done'
                />
            </Animated.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        margin: 6,
        borderWidth: 1,
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
