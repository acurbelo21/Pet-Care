// @flow
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from '@expo/vector-icons';

import {Text, NavHeader, Theme, Button} from "../../components";
import MultiSelectDropdown from "./MultiSelectDropdown";

type DropdownIsVisibleState = { dropdownIsVisible: boolean };

export class SelectPetButton extends React.Component {
  render() {
    return (
      <Button
        label={this.props.label}
        onPress={(event) => this.props.onPress(event, this.props.label)}
        full
        primary
      />
    );
  }
}

export default class DiagnosticTool extends React.Component<DropdownIsVisibleState> {
  state = {
    dropdownIsVisible: false
  }

  hideDropdown() {
    this.setState({ dropdownIsVisible: false });
  }

  showDropdown() {
    this.setState({ dropdownIsVisible: true });
  }

  selectSpecies = (event, species, onPressSpeciesButtonCallback) => {
    this.showDropdown();
  }

  render(): React.Node {
    const selectPetSpeciesMessage = <Text style={styles.message}>Please select the pet species you want to diagnose. </Text>;
    const { navigation } = this.props;
    
    return (
      <View style={styles.container}>
        <NavHeader title="Diagnostic Tool" {...{ navigation }} />
        <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
        <View style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="dog" size={Theme.typography.header1.fontSize} color={Theme.palette.white} style={styles.image} />
            <SelectPetButton
              label="Dog"
              onPress={this.selectSpecies}
            />
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="cat" size={Theme.typography.header1.fontSize} color={Theme.palette.white} style={styles.image} />
            <SelectPetButton
              label="Cat"
              onPress={this.selectSpecies}
            />
            </View>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="dove" size={Theme.typography.header1.fontSize} color={Theme.palette.white} style={styles.image} />
            <SelectPetButton
              label="Bird"
              onPress={this.selectSpecies}
            />
          </View>
        </View>
        <View style={styles.multiSelectContainer}>
          {this.state.dropdownIsVisible ? <MultiSelectDropdown /> : selectPetSpeciesMessage}
        </View>

        {/* <View style={styles.multiSelectContainer}>
          <MultiSelectDropdown />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  message: {
    color: Theme.palette.black,
    fontSize: 20,
    fontFamily: Theme.typography.semibold,
    textAlign: "center",
    marginBottom: Theme.spacing.base
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginVertical: Theme.spacing.base
  },
  image: {
    padding: 10,
  },
  iconContainer: {
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: Theme.spacing.base
  },
  multiSelectContainer: {
    padding: 10,
    alignSelf: "stretch",
  }
});
