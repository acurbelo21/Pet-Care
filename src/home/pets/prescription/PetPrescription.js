import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, SectionList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Theme, NavHeaderWithButton, Text } from "../../../components";
import type { ScreenParams } from "../../components/Types";
import { LinearGradient } from "expo-linear-gradient";
import MultiSelect from "react-native-multiple-select";
import Firebase from "../../../components/Firebase";

export default class PetPrescription extends Component<ScreenParams<{ pet_uid: String}>, SettingsState> {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Rimadyl" },
        { name: "Metacam" },
        { name: "Deramaxx" }
      ],
      role: "",
      selectedItem: "",
      existentPrescriptions: [],
      diagnoseButtonIsVisible: true,      
      instructions: "",
      qty: "",
      dose: "", 
      date: ""
    };

    const { uid } = Firebase.auth.currentUser;
    const { navigation } = this.props;
    const params = navigation.state.params;
    var pet_uid = params.pet_uid;

    Firebase.firestore
      .collection("users")
      .doc(uid)
      .get()
      .then(docs => {
        this.setState({
          role: docs.data().role,
        });
      });

    Firebase.firestore
      .collection("users")
      .doc(uid)
      .collection("pets")
      .doc(pet_uid)
      .collection("prescriptions")
      .onSnapshot(docs => {
        this.retrieveFireStorePrescriptions();
      });
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItem: selectedItems[0] });
    // console.log("************** this.state", this.state);
    // console.log("************** selectedItems", selectedItems);
  }

  setDose = (dose) => {
    //this.state.dose = dose;
    this.setState({dose: dose});
  }

  setQuantity = (qty) => {
    this.setState({qty: qty});
  }

  setInstruction = (instructions) => {
    this.setState({instructions: instructions});
  }

  savePrescriptionToFireStore = () => {

    const { navigation } = this.props;
    let params = navigation.state.params;
    var pet_uid = params.pet_uid;
    var checkForInputs = [
      this.state.selectedItem,
      this.state.dose,
      this.state.qty,
      this.state.instructions,
    ];
    const { uid } = Firebase.auth.currentUser;

    //Checks to see if any inputs are not filled out
    for (let i = 0; i < checkForInputs.length; i++) {
      if (checkForInputs[i] == null) {
        alert("Fill all fields");
        return;
      }
    }

    var docRef = Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid);
    
    //Add pet to firestore
    docRef
    .get()
    .then((doc) => {
      this.setState({ loading: true});
      if (doc.exists) {
        docRef
        .collection("prescriptions")
        .add({
          prescription: this.state.selectedItem,
          dose: this.state.dose,
          date: new Date(),
          quantity: this.state.qty,
          instructions: this.state.instructions
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }})
    .then((res) => {
      this.state.selectedItem = "";
      this.state.dose = "";
      this.state.qty = "";
      this.state.instructions = "";
      this.setState({ loading: false});
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  }
  retrieveFireStorePrescriptions() {
    const { uid } = Firebase.auth.currentUser;
    const { navigation } = this.props;
    let params = navigation.state.params;
    var pet_uid = params.pet_uid;
    this.state.existentPrescriptions = [];

    Firebase.firestore
      .collection("users")
      .doc(uid)
      .collection("pets")
      .doc(pet_uid)
      .collection("prescriptions")
      .get()
      .then((snapshot) => {
        //console.log("********************** snapshot => ",snapshot._delegate._snapshot.docChanges);
        snapshot.forEach((doc) => {
          console.log('*********** item => ', doc.data());
          this.state.existentPrescriptions.push({
            prescription: doc.data().prescription,
            dose: doc.data().dose,
            qty: doc.data().quantity,
            instructions: doc.data().instructions,
            date: new Date(doc.data().date.seconds*1000).toString()
          });
          //console.log("************** existentPrescriptions", this.state.existentPrescriptions);
        });
      })
      .then((res) => {
        this.setState({ loading: false})
        console.log("************** 150 existentPrescriptions", this.state.existentPrescriptions);
      });      
      
    //console.log("************** this.existentPrescriptions", this.state.existentPrescriptions);
  }


  render() {
    const { navigation } = this.props;
    const { items, selectedItem } = this.state;
    return (
      <View style={styles.container}>
        <NavHeaderWithButton title="Prescriptions" back {...{ navigation }} />
        <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
        <Text> {this.state.role}</Text>
        {this.state.role == 'v' && <MultiSelect
          single
          items={items} // List of items to display in the multi-select component
          uniqueKey="name" // Unique identifier that is part of each item"s properties
          onSelectedItemsChange={this.onSelectedItemsChange} // Triggered when Submit button is clicked
          onChangeInput={(text) => console.warn(text)} // Called every time TextInput is changed with the value
          displayKey="name" // Used to select the key to display the objects in the items array
          flatListProps={{ nestedScrollEnabled: true }} // Necessary for nested scrolling in Android devices

          selectText="Select Prescription"
          fontFamily="SFProText-Semibold"
          altFontFamily="SFProText-Semibold"
          styleListContainer={{ backgroundColor: Theme.palette.white, paddingVertical: 10 }}
          styleItemsContainer={{ justifyContent: "space-evenly", flexDirection: "column" }}
          styleMainWrapper={{ height: height / 4.5, shadowColor: Theme.palette.white, shadowOffset: { width: 10, height: 10 }, shadowOpacity: 0.5, shadowRadius: 6 }}

          itemTextColor={Theme.palette.black}
          textColor={Theme.palette.black}
          selectedItems={[selectedItem]}
          selectedItemFontFamily="SFProText-Semibold"
          selectedItemTextColor={Theme.palette.success}
          selectedItemIconColor={Theme.palette.success}

          searchInputPlaceholderText="Search prescriptions..."
          searchInputStyle={{ color: Theme.palette.black, fontFamily: "SFProText-Semibold" }}
          styleInputGroup={{ backgroundColor: "rgba(157, 255, 176, .5)", height: height / 15, borderRadius: 10, paddingRight: 15 }}
          styleDropdownMenuSubsection={{ height: height / 15, borderRadius: 10, width: "100%", paddingLeft: 25 }}

          tagTextColor={Theme.palette.black}
          tagRemoveIconColor={Theme.palette.black}
          tagBorderColor={Theme.palette.primary}
          tagContainerStyle={{ backgroundColor: Theme.palette.white, alignSelf: "flex-start" }}

          submitButtonColor={Theme.palette.primary}
          submitButtonText="Add prescription"
          // hideSubmitButton
          // hideTags
          hideDropdown
          ref={(component) => { this._multiSelect = component }}
        />}

        {this.state.role == 'v' && <TextInput
          style={styles.input}
          placeholder="Dose"
          onChangeText={text => this.setDose(text)}
          multiline={false}
          value={this.state.dose}
        />}

        {this.state.role == 'v' && <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Quantity"
          onChangeText={text => this.setQuantity(text)}
          multiline={false}
          value={this.state.qty}
        />}

        {this.state.role == 'v' && <TextInput
          style={styles.bigInput}
          placeholder="Instructions"
          onChangeText={text => this.setInstruction(text)}
          multiline={true}
          value={this.state.instructions}
        />}

        {this.state.role == 'v' &&
          <TouchableOpacity
            style={styles.prescBottom}
            onPress={this.savePrescriptionToFireStore}>
            <Text>
              Save Prescription
            </Text>
          </TouchableOpacity>
        }

        <Text type="header3"> Prescriptions History </Text>
        <ScrollView  persistentScrollbar={false} >
          <View style={{paddingBottom: 10}}>
            {
              //console.log("**** element ===> ", this.state.existentPrescriptions);
              this.state.existentPrescriptions.map((element, k) => {
                console.log("**** element ===> ", element, k);
                return <View>
                  <Text> Prescription: {element.prescription}</Text>
                  <Text> Dose: {element.dose}</Text>
                  <Text> Quantity: {element.qty}</Text>
                  <Text> Instructions: {element.instructions}</Text>
                  <Text> Date: {element.date}</Text>
                  <Text> --</Text>
                </View>
              })
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll'
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  prescBottom: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    padding: 10,
    marginTop: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 99
  },
  input: {
    height: 30,
    margin: 6,
    borderWidth: 1,
    paddingTop: 0,
    textAlign: 'left'
  },
  bigInput: {
    height: 70,
    margin: 6,
    borderWidth: 1,
    paddingTop: 0,
    textAlign: 'left'
  },
  header: {
    backgroundColor: "#e0f4ff",
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 23,
    padding: 10,
    flexDirection: "row"
  },
  item: {
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 15,
    padding: 10,
  },
  title: {
    fontSize: 24
  }
});