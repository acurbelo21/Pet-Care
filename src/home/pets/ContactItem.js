PropTypes;
import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
const { width, height } = Dimensions.get('window');
import _ from 'lodash';
import PropTypes from 'prop-types';
export default class ListItem extends Component {
  // Generates a Hex Color for a string
  stringToHex(str) {
    if (!str) str = 'none';
    let hash = 0;
    for (var i = 0; i < str.length; i++)
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    let color = '#';
    for (var i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
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
    const {
      name,
      pic,
      color,
      seen,
      selected,
      key,
      id,
      species,
      onPressItem,
      breed
    } = this.props;
    // Console.log(" this.props: ",this.props);
    let speciesColor = '#33333';
    if (color) speciesColor = color;
    if (!color && species) speciesColor = this.colorOfPetCategory(this.props.species);
    // if (!color && species) speciesColor = this.stringToHex(this.props.species);
    return (
      <TouchableOpacity
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
        onPress={item => onPressItem(item)}
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
            {pic && (
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
  onPressItem: PropTypes.func,
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