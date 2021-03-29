import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import PetItem from './PetItem';
import faker from 'faker'; // makes fake data
import _ from 'lodash';
import Pagination,{Icon,Dot} from 'react-native-pagination';//{Icon,Dot} also available
import Firebase from "../../components/Firebase";
import {Text, NavHeaderWithButton, Theme, Button} from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import autobind from 'autobind-decorator';

//lets use faker to create mock data
// let MockPersonList = new _.times(35,(i)=>{
//   return {
//     id:i,
//     index:i,
//     name:faker.name.findName(),
//     pic:faker.internet.avatar(),
//     species:_.sample(["Cat","Dog","Bird","Horse","Fish","Exotic"]),
//     breed:faker.internet.email(),
//   }
// })

export default class Pets extends Component {

  @autobind
  buttonFn() {
    this.props.navigation.navigate("AddPets", { onSelect: this.onSelect, getData: () => this.retrieveFireStorePets() });
    // console.log("pressed");
  }

  constructor(props){
     super(props);
      this.state = {
        items: [],
        loading: true,
      };
    }

    componentWillMount(){
        this.retrieveFireStorePets();
    }

    componentWillUnmount() {
      this.willFocusSubscription.remove();
    }

  retrieveFireStorePets() {
    const { uid } = Firebase.auth.currentUser;
        let currentUsersPets = []

        Firebase.firestore
        .collection("pets")
        .where("owner_uid", "==", uid)
        .get()
        .then(docs => {
            var i = 0;
            docs.forEach(doc => {
                currentUsersPets.push(doc.data());
                currentUsersPets[i++].pet_uid = doc.id;
            })

            var j = 0;
            currentUsersPets.forEach(pet => {
                pet.id = j++;
            })
            this.setState({items:currentUsersPets, loading:false})
        })
  }

    //create each list item
  _renderItem = ({item}) => {
    const { navigation } = this.props;
    return (<PetItem index={item.id}
        pet_uid={item.pet_uid}
        name={item.name}
        pic={item.pic}
        breed={item.breed}
        species={item.species}
        {...{navigation}}
      />)
    };
    //pressed an item
//   onPressItem = (item) => console.log("onPressItem:item ",item);
    // onPressItem = (item) => console.log(Firebase.auth.currentUser)
    // onPressItem = (item) => console.log(MockPersonList)
    onPressItem = (item) => this.printStuffToConsole()

  //map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
  _keyExtractor = (item, index) => item.id.toString();

  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) =>this.setState({viewableItems})

  render() {
    const { buttonFn } = this;
    const { navigation } = this.props;

    if(this.state.loading)
    {
        return(
        <SafeAreaView style={[styles.container]}>
        <View style={{
            paddingTop: "40%",
            justifyContent:"center",
        }}>
            <ActivityIndicator size="large" />
        </View>
        </SafeAreaView>
        )
    }
    return (
      <View style={[styles.container]}>
      <NavHeaderWithButton title="My Pets" buttonFn={this.buttonFn} buttonIcon="plus" />
        <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
          <FlatList
            data={this.state.items}
            ref={r=>this.refs=r}//create refrence point to enable scrolling
            keyExtractor={this._keyExtractor}//map your keys to whatever unique ids the have (mine is a "id" prop)
            renderItem={this._renderItem}//render each item
            onViewableItemsChanged={this.onViewableItemsChanged}//need this
          />
          <Pagination
            // remove this to get rid of dots next to list
            // dotThemeLight //<--use with backgroundColor:"grey"
            listRef={this.refs}//to allow React Native Pagination to scroll to item when clicked  (so add "ref={r=>this.refs=r}" to your list)
            paginationVisibleItems={this.state.viewableItems}//needs to track what the user sees
            paginationItems={this.state.items}//pass the same list as data
            paginationItemPadSize={3} //num of items to pad above and below your visable items
          />
        </View>
      )
  }
};

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
    color: Theme.palette.white
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

AppRegistry.registerComponent('ReactNativePaginationExample', () => App);