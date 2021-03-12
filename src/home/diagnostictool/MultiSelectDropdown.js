// @flow
import * as React from "react";
import { Dimensions } from "react-native";

import { Text, View, Theme } from "../../components";
import MultiSelect from "react-native-multiple-select";

type Symptom = { name: string };

export default class MultiSelectDropdown extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        items: [],
        selectedItems: []
      };
      this.selectPet = this.selectPet.bind(this);
  }

  static dogSymptoms: Symptom[] = [
    { name: "Cough" },
    { name: "Lethargy" },
    { name: "Decreased appetite" },
    { name: "Intense breathing" },
    { name: "Eye redness" },
    { name: "Runny nose" },
    { name: "Diarrhea" },
    { name: "Vomiting" },
    { name: "Depression" },
    { name: "Abdominal pain" },
    { name: "Sneezing" },
    { name: "Discoloration of the gums" },
    { name: "Lack of energy" },
    { name: "Muscular pain" },
    { name: "Blood in the urine" },
    { name: "Severe itching" },
    { name: "Paralysis" },
    { name: "Fallen jaw" },
    { name: "Wounds in the mouth" },
    { name: "Lack of coordination" },
    { name: "High temperature" },
    { name: "Inability to swallow" },
    { name: "Shyness or aggression" },
    { name: "Frequent changes in behavior" },
    { name: "Dermatitis" },
    { name: "Existence of an external agent on the skin" }
  ];

  static catSymptoms: Symptom[] = [
    { name: "Struggle and discomfort when urinating" },
    { name: "Presence of blood in the urine" },
    { name: "Urination in unusual places" },
    { name: "Crying when urinating" },
    { name: "Licking the urinary tract (usually due to pain)" },
    { name: "Depression" },
    { name: "Anorexia" },
    { name: "Vomiting" },
    { name: "Dehydration" },
    { name: "Freckles on cat skin" },
    { name: "Persistent itching of the body" },
    { name: "Permanent body licking" },
    { name: "Redness and irritation of the skin" },
    { name: "Hair loss" },
    { name: "Skin infections and inflamed red spots on the skin" },
    { name: "Decreased appetite" },
    { name: "Lethargy" },
    { name: "Discharge from the eyes" },
    { name: "Nasal discharge" },
    { name: "Wounds around the mouth, soft palate, nose tip, lips, or around the paws" },
    { name: "Pneumonia (lung infection)" },
    { name: "Difficulty breathing" },
    { name: "Infection" },
    { name: "Arthritis (inflammation of the joints)" },
    { name: "Walking with pain" },
    { name: "High fever" },
    { name: "Very severe gastrointestinal symptoms" },
    { name: "Bloody vomiting" },
    { name: "Bloody diarrhea" },
    { name: "Sneezing" },
    { name: "Serious to purulent mucus from the nose and eyes" },
    { name: "Conjunctivitis" },
    { name: "Conjunctival chemosis" }
  ];

  static birdSymptoms: Symptom[] = [
    { name: "Increased urination (polyuria)" },
    { name: "Loose diarrhea and watery stools" },
    { name: "Blood in the stool" },
    { name: "Green diarrhea" },
    { name: "Depression" },
    { name: "Torticoline (twisting of the head and neck)" },
    { name: "Ataxia (loss of balance)" },
    { name: "Paralysis of limbs and wings" },
    { name: "Decreased appetite" },
    { name: "Difficulty eating" },
    { name: "Respiratory problems such as wheezing" },
    { name: "Decreased egg production" },
    { name: "Egg abnormality (egg size, shape and color)" },
    { name: "Eye discharge" },
    { name: "Nasal discharge" },
    { name: "Discharge from the beak" },
    { name: "Weakness" },
    { name: "Anorexia" },
    { name: "Drowsiness" },
    { name: "Dirty feathers and dangling wings" },
    { name: "Swelling of the soles of the feet and joints" },
    { name: "Blindness" }
  ];

  selectPet = (species) => {
    switch(species) {
      case "Dog":
        this.setState({ items: MultiSelectDropdown.dogSymptoms });
        break;
      case "Cat":
        this.setState({ items: MultiSelectDropdown.catSymptoms });
        break;
      case "Bird":
        this.setState({ items: MultiSelectDropdown.birdSymptoms });
        break;
      default:
        this.setState({ items: species });
    }
  }
  
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems: selectedItems });
  }

  clearSelectedCategories = () => {
    this._multiSelect._removeAllItems();
  };

  render() {
    const { items, selectedItems } = this.state;
    return (
        <MultiSelect
          items={items} // List of items to display in the multi-select component
          uniqueKey="name" // Unique identifier that is part of each item"s properties
          onSelectedItemsChange={this.onSelectedItemsChange} // Triggered when Submit button is clicked 
          onChangeInput={(text) => console.warn(text)} // Called every time TextInput is changed with the value
          displayKey="name" // Used to select the key to display the objects in the items array
          flatListProps={{nestedScrollEnabled: true}} // Necessary for nested scrolling in Android devices

          selectText="Select symptoms"
          fontFamily="SFProText-Semibold"
          altFontFamily="SFProText-Semibold"
          styleListContainer={{backgroundColor: Theme.palette.white, paddingVertical: 10}}
          styleItemsContainer={{justifyContent: "space-evenly", flexDirection: "column"}}
          styleMainWrapper={{height: height/4.5, shadowColor: Theme.palette.white, shadowOffset: { width: 10, height: 10 }, shadowOpacity: 0.5, shadowRadius: 6}}

          itemTextColor={Theme.palette.black}
          textColor={Theme.palette.black}
          selectedItems={selectedItems}
          selectedItemFontFamily="SFProText-Semibold"
          selectedItemTextColor={Theme.palette.success}
          selectedItemIconColor={Theme.palette.success}

          searchInputPlaceholderText="Search symptoms..."
          searchInputStyle={{color: Theme.palette.black, fontFamily: "SFProText-Semibold"}}
          styleInputGroup={{backgroundColor: "rgba(157, 255, 176, .5)", height: height/15, borderRadius: 10, paddingRight: 15}}
          styleDropdownMenuSubsection={{height: height/15, borderRadius: 10, width: "100%", paddingLeft: 25}}

          tagTextColor={Theme.palette.black}
          tagRemoveIconColor={Theme.palette.black}
          tagBorderColor={Theme.palette.primary}
          tagContainerStyle={{backgroundColor: Theme.palette.white, alignSelf: "flex-start"}}
          // styleTextTag={{size: Theme.typography.regular.fontSize}}

          submitButtonColor={Theme.palette.primary}
          submitButtonText="Confirm"
          // hideSubmitButton
          // hideTags
          hideDropdown
          ref={(component) => { this._multiSelect = component }}
        />
    );
  }
}

const {height} = Dimensions.get("window");

