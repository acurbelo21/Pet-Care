import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, FlatList, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import ContactItem from './ContactItem';
import faker from 'faker';//assuming you have this.
import _ from 'lodash';
import Pagination,{Icon,Dot} from 'react-native-pagination';//{Icon,Dot} also available
import Firebase from "../../components/Firebase";
import { FontAwesome5 } from '@expo/vector-icons';


//lets use faker to create mock data
let MockPersonList = new _.times(35,(i)=>{
  return {
    id:i,
    index:i,
    name:faker.name.findName(),
    pic:faker.internet.avatar(),
    species:_.sample(["Cat","Dog","Bird","Horse","Fish","Exotic"]),
    breed:faker.internet.email(),
  }
})

export default class Pets extends Component {

  constructor(props){
     super(props);
      this.state = {
        items: [],
        loading: true,
      };
    }

    componentDidMount(){
        const { uid } = Firebase.auth.currentUser;
        let currentUsersPets = []

        Firebase.firestore
        .collection("pets")
        .where("owner-uid", "==", uid)
        .get()
        .then(docs => {
            var i = 0;
            docs.forEach(doc => {
                currentUsersPets.push(doc.data())
            })
            currentUsersPets.forEach(pet => {
                pet.id = i++;
            })
            console.log(currentUsersPets)
            this.setState({items:currentUsersPets, loading:false})
        })
        console.log("Heya")
    }
    //create each list item
  _renderItem = ({item}) => {
    return (<ContactItem index={item.id}
        onPressItem={this.onPressItem}
        name={item.name}
        pic={item.pic}
        breed={item.breed}
        species={item.species}
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
    if(this.state.loading)
    {
        return(
        <SafeAreaView style={[s.container]}>
            <Text style={{
                fontWeight: "600",
                fontSize: "20",
                padding: 20,
            }}>My Pets</Text>
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
      <SafeAreaView style={[s.container]}>
          <Text style={{
              fontWeight: "600",
              fontSize: "20",
              padding: 20,
          }}>My Pets</Text>
          <FlatList
            data={this.state.items}
            ref={r=>this.refs=r}//create refrence point to enable scrolling
            keyExtractor={this._keyExtractor}//map your keys to whatever unique ids the have (mine is a "id" prop)
            renderItem={this._renderItem}//render each item
            onViewableItemsChanged={this.onViewableItemsChanged}//need this
          />

          <Pagination
            // dotThemeLight //<--use with backgroundColor:"grey"
            listRef={this.refs}//to allow React Native Pagination to scroll to item when clicked  (so add "ref={r=>this.refs=r}" to your list)
            paginationVisibleItems={this.state.viewableItems}//needs to track what the user sees
            paginationItems={this.state.items}//pass the same list as data
            paginationItemPadSize={3} //num of items to pad above and below your visable items
          />
        </SafeAreaView>
      )
  }
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"grey",//<-- use with "dotThemeLight"
  },
});

AppRegistry.registerComponent('ReactNativePaginationExample', () => App);

// // @flow
// import * as React from "react";
// import {StyleSheet, Dimensions, View} from "react-native";
// import Constants from "expo-constants";
// import {LinearGradient} from "expo-linear-gradient";

// import {Text, Theme} from "../../components";

// type SlideProps = {
//     title: string,
//     description: string,
//     icon: React.Element<*>
// };

// export default class Pets extends React.PureComponent<SlideProps> {

//     render(): React.Node {
//         const {title, description, icon} = this.props;

//         const handlePress = () => console.log("Text pressed");

//         return (
//             <View>
//                 <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient}>
//                     <View style={styles.slide}>
//                         w
//                         <View style={styles.iconContainer}>{icon}</View>
//                     </View>
//                 </LinearGradient>
//                 <View style={styles.description}>
//                     <Text>{description}</Text>
//                 </View>
//             </View>
//         );
//     }
// }

// const {height} = Dimensions.get("window");
// const styles = StyleSheet.create({
//     slide: {
//         paddingHorizontal: Theme.spacing.base * 2,
//         paddingBottom: Theme.spacing.base * 2,
//         paddingTop: (Theme.spacing.base * 2) + Constants.statusBarHeight,
//         flexGrow: 1
//     },
//     title: {
//         color: Theme.palette.white
//     },
//     description: {
//         position: "absolute",
//         top: height * 0.62,
//         left: 0,
//         right: 0,
//         height: height - (height * 0.62) - 45,
//         paddingHorizontal: Theme.spacing.base * 2,
//         justifyContent: "center"
//     },
//     gradient: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         height: height * 0.62
//     },
//     iconContainer: {
//         flexGrow: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     }
// });
