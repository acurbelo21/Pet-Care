import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, SectionList} from 'react-native';
import { Theme, NavHeaderWithButton, Text } from "../../../components";
import type { ScreenParams } from "../../components/Types";
import { LinearGradient } from "expo-linear-gradient";
import MultiSelect from "react-native-multiple-select";
import Firebase from "../../../components/Firebase";
import autobind from 'autobind-decorator';
import DropDownPicker from 'react-native-dropdown-picker';

type Dietary = { label: string, value: string };
 
export default class PetDiet extends Component<ScreenParams<{ pet_uid: String }>, SettingsState> {
  constructor(props) {
    super(props);
    this.state = {
      proteins: PetDiet.proteins_list,
      fats: [],
      role: 'v',
      selectedDiet: [],
      diagnoseButtonIsVisible: true
    };
 
    const { uid } = Firebase.auth.currentUser;
    const { navigation } = this.props;
    let params = navigation.state.params;
 
    Firebase.firestore
    .collection("users")
    .doc(uid)
    .onSnapshot(docs => {
      this.state.role = docs.data().role;
    });    
 
  }

  static proteins_list: Dietary[] = [
    { label: 'Eggs', value: 'eggs' },
    { label: 'Chicken', value: 'chicken' },
    { label: 'Lamb', value: 'lamb' },
    { label: 'Fish', value: 'fish' },
    { label: 'Milk', value: 'milk' }
    ];

  static fats_list: Dietary[] = [
    {label: 'Soy Oil', value: 'soy_oil'},
    {label: 'Canola Oil', value: 'canola_oil'},
    {label: 'Fish Oil', value: 'fish_oil'}
  ];

  static carbs_list: Dietary[] = [
    {label: 'Rice', value: 'rice'},
    {label: 'Oatmeal', value: 'oatmeal'},
    {label: 'Corn', value: 'corn'},
    {label: 'Barley', value: 'barley'},
    {label: 'Beet Pulp', value: 'beet_pulp'},
    {label: 'Cellulose', value: 'cellulose'},
    {label: 'Chicory Root', value: 'chicory_root'},
    {label: 'Yeast Extract', value: 'yeast_extract'}
  ];

  static vitamin_list: Dietary[] = [
    {label: 'Vegetables', value: 'vegetables'},
    {label: 'Supplements', value: 'supplements'},
    {label: 'Citrus', value: 'citrus'},
    {label: 'Cereal', value: 'cereal'},
    {label: 'Brewers yeast', value: 'brewers_yeast'},
    {label: 'Liver', value: 'liver'},
    {label: 'Mineral Salts', value: 'mineral_salt'},
    {label: 'Bone', value: 'bone'},
    {label: 'Wheat', value: 'wheat'},
    {label: 'Purified Supplement', value: 'purified_supplement'}
  ];
  
  static other_list: Dietary[] = [
    {label: 'Corn', value: 'corn'},
    {label: 'Carrots', value: 'carrots'},
    {label: 'Marigold Extract', value: 'marigold_extract'},
    {label: 'Cartilage', value: 'cartilage'},
    {label: 'Crustaceans', value: 'crustaceans'},
    {label: 'Green Tea Extract', value: 'green_tea_extract'},
  ];

  @autobind
  updateFireStorePetDetails(selectedDiet) {
    const { uid } = Firebase.auth.currentUser;
    const { navigation } = this.props;
    //const { diet } = this.state.selectedDiet;
    const params = navigation.state.params;
 
    let diet = [...selectedDiet];
    let docRef = Firebase.firestore.collection("users").doc(uid).collection("pets").doc(params.pet_uid);
 
    docRef.update({ petDiet: diet });
  }
 
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedDiet: [{name: selectedItems}] });
    this.setState({ role: 'v' })
    //this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onChangeItem = (selectedItems) => {
    () => this.setState({ selectedDiet: [{name: selectedItems}] });
  }
 
  render() {
    const { navigation } = this.props;
    const { proteins, selectedItems } = this.state;
    let proteinDropdown;

    if (this.state.role == 'v') {
        proteinDropdown = <DropDownPicker
        items={proteins}
        //defaultValue={}
        flatListProps={{ nestedScrollEnabled: true }}
        containerStyle={{height: 40, marginBottom: 142}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
            justifyContent: 'flex-start'
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onValueChange= {(itemValue) => this.setState({ selectedDiet: [{name: itemValue}], role: 'v' })}
        placeholder="Select proteins"
        isVisible={this.state.isVisible_Protein}
        onOpen={() => this.setState({
            isVisible_Protein: true,
            role: 'v'
        })}
        onClose={() => this.setState({
            isVisible_Protein: false,
            role: 'c'
        })} />;
    } else {
        proteinDropdown = <SectionList
        sections={[
          { title: 'Suggested Diet:', data: this.state.selectedDiet },
        ]}
        renderItem={({ item }) => <Text style={ {color: Theme.palette.black, fontFamily: "SFProText-Semibold", fontWeight: 'bold'} }>{item.name}</Text>}
        renderSectionHeader={({ section }) => <Text style={{fontSize: 20, color: Theme.palette.black, fontFamily: "SFProText-Semibold", fontWeight: 'bold', paddingVertical: 10}}>{section.title}</Text>}
        keyExtractor={(item, index) => index}/>;
    }
 
    return (
      <View style={styles.container}>
        <NavHeaderWithButton title="Diet" back {...{ navigation }} />
        <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
 
        
       {/*
       <MultiSelect
        items={proteins} // List of items to display in the multi-select component
        uniqueKey="name" // Unique identifier that is part of each item"s properties
        onSelectedItemsChange={this.onSelectedItemsChange} // Triggered when Submit button is clicked
        onChangeInput={(text) => console.warn(text)} // Called every time TextInput is changed with the value
        displayKey="name" // Used to select the key to display the objects in the items array
        flatListProps={{ nestedScrollEnabled: true }} // Necessary for nested scrolling in Android devices

        selectText="Select diet"
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
     />
       */}

       {/*
       
       */}

        
        {proteinDropdown}
        

        <Text> { "Current Role " + this.state.role }</Text>
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
  },
  input: {
    height: 30,
    margin: 6,
    borderWidth: 1,
    paddingTop: 0,
    textAlign: 'left'
  },  
  scroll: {
      backgroundColor: '#FFF',
  },
  gradient: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: -500
  },
});
 
/*[
        { name: "Eggs" },
        { name: "Chicken" },
        { name: "Lamb" },
        { name: "Fish"},
        { name: "Milk"}
      ]*/