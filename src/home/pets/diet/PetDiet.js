import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, SectionList, TouchableOpacity} from 'react-native';
import { Theme, NavHeaderWithButton, Text } from "../../../components";
import type { ScreenParams } from "../../components/Types";
import { LinearGradient } from "expo-linear-gradient";
import MultiSelect from "react-native-multiple-select";
import Firebase from "../../../components/Firebase";
import autobind from 'autobind-decorator';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'native-base';

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
    .collection("pets")
    .doc(pet_uid)
    .collection("diet")
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
    {label: 'Mineral Salt', value: 'mineral_salt'},
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
 
    let diet = selectedDiet;
    let docRef = Firebase.firestore.collection("users").doc(uid).collection("pets").doc(params.pet_uid);
 
    docRef.update({ petDiet: diet });
  }
 
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: selectedItems}] });
    this.setState({ role: 'v' })
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onChangeItem = (selectedItems) => {
    () => this.setState({ selectedDiet: [...this.state.selectedDiet, {name: selectedItems}] });
  }

  onPressMilk = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Milk"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressFish = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Fish"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressLamb = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Lamb"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressChicken = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Chicken"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressEggs = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Eggs"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressRice = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Rice"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressOatmeal = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Oatmeal"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressCorn = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Corn"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressBarley = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Barley"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressBeetPulp = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Beet Pulp"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressCellulose = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Cellulose"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressChicoryRoot = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Chicory Root"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressYeastExtract = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Yeast Extract"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressSoyOil = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Soy Oil"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressCanolaOil = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Canola Oil"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressFishOil = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Fish Oil"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressVegetables = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Vegetables"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressSupplements = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Supplements"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressCitrus = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Citrus"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressCereal = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Cereal"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressBrewersYeast = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Brewers Yeast"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressLiver = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Liver"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressMineralSalt = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Mineral Salt"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressBone = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Bone"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressWheat = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Wheat"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressPurifiedSupplement = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Purified Supplement"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressCarrots = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Carrots"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressMarigoldExtract = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Marigold Extract"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressCartilage = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Cartilage"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressCrustaceans = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Crustaceans"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  onPressGreenTeaExtract = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, {name: "Green Tea Extract"}] });
    this.setState({ role: 'v' });
    this.updateFireStorePetDetails(this.state.selectedDiet);
  }

  switchRole = () => {
    this.setState({ role: 'c' });
  }
 
  render() {
    const { navigation } = this.props;
    const { proteins, selectedItems } = this.state;
 
    return (
      <ScrollView style={styles.container}>
        <NavHeaderWithButton title="Diet" back {...{ navigation }} />
        <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />

      { this.state.role == 'v' && <View style= {styles.dietHeading}>
        <Text style={{fontSize: 20 }}> {"Proteins:"} </Text>
      </View>} 

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressMilk}>
          <Text style={{fontSize: 15 }}> {"Milk"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressFish}>
          <Text style={{fontSize: 15 }}> {"Fish"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressEggs}>
          <Text style={{fontSize: 15 }}> {"Eggs"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressChicken}>
          <Text style={{fontSize: 15 }}> {"Chicken"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressLamb}>
          <Text style={{fontSize: 15 }}> {"Lamb"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      { this.state.role == 'v' && <View style= {styles.dietHeading}>
        <Text style={{fontSize: 20 }}> {"Carbohydrates:"} </Text>
      </View>}

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressRice}>
          <Text style={{fontSize: 15 }}> {"Rice"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressOatmeal}>
          <Text style={{fontSize: 15 }}> {"Oatmeal"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressCorn}>
          <Text style={{fontSize: 15 }}> {"Corn"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressBarley}>
          <Text style={{fontSize: 15 }}> {"Barley"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressBeetPulp}>
          <Text style={{fontSize: 15 }}> {"Beet Pulp"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressCellulose}>
          <Text style={{fontSize: 15 }}> {"Cellulose"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressChicoryRoot}>
          <Text style={{fontSize: 15 }}> {"Chicory Root"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressYeastExtract}>
          <Text style={{fontSize: 15 }}> {"Yeast Extract"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      { this.state.role == 'v' && <View style= {styles.dietHeading}>
        <Text style={{fontSize: 20 }}> {"Fats:"} </Text>
      </View>}

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressSoyOil}>
          <Text style={{fontSize: 15 }}> {"Soy Oil"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressCanolaOil}>
          <Text style={{fontSize: 15 }}> {"Canola Oil"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressFishOil}>
          <Text style={{fontSize: 15 }}> {"Fish Oil"} </Text>
            </TouchableOpacity>
        </View>}  
      </View>

      { this.state.role == 'v' && <View style= {styles.dietHeading}>
        <Text style={{fontSize: 20 }}> {"Vitamins:"} </Text>
      </View>}

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressVegetables}>
          <Text style={{fontSize: 15 }}> {"Vegetables"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressSupplements}>
          <Text style={{fontSize: 15 }}> {"Supplements"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressCitrus}>
          <Text style={{fontSize: 15 }}> {"Citrus"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressCereal}>
          <Text style={{fontSize: 15 }}> {"Cereal"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressBrewersYeast}>
          <Text style={{fontSize: 15 }}> {"Brewers Yeast"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressLiver}>
          <Text style={{fontSize: 15 }}> {"Liver"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressMineralSalt}>
          <Text style={{fontSize: 15 }}> {"Mineral Salt"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressBone}>
          <Text style={{fontSize: 15 }}> {"Bone"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressWheat}>
          <Text style={{fontSize: 15 }}> {"Wheat"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressPurifiedSupplement}>
          <Text style={{fontSize: 15 }}> {"Purified Supplement"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      { this.state.role == 'v' && <View style= {styles.dietHeading}>
        <Text style={{fontSize: 20 }}> {"Other:"} </Text>
      </View>}

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressCorn}>
          <Text style={{fontSize: 15 }}> {"Corn"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressCarrots}>
          <Text style={{fontSize: 15 }}> {"Carrots"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressMarigoldExtract}>
          <Text style={{fontSize: 15 }}> {"Marigold Extract"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressCartilage}>
          <Text style={{fontSize: 15 }}> {"Cartilage"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      <View style= { {flexDirection: "row"} }>
        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressCrustaceans}>
          <Text style={{fontSize: 15 }}> {"Crustaceans"} </Text>
            </TouchableOpacity>
        </View>} 

        { this.state.role == 'v' && <View style= {styles.button_one}>
        <TouchableOpacity onPress={this.onPressGreenTeaExtract}>
          <Text style={{fontSize: 15 }}> {"Green Tea Extract"} </Text>
            </TouchableOpacity>
        </View>} 
      </View>

      { this.state.role != 'v' && <SectionList
          sections={[
            { title: 'Suggested Diet:', data: this.state.selectedDiet },
          ]}
          renderItem={({ item }) => <Text style={ {color: Theme.palette.black, fontFamily: "SFProText-Semibold", fontWeight: 'bold'} }>{item.name}</Text>}
          renderSectionHeader={({ section }) => <Text style={{fontSize: 20, color: Theme.palette.black, fontFamily: "SFProText-Semibold", fontWeight: 'bold', paddingVertical: 10}}>{section.title}</Text>}
          keyExtractor={(item, index) => index}/>}


      { this.state.role == 'v' && <View style= {styles.button_two}>
        <TouchableOpacity onPress={this.switchRole}>
          <Text style={{fontSize: 15 }}> {"Submit Diet"} </Text>
            </TouchableOpacity>
        </View>} 
        

      <View style= {styles.dietHeading}>
        <Text style={{fontSize: 1 }}> {""} </Text>
      </View>
        
      </ScrollView>
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
  endnote: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  button_one: {
    justifyContent: 'space-around',
    width: '40%',
    backgroundColor: `#9dffb0`,
    height: 40,
    bottom: '1%',
    top: '1%',
    right: 5,
    left: 5,
    margin: 5
  }, 
  button_two: {
    justifyContent: 'space-around',
    backgroundColor: `#9dffb0`,
    height: 40,
    bottom: '1%',
    top: '2%'
  },
  dietHeading: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 2
  }
});
 
/*
[
        { name: "Eggs" },
        { name: "Chicken" },
        { name: "Lamb" },
        { name: "Fish"},
        { name: "Milk"}
      ]*/

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
              let proteinDropdown;

    if (this.state.role == 'v') {
        proteinDropdown =    
        <DropDownPicker
        items={proteins}
        //defaultValue={}
        flatListProps={{ nestedScrollEnabled: true }}
        containerStyle={{height: 40, marginBottom: 142}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
            justifyContent: 'flex-start'
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onValueChange= {this.onSelectedItemsChange}
        placeholder="Select proteins"
        isVisible={this.state.isVisible_Protein}
        onOpen={() => this.setState({
            isVisible_Protein: true,
            role: 'v'
        })}
        onClose={() => this.setState({
            isVisible_Protein: false,
            role: 'v'
        })} />    ;
    } else {
        proteinDropdown = <SectionList
        sections={[
          { title: 'Suggested Diet:', data: this.state.selectedDiet },
        ]}
        renderItem={({ item }) => <Text style={ {color: Theme.palette.black, fontFamily: "SFProText-Semibold", fontWeight: 'bold'} }>{item.name}</Text>}
        renderSectionHeader={({ section }) => <Text style={{fontSize: 20, color: Theme.palette.black, fontFamily: "SFProText-Semibold", fontWeight: 'bold', paddingVertical: 10}}>{section.title}</Text>}
        keyExtractor={(item, index) => index}/>;
    }
       */}

        
        {/*
          {proteinDropdown}
       */}