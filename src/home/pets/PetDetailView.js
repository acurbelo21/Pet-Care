import autobind from "autobind-decorator";
import Firebase from "../../components/Firebase";
import React, { Component, useState } from 'react'
import type { ScreenParams } from "../../components/Types";
import { Card, Icon, Overlay, Badge } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
// import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import {Text, Theme} from "../../components";

import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'
import { reduce } from "lodash";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class PetDetailView extends React.Component<ScreenParams<{ pet_uid: String }>, SettingsState> {
  constructor(props)
  {
    super(props);

    this.avatar = "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg";
    this.avatarBackground = "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg";
    this.name = "Gina Mahdi"
    this.address = {"city": "Miami", "country": "Florida"};
    this.tels = [
      { "id": 1, "name": "Office", "number": "+66 (089)-928-2134" },
      { "id": 2, "name": "Work", "number": "+41 (112)-435-9887" }
    ];
    this.emails = [
      { "id": 1, "name": "Personal", "email": "petcare@gmail.com" },
      { "id": 2, "name": "Work", "email": "customersupport@petcare.com" }
    ];
    this.state = {
      petDetails: "",
      loading: true,
      imagePath: require("../../../assets/PetCare.png"),
      isLoading: false,
      status: '',
      avatar: "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg",
      avatarBackground: "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg", 
      name: "Gina Mahdi",
      petBiology: {"species": "Miami", "breed": "Florida"},
      setOverlay: false,
    };
  }

  async componentDidMount(): Promise<void> {
    this.retrieveFireStorePetDetails();
  }

  @autobind
  retrieveFireStorePetDetails() {
    const { uid } = Firebase.auth.currentUser;
    const { navigation } = this.props;
    const pet_uid  = navigation.state.params;

    Firebase.firestore
    .collection("users")
    .doc(uid)
    .collection("pets")
    .doc(pet_uid.pet_uid)
    .get()
    .then(doc => {
        this.setState({
          petDetails: doc.data(), 
          name: doc.data().name,
          age: doc.data().age,
          petBiology: {"species" : doc.data().species, "breed" : doc.data().breed},
          avatar: doc.data().pic,
          avatarBackground: doc.data().pic,
        });

        console.log(doc.data());

        if(doc.data().pic == "null")
        {
          switch (this.state.petDetails.species) {
              case "Cat":
                this.setState({
                  avatar: "https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg",
                  avatarBackground: "https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg"
                })
                break;
              case "Dog":
                this.setState({
                  avatar: "https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg",
                  avatarBackground: "https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg"
                })
                break;
              case "Bird":
                this.setState({
                  avatar: "https://static.scientificamerican.com/sciam/cache/file/7A715AD8-449D-4B5A-ABA2C5D92D9B5A21_source.png",
                  avatarBackground: "https://static.scientificamerican.com/sciam/cache/file/7A715AD8-449D-4B5A-ABA2C5D92D9B5A21_source.png"
                })
                break;
              case "Horse":
                this.setState({
                  avatar: "https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                  avatarBackground: "https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                })
                break;
              case "Fish":
                this.setState({
                  avatar: "https://images.immediate.co.uk/production/volatile/sites/4/2009/07/GettyImages-931270318-43ab672.jpg?quality=90&resize=940%2C400",
                  avatarBackground: "https://images.immediate.co.uk/production/volatile/sites/4/2009/07/GettyImages-931270318-43ab672.jpg?quality=90&resize=940%2C400"
                })
                break;
              case "Exotic":
                this.setState({
                  avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Male_Green_Iguana_Belize.jpg/220px-Male_Green_Iguana_Belize.jpg",
                  avatarBackground: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Male_Green_Iguana_Belize.jpg/220px-Male_Green_Iguana_Belize.jpg"
                })
                break;
              default:
                this.setState({
                  avatar: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
                  avatarBackground: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
                })
                break;
            }
          }
          this.setState({loading: false,})
    })
  }

  chooseFile = async () => {
    this.setState({loading: true});
    let result = await ImagePicker.launchImageLibraryAsync();

    if (result.cancelled) {
      this.setState({loading: false});
      console.log('User cancelled image picker');
      // console.log('User cancelled image picker', Firebase.storage);
    } else if (result.error) {
        console.log('ImagePicker Error: ', result.error);
    } else if (result.customButton) {
        console.log('User tapped custom button: ', result.customButton);
    } else {
        let path = result.uri;
        let imageName = this.getFileName(result.fileName, path);
        this.setState({ imagePath: path });
        this.uploadImage(path, imageName);
    }
  }

  uploadImage = async (path, imageName) => {
    const response = await fetch(path);
    const blob = await response.blob();

    const { uid } = Firebase.auth.currentUser;
    const pet_uid  = this.props.navigation.state.params;

    var ref = Firebase.storage.ref().child("petPictures/" + imageName);
    let task = ref.put(blob);

    task.then(() => {
        console.log('Image uploaded to the bucket!');
        this.setState({ status: 'Image uploaded successfully' });
        ref.getDownloadURL().then(function(pic) {
            console.log(pic);
            Firebase.firestore
              .collection("users")
              .doc(uid)
              .collection("pets")
              .doc(pet_uid.pet_uid)
              .update({pic})
        }
        , function(error){
            console.log(error);
        });
        this.retrieveFireStorePetDetails()
          .then(this.setState({loading: false}));
        // this.goBackToPets();
    }).catch((e) => {
        status = 'Something went wrong';
        console.log('uploading image error => ', e);
        this.setState({ loading: false, status: 'Something went wrong' });
    });
  }

  getFileName(name, path) {
      if (name != null) { return name; }

      if (Platform.OS === "ios") {
          path = "~" + path.substring(path.indexOf("/Documents"));
      }
      return path.split("/").pop();
  }

  @autobind
  toggleOverlay() {
    this.setState({"setOverlay":!this.state.setOverlay});
  }

  @autobind
  goBackToPets() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  @autobind
  goToLabResults() {
    const { navigation } = this.props;
    navigation.navigate("LabResults");
  }

  @autobind
  goToTrainingScreen() {
    const { navigation } = this.props;
    navigation.navigate("TrainingScreen");
  }

  onPressPlace = () => {
    console.log('place')
  }

  onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  }

  onPressSms = () => {
    console.log('sms')
  }

  onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      petBiology: { species, breed },
    } = this.state

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: avatarBackground}}
        >
          <View style={styles.navContent}>
            <View style={styles.side}>
              <TouchableOpacity onPress={this.goBackToPets}>
                  <View>
                      <Icon name="chevron-left" size={50} color="white" />
                  </View>
              </TouchableOpacity>
            </View>
            <View style={styles.side}>
              <TouchableOpacity onPress={this.goBackToPets}>
                  <View>
                      <Icon type="font-awesome-5" name="edit" size={40} color="white" />
                  </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerColumn}>
            <TouchableOpacity onPress={this.chooseFile}>
              <Image
                style={styles.userImage}
                source={{uri: avatar}}
              />
            </TouchableOpacity>
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="paw"
                  underlayColor="transparent"
                  type="font-awesome-5"
                  iconStyle={styles.placeIcon}
                  onPress={this.toggleOverlay}
                />
              </View>
              <Overlay isVisible={this.state.setOverlay} onBackdropPress={this.toggleOverlay}>
              <Card containerStyle={styles.overlayContainer}>
                  {this.renderTel()}
                  {Separator()}
                  {this.renderEmail()}
                </Card>
             </Overlay>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {species}, {breed}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderTel = () => (
    <FlatList
      contentContainerStyle={styles.telContainer}
      data={this.tels}
      renderItem={(list) => {
        const { id, name, number } = list.item

        return (
          <Tel
            key={`tel-${id}`}
            index={list.index}
            name={name}
            number={number}
            onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
          />
        )
      }}
    />
  )

  renderEmail = () => (
    <FlatList
      contentContainerStyle={styles.emailContainer}
      data={this.emails}
      renderItem={(list) => {
        const { email, id, name } = list.item

        return (
          <Email
            key={`email-${id}`}
            index={list.index}
            name={name}
            email={email}
            onPressEmail={this.onPressEmail}
          />
        )
      }}
    />
  )

  render():React.Node {
    if(this.state.loading)
    {
        return(
        <ScrollView style={[styles.container]}>
          <View style={{
              paddingTop: "40%",
              justifyContent:"center",
          }}>
              <ActivityIndicator size="large" />
          </View>
        </ScrollView>
        )
    }
    else {
    return (
      <ScrollView contentContainerStyle={styles.scroll} persistentScrollbar={false} >
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {/* {this.renderTel()}
            {Separator()}
            {this.renderEmail()} */}
            <Text type="header3" style={styles.cardText}> Pet Information </Text>
            <Text> Age: {this.state.age}</Text>
            <Text> Years owned: </Text>
            <Text> Where is the pet kept? </Text>
          </Card>
          <View style={styles.labContainer}>
            <TouchableOpacity
              style={styles.labButton}
              onPress={this.goToLabResults}
            >
                <Text>
                  View {this.state.petDetails.name}'s Lab Results
                </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.labButton}
              onPress={this.goToTrainingScreen}
            >
                <Text>
                  View training videos on {this.state.petDetails.breed}s
                </Text>
            </TouchableOpacity>
          </View>
          <View style={{height:300}}/>
        </View>
      </ScrollView>
    )
    }
  }
}

const styles = StyleSheet.create({
  topContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    borderColor: Theme.palette.borderColor,
    borderBottomWidth: Platform.OS === "ios" ? 0 : 1,
    zIndex: 10000,
    backgroundColor: "white",
  },
  side: {
      width: 80,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  cardText: {
    flexDirection: "row",
    alignSelf: "center",
  },
  overlayContainer: {
    backgroundColor: '#FFF',
    width: width - 100,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  labButton:{
    backgroundColor: '#9dffb0',
    alignSelf: 'center',
    padding: 10,
  },
  labContainer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
  },
  navContent: {
    marginTop: Platform.OS === "ios" ? 0 : 20,
    height: 57,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
  placeIcon: {
    color: 'white',
    fontSize: 26,
    paddingRight: 5,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})