import autobind from "autobind-decorator";
import Firebase from "../../components/Firebase";
import React from 'react'
import type { ScreenParams } from "../../components/Types";
import { Card, Icon } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {Text, Theme} from "../../components";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class EditScreen extends React.Component<ScreenParams<{ pet_uid: String }>, SettingsState> {
  constructor(props)
  {
    super(props);

    this.avatar = "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg";
    this.avatarBackground = "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg";
    this.state = {
      petDetails: "",
      loading: true,
      imagePath: require("../../../assets/PetCare.png"),
      isLoading: false,
      isDog: true,
      isCat: true,
      isBird: true,
      isFish: true,
      isHorse: true,
      isExotic: true,
      isMale: true,
      isFemale: true,
      isIndoors: true,
      isOutdoors: true,
      status: '',
      avatar: "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg",
      avatarBackground: "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg", 
      name: "Gina Mahdi",
      sex: "female",
      petBiology: {"species": "Miami", "breed": "Florida"},
      setOverlay: false,
    };

    const { uid } = Firebase.auth.currentUser;

    Firebase.firestore
      .collection("users")
      .doc(uid)
      .collection("pets")
      .onSnapshot(docs => {
        this.retrieveFireStorePetDetails();
      });
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
          yearsOwned: doc.data().yearsOwned, 
          weight: doc.data().weight,
          classification: doc.data().classification, 
          petBiology: {"species" : doc.data().species, "breed" : doc.data().breed},
          avatar: doc.data().pic,
          avatarBackground: doc.data().pic,
          sex: doc.data().sex,
        });

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

  @autobind
  updateFireStorePetDetails() {
    const { uid } = Firebase.auth.currentUser;
    const { navigation } = this.props;
    const pet_uid  = navigation.state.params;
    const { name, age, yearsOwned, sex, classification, weight} = this.state; 
    const { species, breed } = this.state.petBiology;

    Firebase.firestore
    .collection("users")
    .doc(uid)
    .collection("pets")
    .doc(pet_uid.pet_uid)
    .update({
      name, age, yearsOwned, sex, classification, weight, species, breed 
    })
  }

  chooseFile = async () => {
    this.setState({loading: true});
    let result = await ImagePicker.launchImageLibraryAsync();

    if (result.cancelled) {
      this.setState({loading: false});
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
        this.setState({ status: 'Image uploaded successfully' });
        ref.getDownloadURL().then(function(pic) {
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
  goBackToPets() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  @autobind
  deletePet() {
    Alert.alert(
      "Delete pet?",
      "Are you sure you want to delete this pet?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => this.deletingPet(), style:"destructive" }
      ]);
  }

  @autobind
  deletingPet()
  {
    const { navigation } = this.props;
    const { uid } = Firebase.auth.currentUser;
    const pet_uid  = navigation.state.params;

    Firebase.firestore
      .collection("users")
      .doc(uid)
      .collection("pets")
      .doc(pet_uid.pet_uid)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });

    console.log("Delete Pressed")
    navigation.navigate("Pets");
  }

  @autobind
  updatingSpecies(species) {
    let turnOff = {
      isDog: false,
      isCat: false,
      isBird: false,
      isFish: false,
      isHorse: false,
      isExotic: false,
    }

    turnOff[species] = true;

    this.setState(
      turnOff
    );

    switch(species){
      case("isDog"):
        this.setState({petBiology: {"species":"Dog", breed: this.state.petBiology.breed}});
        break;
      case("isCat"):
        this.setState({petBiology: {species: "Cat", breed: this.state.petBiology.breed}});
        break;
      case("isBird"):
        this.setState({petBiology: {species: "Bird", breed: this.state.petBiology.breed}});
        break;
      case("isFish"):
        this.setState({petBiology: {species: "Fish", breed: this.state.petBiology.breed}});
        break;
      case("isHorse"):
        this.setState({petBiology: {species: "Horse", breed: this.state.petBiology.breed}});
        break;
      case("isExotic"):
        this.setState({petBiology: {species: "Exotic", breed: this.state.petBiology.breed}});
        break;
    }
  }

  updateSex(sex) {
    let turnOff = {
      isMale: false,
      isFemale: false,
    }

    turnOff[sex] = true;

    this.setState(
      turnOff
    );

    if(sex=="isFemale") {
      this.setState({sex: "female"})
    }
    else {
      this.setState({sex: "male"})
    }
  }

  updateClassification(classification) {
    let turnOff = {
      isIndoors: false,
      isOutdoors: false,
    }
    
    turnOff[classification] = true;
    
    this.setState(
      turnOff
    );
      
    if(classification=="isOutdoors") {
      this.setState({classification: "Outdoors"})
    }
    else {
      this.setState({classification: "Indoors"})
    }
  } 

  handleName = (text) => {
    this.setState({name: text})
  }

  handleBreed = (text) => {
    this.setState({petBiology: {species: this.state.petBiology.species, breed: text}});
  }

  handleAge = (text) => {
    this.setState({age: text})
  }

  handleYearsOwned = (text) => {
    this.setState({yearsOwned: text})
  }

  handleWeight = (text) => {
    this.setState({weight: text})
  }

  @autobind
  submitChanges()
  {
    this.updateFireStorePetDetails();
    this.props.navigation.goBack();
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
              <TouchableOpacity onPress={this.deletePet}>
                  <View>
                      <Icon type="font-awesome-5" name="trash-alt" size={30} color="#C70000"/>
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
                  <Text style={{
                    alignSelf: "center",
                    color: "black",
                    fontSize: 20,
                  }}>Edit Image</Text>
            </TouchableOpacity>
         </View>
        </ImageBackground>
      </View>
    )
  }

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
          {this.renderHeader()}
          <Card containerStyle={styles.cardContainer}>
            <Text type="header3" style={styles.cardText}> Edit Information </Text>
            <View style={styles.inputContainer}>
              <Text style={{
                padding: 5,
              }}>Name:</Text>

              <TextInput
                  style={styles.input}
                  onChangeText={this.handleName}
                  returnKeyType = 'done'
                  defaultValue = {this.state.name}
              /> 
            </View>

            <View style={styles.inputContainer}>
              <Text style={{
                padding: 5,
              }}>Species:</Text>

              {this.state.isDog &&
              <TouchableOpacity onPress={() => this.updatingSpecies("isDog")}>
                <FontAwesome5 name="dog" size={30} color="#0080ff" />
              </TouchableOpacity>
             }

             {this.state.isCat &&
              <TouchableOpacity onPress={() => this.updatingSpecies("isCat")}>
                <FontAwesome5 name="cat" size={30} color="#ffb347" /> 
              </TouchableOpacity>
              }

              {this.state.isBird &&
              <TouchableOpacity onPress={() => this.updatingSpecies("isBird")}>
                <FontAwesome5 name="dove" size={30} color="#c93335" />
              </TouchableOpacity>
              }

              {this.state.isHorse &&
              <TouchableOpacity onPress={() => this.updatingSpecies("isHorse")}>
                <FontAwesome5 name="horse" size={30} color="#0dbf0d" />
              </TouchableOpacity>
              }

              {this.state.isFish &&
              <TouchableOpacity onPress={() => this.updatingSpecies("isFish")}>
                <FontAwesome5 name="fish" size={30} color="#71b6f7" />
              </TouchableOpacity>
              }

              {this.state.isExotic &&
              <TouchableOpacity onPress={() => this.updatingSpecies("isExotic")}>
                <FontAwesome5 name="spider" size={30} color="#9379c2" />
              </TouchableOpacity>
              }

              <View></View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={{
                padding: 5,
              }}>Breed:</Text>

              <TextInput
                  style={styles.input}
                  onChangeText={this.handleBreed}
                  returnKeyType = 'done'
                  defaultValue = {this.state.petBiology.breed}
              /> 
            </View>

            <View style={styles.inputContainer}>
              <Text style={{
                padding: 5,
              }}>Age:</Text>

              <TextInput
                  style={styles.input}
                  onChangeText={this.handleAge}
                  returnKeyType = 'done'
                  defaultValue = {this.state.age}
              /> 
            </View>

            <View style={styles.inputContainer}>
              <Text style={{
                padding: 5,
              }}>Years Owned:</Text>

              <TextInput
                  style={styles.input}
                  onChangeText={this.handleYearsOwned}
                  returnKeyType = 'done'
                  defaultValue = {this.state.yearsOwned}
              /> 
            </View>

            <View style={styles.inputContainer}>
              <Text style={{
                padding: 5,
              }}>Weight:</Text>

              <TextInput
                  style={styles.input}
                  onChangeText={this.handleWeight}
                  returnKeyType = 'done'
                  defaultValue = {this.state.weight}
              /> 
            </View>

            <View style={styles.inputContainer}>
              <Text style={{
                padding: 5,
              }}>Sex:</Text>

              {this.state.isMale &&
              <TouchableOpacity onPress={() => this.updateSex("isMale")}>
                <FontAwesome5 name="mars" size={30} color="#009dff" /> 
              </TouchableOpacity>
              }
              {this.state.isFemale &&
              <TouchableOpacity onPress={() => this.updateSex("isFemale")}>
                <FontAwesome5 name="venus" size={30} color="#e75480" /> 
              </TouchableOpacity>
              }

              <View/>
              <View/>
              <View/>
              <View/>
              <View/>

            </View>

            <View style={styles.inputContainer}>
              <Text style={{
                padding: 5,
              }}>Living Space:</Text>

              {this.state.isIndoors &&
              <TouchableOpacity onPress={() => this.updateClassification("isIndoors")}>
                <FontAwesome5 name="home" size={30} color="#71b6f7" /> 
              </TouchableOpacity>
              }
              {this.state.isOutdoors &&
              <TouchableOpacity onPress={() => this.updateClassification("isOutdoors")}>
                <FontAwesome5 name="tree" size={30} color="#0dbf0d" /> 
              </TouchableOpacity>
              }

              <View/>
              <View/>
              <View/>
              <View/>
              <View/>

            </View>

          </Card>
          
          <View style={{
            alignItems:"center",
            paddingTop: 15,
          }}>
          <TouchableOpacity
              style={styles.submitButton}
              onPress={this.submitChanges}
            >
                <Text>
                  Submit Changes
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
  side: {
      width: 80,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
    paddingTop: 10,
  },
  cardText: {
    flexDirection: "row",
    alignSelf: "center",
  },
  container: {
    flex: 1,
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
  input: {
    backgroundColor: "#FAFAFA",
    width: width - 70,
    right:0,
  },
  inputContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navContent: {
    marginTop: Platform.OS === "ios" ? 0 : 20,
    height: 57,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
  scroll: {
    backgroundColor: '#FFF',
  },
  submitButton:{
    backgroundColor: '#9dffb0',
    alignSelf: 'center',
    padding: 10,
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
})