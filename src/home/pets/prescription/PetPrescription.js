import React, { Component, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, SectionList, TextInput, TouchableOpacity} from 'react-native';
import { Theme, NavHeaderWithButton, Text } from "../../../components";
import type { ScreenParams } from "../../components/Types";
import { LinearGradient } from "expo-linear-gradient";
import Firebase from "../../../components/Firebase";

export default class PetPrescription extends Component<ScreenParams<{ pet_uid: String }>, SettingsState> {
  constructor(props) {
    super(props);
    this.state = {
      role: 'v',
      pname:'',
      date: '',
      quantity: '',
      instructions: ''
    };

    const { uid } = Firebase.auth.currentUser;

    Firebase.firestore
    .collection("users")
    .doc(uid)
    .onSnapshot(docs => {
      this.state.role = docs.data().role;
    })
  }

  handlePname = (text) => {
    this.setState({ pname: text })
  }

  handleDate = (text) => {
    this.setState({ date: text })
  }
  
  handleQuantity = (text) => {
    this.setState({ quantity: text })
  }

  handleInstructions = (text) => {
      this.setState({ instructions: text })
  }
  
  submitChanges()
  {

  }

  render() {
    const { navigation } = this.props;
    
    return (
      <ScrollView style={styles.scroll} persistentScrollbar={false} >
        <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
        <NavHeaderWithButton title="Prescriptions" back {...{ navigation }} />

        
        {this.state.role == 'v' && <TextInput
          style = {styles.input}
          placeholder = "Prescription Name"
          returnKeyType = 'done'
          onChangeText = {this.handlePname}
          defaultValue = {this.state.pname}
        />}

        {this.state.role == 'v' && <TextInput
          style = {styles.input}
          placeholder = "Date"
          returnKeyType = 'done'
          onChangeText = {this.handleDate}
          defaultValue = {this.state.date}
        />}

        {this.state.role == 'v' && <TextInput
          style = {styles.input}
          returnKeyType = 'done'
          placeholder = "Quantity"
          keyboardType='number-pad'
          onChangeText = {this.handleQuantity}
          defaultValue = {this.state.quantity}
        />}

        {this.state.role == 'v' && <View style={styles.biggerInput}>
          <TextInput
            placeholder = "Instructions"
            returnKeyType = 'done'
            autoCapitalize = 'sentences'
            autoCorrect = {true}
            onChangeText = {this.handleInstructions}
            defaultValue = {this.state.instructions}
            multiline = {true}
          />
        </View>}

        {this.state.role == 'v' && <View style={{
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
        </View>}
        
        {this.state.role != 'v' && <View style={styles.prescriptionDetailContainer}>
          <SectionList
            sections={[
              { title: 'Prescription', data: this.state.pname},
              { title: 'Date', data: this.state.date},
              { title: 'Quantity', data: this.state.quantity},
              { title: 'Instructions', data: this.state.instructions}
            ]}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Text style={styles.item}>{item.pname}{item.date}{item.quantity}{item.instructions}</Text>}          
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
        </View>}

      </ScrollView>
    )
  }


}

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  input: {
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FAFAFA',
    margin: 12,
  },
  biggerInput: {
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FAFAFA',
    margin: 12,
    height: 100
  },
  submitButton:{
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#9dffb0',
    alignSelf: 'center',
    padding: 10,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: -500
  },
  prescriptionDetailContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#000',
  },
  item: {
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 15,
    padding: 10,
  },
  header: {
    backgroundColor: "#e0f4ff",
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 23,
    padding: 10,
    flexDirection: "row"
  },
});