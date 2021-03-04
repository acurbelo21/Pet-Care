PropTypes;
import autobind from "autobind-decorator";
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import { NavigationEvents } from "react-navigation";

export default class ListItem extends Component {

  @autobind
  goToPetDetailView() {
      const pet_uid = this.props.pet_uid
      this.props.navigation.navigate("PetDetailView",  { pet_uid } );
  }

  colorOfPetCategory(str) {
    switch(str) {
        case "Cat":
            return "#ffb347";
            break;
        case "Dog":
            return "#0080ff";
            break;
        case "Bird":
            return "#c93335";
            break;
        case "Horse":
            return "#77dd77";
            break;
        case "Fish":
            return "#71b6f7";
            break;
        case "Exotic":
            return "#9379c2";
            break;
        default:
            return "black";
            break;
    }
  }

  render() {
    const { name, pic, color, seen, selected, key, id, species, breed, pet_uid } = this.props;
    let speciesColor = '#33333';
    if (color) speciesColor = color;
    if (!color && species) speciesColor = this.colorOfPetCategory(this.props.species);
    var petIcon;

    switch (species) {
        case "Cat":
            petIcon = "cat";
            break;
        case "Dog":
            petIcon = "dog";
            break;
        case "Bird":
            petIcon = "dove";
            break;
        case "Horse":
            petIcon = "horse";
            break;
        case "Fish":
            petIcon = "fish";
            break;
        case "Exotic":
            petIcon = "spider";
            break;
        default:
            petIcon = "question";
            break;
    }

    return (
      <TouchableOpacity
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
        onPress={this.goToPetDetailView}
      >
        <View
          style={{
            paddingBottom: 15,
            paddingTop: 15,
            flex: 1,
            width,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: '#e3e3e3'
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                borderRadius: 5,
                borderWidth: 2,
                borderColor: speciesColor,
                backgroundColor: speciesColor,
                alignSelf: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  padding: 1,
                  textAlign: 'center',
                  fontWeight: '600',
                  color: '#fff',
                  fontSize: 14
                }}
              >
                {species}
              </Text>
            </View>
            {pic == "null" && (
            <View 
            resizeMode="contain"
            style={{
                height: 50,
                width: 50,
                margin: 8,
                borderRadius: 25,
                backgroundColor: '#f8f8f8'
              }}>
              <FontAwesome5 name={petIcon} size="40%" color={speciesColor}/>
             </View>
            )}
            {pic != "null" && (
              <Image
                source={require('../../../assets/OMEGAPOGGERS.png')}
                resizeMode="contain"
                style={{
                  height: 50,
                  width: 50,
                  margin: 8,
                  borderRadius: 25,
                  backgroundColor: '#f8f8f8'
                }}
              />
            )}
          </View>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 210
              }}
            >
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 40,
                  color: speciesColor
                }}
              >
                {name}
              </Text>
            </View>
            {breed && (
              <Text
                style={{
                  height: 35,
                  fontSize: 20,
                  fontWeight: '300',
                  color: speciesColor
                }}
              >
                {' '}
                {breed}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
ListItem.propTypes = {
  // Selected:PropTypes.bool,
  seen: PropTypes.bool,
  name: PropTypes.string,
  pic: PropTypes.string,
  species: PropTypes.string,
  createspeciesColor: PropTypes.bool
};
ListItem.DefaultProps = {
  /*
   * Name:PropTypes.string,
   * pic:PropTypes.string,
   * species:"",
   */
  selected: false,
  createspeciesColor: true
};