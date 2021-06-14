import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, SectionList} from 'react-native';
import { Theme, NavHeaderWithButton, Text } from "../../../components";
import type { ScreenParams } from "../../components/Types";
import { LinearGradient } from "expo-linear-gradient";
import MultiSelect from "react-native-multiple-select";
import Firebase from "../../../components/Firebase";

export default class PetPrescription extends Component<ScreenParams<{ pet_uid: String }>, SettingsState> {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "A" },
        { name: "B" },
        { name: "C" }
      ],
      role: 'c',
      selectedPresc: [{ name: "A" }],
      diagnoseButtonIsVisible: true
    };

    const { uid } = Firebase.auth.currentUser;

    Firebase.firestore
    .collection("users")
    .doc(uid)
    .onSnapshot(docs => {
      this.state.role = docs.data().role;
    });    

  }

  
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems: selectedItems });
  }

  render() {
    const { navigation } = this.props;
    const { items, selectedItems } = this.state;

    return (
      <View style={styles.container}>
        <NavHeaderWithButton title="Prescriptions" back {...{ navigation }} />
        <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />

        {this.state.role == 'v' && <MultiSelect
          items={items} // List of items to display in the multi-select component
          uniqueKey="name" // Unique identifier that is part of each item"s properties
          onSelectedItemsChange={this.onSelectedItemsChange} // Triggered when Submit button is clicked
          onChangeInput={(text) => console.warn(text)} // Called every time TextInput is changed with the value
          displayKey="name" // Used to select the key to display the objects in the items array
          flatListProps={{ nestedScrollEnabled: true }} // Necessary for nested scrolling in Android devices

          selectText="Select prescriptions"
          fontFamily="SFProText-Semibold"
          altFontFamily="SFProText-Semibold"
          styleListContainer={{ backgroundColor: Theme.palette.white, paddingVertical: 10 }}
          styleItemsContainer={{ justifyContent: "space-evenly", flexDirection: "column" }}
          styleMainWrapper={{ height: height / 4.5, shadowColor: Theme.palette.white, shadowOffset: { width: 10, height: 10 }, shadowOpacity: 0.5, shadowRadius: 6 }}

          itemTextColor={Theme.palette.black}
          textColor={Theme.palette.black}
          selectedItems={selectedItems}
          selectedItemFontFamily="SFProText-Semibold"
          selectedItemTextColor={Theme.palette.success}
          selectedItemIconColor={Theme.palette.success}

          searchInputPlaceholderText="Search symptoms..."
          searchInputStyle={{ color: Theme.palette.black, fontFamily: "SFProText-Semibold" }}
          styleInputGroup={{ backgroundColor: "rgba(157, 255, 176, .5)", height: height / 15, borderRadius: 10, paddingRight: 15 }}
          styleDropdownMenuSubsection={{ height: height / 15, borderRadius: 10, width: "100%", paddingLeft: 25 }}

          tagTextColor={Theme.palette.black}
          tagRemoveIconColor={Theme.palette.black}
          tagBorderColor={Theme.palette.primary}
          tagContainerStyle={{ backgroundColor: Theme.palette.white, alignSelf: "flex-start" }}

          submitButtonColor={Theme.palette.primary}
          submitButtonText="Add Prescriptions"
          // hideSubmitButton
          // hideTags
          hideDropdown
          ref={(component) => { this._multiSelect = component }}
        />}

        {this.state.role != 'v' && <SectionList
          sections={[
            { title: 'Prescriptions', data: this.state.selectedPresc },
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
          renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}/>
        }
      </View>
    )
  }


}

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  pdfReader: {
    height: 500,
    justifyContent: "space-around",
    margin: Theme.spacing.base
  }
});


