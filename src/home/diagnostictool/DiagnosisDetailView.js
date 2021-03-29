import autobind from "autobind-decorator";
import Firebase from "../../components/Firebase";
import React, { Component } from 'react'
import type { ScreenParams } from "../../components/Types";
import { NavHeader } from "../../components";
import { Card, Icon } from 'react-native-elements'
import {
  ActivityIndicator,
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

import Email from '../pets/Email'
import Separator from '../pets/Separator'
import Tel from '../pets/Tel'
import { reduce } from "lodash";

export default class PetDetailView extends React.Component<ScreenParams<{ diagnosis_id: String }>, SettingsState> {
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
    //   loading: true,
      avatar: "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg",
      avatarBackground: "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg", 
      name: "Gina Mahdi",
    //   petBiology: {"species": "Miami", "breed": "Florida"}
    petBiology: {"species": "Details...", "breed": ""}
    };
  }

//   async componentDidMount(): Promise<void> {
//     const { navigation } = this.props;
//     const diagnosis_id  = navigation.state.params;
        // USE THIS ONE ^ FOR RETRIEVING DISEASE NAME, SET THIS.STATE.NAME BASED ON DAT ONE WITH SWITCH MAYHAPS,
        // OR PASS IN NAME PROP INSTEAD OF ID

//     Firebase.firestore
//     .collection("pets")
//     .doc(diagnosis_id.diagnosis_id)
//     .get()
//     .then(doc => {
//         this.setState({
//           petDetails: doc.data(), 
//           name: doc.data().name,
//           petBiology: {"species" : doc.data().species, "breed" : doc.data().breed}
//         });

//         switch (this.state.petDetails.species) {
//             case "Cat":
//               this.setState({
//                 avatar: "https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg",
//                 avatarBackground: "https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg"
//               })
//               break;
//             case "Dog":
//               this.setState({
//                 avatar: "https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg",
//                 avatarBackground: "https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg"
//               })
//               break;
//             case "Bird":
//               this.setState({
//                 avatar: "https://static.scientificamerican.com/sciam/cache/file/7A715AD8-449D-4B5A-ABA2C5D92D9B5A21_source.png",
//                 avatarBackground: "https://static.scientificamerican.com/sciam/cache/file/7A715AD8-449D-4B5A-ABA2C5D92D9B5A21_source.png"
//               })
//               break;
//             case "Horse":
//               this.setState({
//                 avatar: "https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//                 avatarBackground: "https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
//               })
//               break;
//             case "Fish":
//               this.setState({
//                 avatar: "https://images.immediate.co.uk/production/volatile/sites/4/2009/07/GettyImages-931270318-43ab672.jpg?quality=90&resize=940%2C400",
//                 avatarBackground: "https://images.immediate.co.uk/production/volatile/sites/4/2009/07/GettyImages-931270318-43ab672.jpg?quality=90&resize=940%2C400"
//               })
//               break;
//             case "Exotic":
//               this.setState({
//                 avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Male_Green_Iguana_Belize.jpg/220px-Male_Green_Iguana_Belize.jpg",
//                 avatarBackground: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Male_Green_Iguana_Belize.jpg/220px-Male_Green_Iguana_Belize.jpg"
//               })
//               break;
//             default:
//               this.setState({
//                 avatar: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
//               })
//               break;
//           }
//           this.setState({loading: false,})
//     })
//   }

//   @autobind
//   goBackToPets() {
//     const { navigation } = this.props;
//     navigation.goBack();
//   }

//   @autobind
//   goToLabResults() {
//     const { navigation } = this.props;
//     navigation.navigate("LabResults");
//   }

//   @autobind
//   goToTrainingScreen() {
//     const { navigation } = this.props;
//     navigation.navigate("TrainingScreen");
//   }

//   onPressPlace = () => {
//     console.log('place')
//   }

//   onPressTel = number => {
//     Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
//   }

//   onPressSms = () => {
//     console.log('sms')
//   }

//   onPressEmail = email => {
//     Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
//       console.log('Error:', err)
//     )
//   }

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      petBiology: { species, breed },
    } = this.state

//     <ImageBackground
//     style={styles.headerBackgroundImage}
//     blurRadius={10}
//     source={{uri: avatarBackground}}
//   >
//     <View style={styles.side}>
//       <TouchableOpacity onPress={this.goBackToPets}>
//           <View style={styles.back}>
//               <Icon name="chevron-left" size={50} color="white" />
//           </View>
//       </TouchableOpacity>
//     </View>
//     <View style={styles.headerColumn}>
//       <Image
//         style={styles.userImage}
//         source={{uri: avatar}}
//       />

    return (
      <View style={styles.headerContainer}>
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="paw"
                  underlayColor="transparent"
                  type="font-awesome-5"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              {/* <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {species}, {breed}
                </Text>
              </View> */}
            </View>
          </View>
    //     </ImageBackground>
    //   </View>
    )
  }

  renderTel = () => (
      <>
    <Text style={Theme.typography.header2}>   Contact Vet Now</Text>
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
    </>
  )

  renderDescription = () => {
    return(
        <>
            <Text style={Theme.typography.header2}>Canine Distemper</Text>
            <Text style={Theme.typography.header3}>Description</Text>
            <Text>
                Canine distemper should sound familiar to you if your dog is up-to-date on his vaccinations. 
                Veterinarians consider the distemper vaccine to be a core vaccination, 
                along with the parvovirus, canine adenovirus, and rabies vaccines. {"\n"}
                {"\n"}The disease is highly contagious and potentially lethal. A paramyxovirus causes distemper in dogs, 
                and it is closely related to the measles and rinderpest viruses. It causes severe illness in the host by 
                attacking multiple body systems, resulting in a widespread infection that is difficult to treat.{"\n"}
            </Text>
        </>
    )
}

//   renderEmail = () => (
//     <FlatList
//       contentContainerStyle={styles.emailContainer}
//       data={this.emails}
//       renderItem={(list) => {
//         const { email, id, name } = list.item

//         return (
//           <Email
//             key={`email-${id}`}
//             index={list.index}
//             name={name}
//             email={email}
//             onPressEmail={this.onPressEmail}
//           />
//         )
//       }}
//     />
//   )

renderEmail = () => {
    return(
        <>
            <Text style={Theme.typography.header3}>Symptoms</Text>
            <Text>
            Distemper dogs experience a wide range of symptoms depending on how advanced the disease is in their bodies. {"\n"}
            {"\n"}Once a dog becomes infected, the virus initially replicates in the lymphatic tissue of the respiratory 
            tract before moving on to infect the rest of the dog’s lymphatic tissue, the respiratory tract, the GI tract, 
            the urogenital epithelium, the central nervous system, and optic nerves. This results in two stages of symptoms.
            {"\n"}
            </Text>
        </>
    )
}

renderStageOne = () => {
    return(
        <>
            <Text style={Theme.typography.header3}>Stage One: </Text>
            <Text>
                The first symptom of distemper in dogs is usually watery to pus-like discharge from his eyes, 
                followed by fever, loss of appetite, and clear nasal discharge. {"\n\n"}Most dogs develop a fever 
                approximately 3-to-6 days after being infected, but the initial symptoms depend on the severity 
                of the case and how the patient reacts to it. In general, the symptoms associated with distemper 
                in dogs during the first stages of infection are:
                {"\n"}• Fever
                {"\n"}• Clear nasal discharge
                {"\n"}• Purulent eye discharge
                {"\n"}• Lethargy
                {"\n"}• Anorexia
                {"\n"}• Coughing
                {"\n"}• Vomiting
                {"\n"}• Diarrhea
                {"\n"}• Pustular dermatitis (rarely)
                {"\n"}• Inflammation of the brain and spinal cord
            </Text>
            <Text>
                {"\n"}• If a dog infected with distemper survives the acute stage of the illness, he may also develop 
                hyperkeratosis of the paw pads and nose, which gives distemper the nickname “hard pad disease.” 
                This distemper symptom causes the pads of a dog’s feet to harden and enlarge and is uncomfortable.
            </Text>
            <Text>
                {"\n"}• One of the other risks associated with distemper in dogs is a secondary bacterial infection 
                that attacks when a dog’s immune system is compromised by the distemper virus. Secondary bacterial 
                infections can cause respiratory and GI symptoms, including:
                {"\n"}• Vomiting
                {"\n"}• Diarrhea
                {"\n"}• Difficulty breathing
                {"\n"}• Change in respiratory rate
                {"\n"}• Pneumonia{"\n"}
            </Text>
        </>
    )
}

renderStageTwo = () => {
    return(
        <>
            <Text style={Theme.typography.header3}>Stage Two: </Text>
            <Text>
                Some dogs develop neurological signs as the disease progresses and attacks the central nervous system. 
                These signs are particularly disturbing for owners.
                {"\n"}• Head tilt
                {"\n"}• Circling
                {"\n"}• Partial or full paralysis
                {"\n"}• Seizures
                {"\n"}• Nystagmus (repetitive eye movements)
                {"\n"}• Muscle twitching
                {"\n"}• Convulsions with increased salivation and chewing motions
                {"\n"}• Death
                {"\n"}• Distemper in dogs presents with some or all of these symptoms, depending on the severity 
                of the case. According to the American Veterinary Medical Association (AVMA), “distemper is often 
                fatal, and dogs that survive usually have permanent, irreparable nervous system damage.”{"\n"}
            </Text>
        </>
    )
}

renderTreatment = () => {
    return(
        <>
            <Text style={Theme.typography.header3}>Treatment: </Text>
            <Text>
                • There is no cure for canine distemper. Veterinarians diagnose distemper 
                through a combination of clinical signs and diagnostic tests, or through a 
                postmortem necropsy. Once diagnosed, care is purely supportive. Veterinarians 
                treat the diarrhea, vomiting, and neurological symptoms, prevent dehydration, and 
                try to prevent secondary infections. Most vets recommend that dogs be hospitalized and 
                separated from other dogs to prevent the spread of infection.

                {"\n\n"}• The survival rate and length of infection depend on the strain of the virus 
                and on the strength of the dog’s immune system. Some cases resolve as quickly as 10 
                days. Other cases may exhibit neurological symptoms for weeks and even months afterward.
                {"\n"}
            </Text>
        </>
    )
}

renderPrevention = () => {
    return(
        <>
            <Text style={Theme.typography.header3}>Prevention: </Text>
            <Text>
                Canine distemper is entirely preventable. There are several things you can do to prevent distemper in dogs:
                {"\n"}• Make sure your puppy gets the full series of distemper vaccinations
                {"\n"}• Keep distemper vaccinations up-to-date throughout your dog’s life and avoid any gaps in vaccinations
                {"\n"}• Keep your dog away from infected animals and wildlife
                {"\n"}• Vaccinate pet ferrets for distemper
                {"\n"}• Be careful socializing your puppy or unvaccinated dog, especially in areas where dogs congregate, 
                like dog parks, classes, and doggy day care

                {"\n\n"}By following these steps, you can keep your dog safe from distemper. 
                If you have more questions about distemper in dogs, talk to your veterinarian, 
                and call your vet immediately if you suspect your dog might be showing symptoms of distemper. {"\n"}

            </Text>
        </>
    )
}

  render():React.Node {
    const { navigation } = this.props;

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
        <NavHeader title="Diagnosed Disease Details" back {...{ navigation }} />
          <Card containerStyle={styles.cardContainer}>
            {/* {this.renderHeader()} */}
            {this.renderDescription()}
            {Separator()}
            {this.renderEmail()}
            {Separator()}
            {this.renderStageOne()}
            {Separator()}
            {this.renderStageTwo()}
            {Separator()}
            {this.renderTreatment()}
            {Separator()}
            {this.renderPrevention()}
            {Separator()}
            {this.renderTel()}
          </Card>
          {/* <View style={styles.labContainer}>
            <TouchableOpacity
              style={styles.labButton}
              onPress={this.goToLabResults}
            >
                <Text>
                  Contact Vet Now
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
          <View style={{height:150}}/> */}
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
      width: 30,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
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
    flex: 1,
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

