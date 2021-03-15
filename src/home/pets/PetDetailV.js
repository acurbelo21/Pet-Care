// import React from 'react';
// import { Dimensions, FlatList, Image, StyleSheet, SafeAreaView, View } from 'react-native';
// import Firebase from "../../components/Firebase";
// import type { ScreenParams } from "../../components/Types";
// import {Text, NavHeader, Theme, Button} from "../../components";
// import { FontAwesome5 } from '@expo/vector-icons';
// import { LinearGradient } from "expo-linear-gradient";

// export default class PetDetailView extends React.Component<ScreenParams<{ pet_uid: String }>, SettingsState> {
//     constructor(props){
//         super(props);
//          this.state = {
//            petDetails: "",
//          };
//        }

//     async componentDidMount(): Promise<void> {
//         const { navigation } = this.props;
//         const pet_uid  = navigation.state.params;

//         Firebase.firestore
//         .collection("pets")
//         .doc(pet_uid.pet_uid)
//         .get()
//         .then(doc => {
//             this.setState({petDetails: doc.data()});
//         })
//     }

//     render() {
//         const { navigation } = this.props;
//         var petIcon;
//         var speciesColor;

//         switch (this.state.petDetails.species) {
//             case "Cat":
//               petIcon = "cat";
//               speciesColor = "#ffb347";
//               break;
//             case "Dog":
//               petIcon = "dog";
//               speciesColor = "#0080ff";
//               break;
//             case "Bird":
//               petIcon = "dove";
//               speciesColor = "#c93335";
//               break;
//             case "Horse":
//               petIcon = "horse";
//               speciesColor = "#77dd77";
//               break;
//             case "Fish":
//               petIcon = "fish";
//               speciesColor = "#71b6f7";
//               break;
//             case "Exotic":
//               petIcon = "spider";
//               speciesColor = "#9379c2";
//               break;
//             default:
//               petIcon = "question";
//               speciesColor = "black";
//               break;
//           }

//         console.log(this.state.petDetails)
//         return (
//             <View>
//                 <NavHeader title={this.state.petDetails.name} back {...{ navigation }} />
//                 <SafeAreaView>
//                         <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
//                         {this.state.petDetails.pic == "null" && (
//                             <View style={styles.content}>
//                                 <View/>
//                                 <FontAwesome5 name={petIcon} size="100%" color={speciesColor} />
//                                 <View/>
//                             </View>
//                         )}
//                         {this.state.petDetails.pic  != "null" && (
//                             <Image
//                                 source={{ uri: this.state.petDetails.pic }}
//                                 resizeMode="contain"
//                                 style={{
//                                 height: 50,
//                                 width: 50,
//                                 margin: 8,
//                                 borderRadius: 15,
//                                 }}
//                             />
//                         )}
//                         <Text
//                         style={{
//                             fontSize: 20,
//                         }}>{this.state.petDetails.name}</Text>
//                         <Text
//                         style={{
//                             fontSize: 20,
//                         }}>{this.state.petDetails.species}</Text>
//                         <Text
//                         style={{
//                             fontSize: 20,
//                         }}>{this.state.petDetails.breed}</Text>
//                 </SafeAreaView>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//       backgroundColor: "white",
//       flex: 1,
//     },
//     content: {
//         height: 150,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingTop: 20,
//         backgroundColor: "white",
//     },
//     gradient: {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0
//     },
//     message: {
//       color: Theme.palette.black,
//       fontSize: 20,
//       fontFamily: Theme.typography.semibold,
//       textAlign: "center",
//       marginBottom: Theme.spacing.base
//     },
//     buttonContainer: {
//       justifyContent: "space-evenly",
//       flexDirection: "row",
//       marginVertical: Theme.spacing.base
//     },
//     image: {
//       padding: 10,
//       color: Theme.palette.white
//     },
//     iconContainer: {
//       justifyContent: "center",
//       flexDirection: "column",
//       marginHorizontal: Theme.spacing.base
//     },
//     multiSelectContainer: {
//       padding: 10,
//       alignSelf: "stretch",
//     }
//   });