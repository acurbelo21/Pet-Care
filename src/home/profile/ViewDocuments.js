import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Firebase from "../../components/Firebase";
import { Text, NavHeader, Theme, Button } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import { NavHeaderWithButton } from '../../components';
import * as DocumentPicker from 'expo-document-picker';

export default class ViewDocuments extends Component {
    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
    }

    constructor (props)
    {
        super(props);

        this.state = {
            loading: true,
            imagePath: require("../../../assets/PetCare.png"),
            isLoading: false,
            status: "",
        }
    }

    chooseFile = async () => {
        let result = await DocumentPicker.getDocumentAsync();

        if (result.type == "cancel"){
            console.log("canceled");
        }
        else {
            let path = result.uri;
            let documentName = this.getFileName(result.name, path);
            this.setState({ imagePath: path });
            this.uploadDocument(path, documentName);
            console.log(path);
            console.log(documentName);
        }
    }

    getFileName(name, path) {
        if (name != null) { return name; }
  
        if (Platform.OS === "ios") {
            path = "~" + path.substring(path.indexOf("/Documents"));
        }
        return path.split("/").pop();
    }

    uploadDocument = async (path, documentName) => {
        // const response = await fetch(path);
        // const blob = await response.blob();
    
        // const { uid } = Firebase.auth.currentUser;
    
        // var ref = Firebase.storage.ref().child("labResults/" + documentName);
        // let task = ref.put(blob);

        const { uid } = Firebase.auth.currentUser;
        var docRef = Firebase.firestore.collection("users").doc(uid);
        console.log(uid);
    
        docRef.get().then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    console.log("Exists");
                    Firebase.firestore.collection("users").doc(uid).update({
                        labResults: Firebase.firestore.FieldValue.arrayUnion(path)
                    })
                }
                else {
                    console.log("no exist");
                    Firebase.firestore.collection("users").doc(uid).set({
                        labResults: [path]
                    })
                }
            }).catch((e) => {
                status = 'Something went wrong';
                console.log('uploading document error => ', e);
                this.setState({ loading: false, status: 'Something went wrong' });
            });
        
        // task.then(() => {
        //     console.log('Document uploaded to the bucket!');
        //     this.setState({ loading: false, status: 'Document uploaded successfully' });
        //     ref.getDownloadURL().then(function(doc) {
        //         console.log(doc);
        //         Firebase.firestore
        //           .collection("users")
        //           .doc(uid)
        //           .update({
        //               labResults: Firebase.firestore.FieldValue.arrayUnion(doc)
        //           });
        //     }
        //     , function(error){
        //         console.log(error);
        //     });
        //     // this.goBackToPets();
        //     //this.retrieveFireStorePetDetails();
        // }).catch((e) => {
        //     status = 'Something went wrong';
        //     console.log('uploading document error => ', e);
        //     this.setState({ loading: false, status: 'Something went wrong' });
        // });
      }

    render() {
        const { navigation } = this.props;

        return (
            <View>
                <NavHeaderWithButton title="Documents" back {...{ navigation }} buttonFn={this.chooseFile} buttonIcon="plus" />
                <SafeAreaView>
                    <Text>View documents</Text>
                </SafeAreaView>
            </View>
        )
    }
}