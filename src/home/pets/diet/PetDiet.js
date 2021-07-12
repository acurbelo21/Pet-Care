import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, SectionList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Theme, NavHeaderWithButton, Text } from "../../../components";
import type { ScreenParams } from "../../components/Types";
import { LinearGradient } from "expo-linear-gradient";
import MultiSelect from "react-native-multiple-select";
import Firebase from "../../../components/Firebase";

export default class PetDiet extends Component<ScreenParams<{ pet_uid: String }>, SettingsState> {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Mediterranean" },
        { name: "Protein Based" },
        { name: "Vegetarian" }
      ],
      role: "",
      selectedItem: "",
      existentDiet: [],
      diagnoseButtonIsVisible: true,      
      dietDetails: "",
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
    .collection("diet")
    .onSnapshot(docs => {
      this.retrieveFireStoreDiet();
    });

  }

  
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItem: selectedItems[0] });
  }

  setDietDetails = (dietDetails) => {
    this.setState({dietDetails: dietDetails});
  }

  saveDietToFireStore = () => {

    const { navigation } = this.props;
    let params = navigation.state.params;
    var pet_uid = params.pet_uid;
    var checkForInputs = [
      this.state.selectedItem,
      this.state.dietDetails,
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
        .collection("diet")
        .add({
          date: new Date(),
          diet: this.state.selectedItem,
          dietDetails: this.state.dietDetails
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }})
    .then((res) => {
      this.state.selectedItem = "";
      this.state.dietDetails = "";
      this.setState({ loading: false});
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  retrieveFireStoreDiet() {
    const { uid } = Firebase.auth.currentUser;
    const { navigation } = this.props;
    let params = navigation.state.params;
    var pet_uid = params.pet_uid;
    this.state.existentDiet = [];

    Firebase.firestore
      .collection("users")
      .doc(uid)
      .collection("pets")
      .doc(pet_uid)
      .collection("diet")
      .get()
      .then((snapshot) => {
        //console.log("********************** snapshot => ",snapshot._delegate._snapshot.docChanges);
        snapshot.forEach((doc) => {
          console.log('*********** item => ', doc.data());
          this.state.existentDiet.push({
            diet: doc.data().diet,
            dietDetails: doc.data().dietDetails,
            date: new Date(doc.data().date.seconds*1000).toString()
          });
          //console.log("************** existentPrescriptions", this.state.existentPrescriptions);
        });
      })
      .then((res) => {
        this.setState({ loading: false})
        console.log("************** 150 existentDiet", this.state.existentPrescriptions);
      });      
      
    //console.log("************** this.existentPrescriptions", this.state.existentPrescriptions);
  }



  render() {
    const { navigation } = this.props;
    const { items, selectedItem } = this.state;

    return (
      <View style={styles.container}>
        <NavHeaderWithButton title="Diet" back {...{ navigation }} />
        <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />

        {this.state.role == 'v' && <MultiSelect
          single
          items={items} // List of items to display in the multi-select component
          uniqueKey="name" // Unique identifier that is part of each item"s properties
          onSelectedItemsChange={this.onSelectedItemsChange} // Triggered when Submit button is clicked
          onChangeInput={(text) => console.warn(text)} // Called every time TextInput is changed with the value
          displayKey="name" // Used to select the key to display the objects in the items array
          flatListProps={{ nestedScrollEnabled: true }} // Necessary for nested scrolling in Android devices

          selectText="Select Diet"
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

          searchInputPlaceholderText="Search diet..."
          searchInputStyle={{ color: Theme.palette.black, fontFamily: "SFProText-Semibold" }}
          styleInputGroup={{ backgroundColor: "rgba(157, 255, 176, .5)", height: height / 15, borderRadius: 10, paddingRight: 15 }}
          styleDropdownMenuSubsection={{ height: height / 15, borderRadius: 10, width: "100%", paddingLeft: 25 }}

          tagTextColor={Theme.palette.black}
          tagRemoveIconColor={Theme.palette.black}
          tagBorderColor={Theme.palette.primary}
          tagContainerStyle={{ backgroundColor: Theme.palette.white, alignSelf: "flex-start" }}

          submitButtonColor={Theme.palette.primary}
          submitButtonText="Add Diet"
          // hideSubmitButton
          // hideTags
          hideDropdown
          ref={(component) => { this._multiSelect = component }}
        />}

         {this.state.role == 'v' && <TextInput
          style={styles.bigInput}
          placeholder="Diet Details"
          onChangeText={text => this.setDietDetails(text)}
          multiline={true}
          value={this.state.dietDetails}
        />}  

        {this.state.role == 'v' &&
          <TouchableOpacity
            style={styles.prescBottom}
            onPress={this.saveDietToFireStore}>
            <Text>
              Save Diet
            </Text>
          </TouchableOpacity>
        }

        <Text type="header3"> Diet History </Text>
        <ScrollView  persistentScrollbar={false} >
          <View style={{paddingBottom: 10}}>
            {
              //console.log("**** element ===> ", this.state.existentPrescriptions);
              this.state.existentDiet.map((element, k) => {
                console.log("**** element ===> ", element, k);
                return <View>
                  <Text> Diet: {element.diet}</Text>
                  <Text> Diet Details: {element.dietDetails}</Text>
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


