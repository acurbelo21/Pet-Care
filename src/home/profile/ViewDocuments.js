import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import Firebase from "../../components/Firebase";
import { Text, NavHeaderWithButton, Theme, Button } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from 'expo-document-picker';
import PDFReader from 'rn-pdf-reader-js';
import ViewPager from '@react-native-community/viewpager';

export default class ViewDocuments extends Component {
    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            imagePath: require("../../../assets/PetCare.png"),
            isLoading: false,
            status: "",
            peepoPoopoo: []
        }
    }

    chooseFile = async () => {
        let result = await DocumentPicker.getDocumentAsync();

        if (result.type == "cancel") {
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
        const response = await fetch(path);
        const blob = await response.blob();

        const { uid } = Firebase.auth.currentUser;

        var ref = Firebase.storage.ref().child("labResults/" + documentName);
        let task = ref.put(blob);

        var docRef = Firebase.firestore.collection("users").doc(uid);
        let labResultFiles = [];

        // 1. array = []
        // 2. array.push (path) this.setState
        // 2. array.push (query results) this.setState with a query
        // 3. Update labResults with array


        // Keep our query
        // 1. Take our array
        // 2. Use ANOTHERRRRR forEach loop to update Firebase Storage with each file
        // 3. If statement to check if file exists in Firebase Storage?
        // labResultFiles.push(path);

        docRef.get().then(doc => {
            if (doc.data().labResults) {
                (doc.data().labResults).forEach((field) => {
                    labResultFiles.push(field)
                });
            }

            // Firebase.firestore.collection("users").doc(uid).update({
            //     labResults: labResultFiles
            // })

            // .catch((e) => {
            //     console.log('uploading document error => ', e);
            //     this.setState({ loading: false, status: 'Something went wrong' });
            // });
        })
            // IF SOMETHING BREAKS TRY TO REMOVE THIS .THEN RIGHT HERE ON LINE 92 AND THE BRACES ON 110
            .then(() => {
                task.then(() => {
                    console.log('Document uploaded to the bucket!');
                    this.setState({ loading: false, status: 'Document uploaded successfully' });
                    ref.getDownloadURL().then(function (pdf) {
                        console.log(pdf);
                        labResultFiles.push(pdf);

                        Firebase.firestore
                            .collection("users")
                            .doc(uid)
                            .update({ labResults: labResultFiles })
                    }
                        , function (error) {
                            console.log(error);
                        });
                    // this.goBackToPets();
                    //this.retrieveFireStorePetDetails();
                })
            }).catch((e) => {
                status = 'Something went wrong';
                console.log('uploading document error => ', e);
                this.setState({ loading: false, status: 'Something went wrong' });
            });
    }

    render() {
        const { navigation } = this.props;

        return (
            // <SafeAreaView
            // style={{
            //     width: Dimensions.get ('window'). width,
            //     height: Dimensions.get ('window'). height, backgroundColor:'#000'}}>
            // <NavHeaderWithButton title="Documents" back {...{ navigation }} buttonFn={this.chooseFile} buttonIcon="plus" />
            //     {/* <SafeAreaView> */}
            // <PDFReader
            //         source={{
            //         uri: 'https://drive.google.com/file/d/1Aozi9jTceIhrlJuzKVLuKjHhWiChc0dH/view?usp=sharing',
            //         }}
            //     />
            //     {/* </SafeAreaView> */}
            // </SafeAreaView>
            <View style={{ flex: 1 }}>
                <NavHeaderWithButton title="Lab Results" back {...{ navigation }} buttonFn={this.chooseFile} buttonIcon="plus" />
                <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
                <ViewPager style={styles.viewPager} initialPage={0}>
                    <View key="1">
                        <View style={styles.pdfReader}>
                            <PDFReader
                                source={{
                                    // uri: 'https://drive.google.com/file/d/1Aozi9jTceIhrlJuzKVLuKjHhWiChc0dH/view?usp=sharing',
                                    uri: 'https://drive.google.com/file/d/1Aozi9jTceIhrlJuzKVLuKjHhWiChc0dH/preview',
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.page} key="2">
                        <Text>Second page</Text>
                    </View>
                    <View style={styles.page} key="3">
                        <Text>Third page</Text>
                    </View>
                </ViewPager>
                <Text style={styles.text} type="large">Swipe → to view the next PDF.</Text>
            </View>
        )
    }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    viewPager: {
        flex: 1,
    },
    page: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: Theme.palette.black
    },
    text: {
        paddingVertical: Theme.spacing.base,
        textAlign: "center",
        fontSize: 21,
        color: Theme.palette.black
    },
    pdfReader: {
        height: height / 1.45,
        justifyContent: "space-around",
        paddingTop: Theme.spacing.base
    }
});