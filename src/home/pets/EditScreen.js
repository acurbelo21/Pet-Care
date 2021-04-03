import autobind from "autobind-decorator";
import Firebase from "../../components/Firebase";
import React from 'react'
import type { ScreenParams } from "../../components/Types";
import { Card, Icon, Overlay, Badge } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
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
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {Text, Theme} from "../../components";
import { reduce } from "lodash";

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
  goBackToPets() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  @autobind
  switchSelected(species) {
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
  }

  switchSelectedSex(sex) {
    let turnOff = {
      isMale: false,
      isFemale: false,
    }

    turnOff[sex] = true;

    this.setState(
      turnOff
    );
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
          </View>
          <View style={styles.headerColumn}>
            <TouchableOpacity onPress={this.chooseFile}>
              <Image
                style={styles.userImage}
                source={{uri: avatar}}
              />
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
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
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
              <TouchableOpacity onPress={() => this.switchSelected("isDog")}>
                <FontAwesome5 name="dog" size={30} color="#0080ff" />
              </TouchableOpacity>
             }

             {this.state.isCat &&
              <TouchableOpacity onPress={() => this.switchSelected("isCat")}>
                <FontAwesome5 name="cat" size={30} color="#ffb347" /> 
              </TouchableOpacity>
              }

              {this.state.isBird &&
              <TouchableOpacity onPress={() => this.switchSelected("isBird")}>
                <FontAwesome5 name="dove" size={30} color="#c93335" />
              </TouchableOpacity>
              }

              {this.state.isHorse &&
              <TouchableOpacity onPress={() => this.switchSelected("isHorse")}>
                <FontAwesome5 name="horse" size={30} color="#0dbf0d" />
              </TouchableOpacity>
              }

              {this.state.isFish &&
              <TouchableOpacity onPress={() => this.switchSelected("isFish")}>
                <FontAwesome5 name="fish" size={30} color="#71b6f7" />
              </TouchableOpacity>
              }

              {this.state.isExotic &&
              <TouchableOpacity onPress={() => this.switchSelected("isExotic")}>
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
                  onChangeText={this.handleName}
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
                  onChangeText={this.handleName}
                  returnKeyType = 'done'
                  defaultValue = {this.state.age}
              /> 
            </View>

            <View style={styles.inputContainer}>
              <Text style={{
                padding: 5,
              }}>Sex:</Text>

              {this.state.isMale &&
              <TouchableOpacity onPress={() => this.switchSelectedSex("isMale")}>
                <FontAwesome5 name="mars" size={30} color="#009dff" /> 
              </TouchableOpacity>
              }
              {this.state.isFemale &&
              <TouchableOpacity onPress={() => this.switchSelectedSex("isFemale")}>
                <FontAwesome5 name="venus" size={30} color="#e75480" /> 
              </TouchableOpacity>
              }

              <View/>
              <View/>
              <View/>
              <View/>
              <View/>

            </View>

          </Card>
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
  btnPressNormal: {
    backgroundColor:"white",
  },
  btnPressSelected: {
    borderWidth:3,
    borderColor:'red',
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
    // borderColor: "red",
    // borderWidth: 3,
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