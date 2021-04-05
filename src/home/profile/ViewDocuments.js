import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import Firebase from "../../components/Firebase";
import { Text, NavHeaderWithButton, Theme, Button } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import * as DocumentPicker from 'expo-document-picker';
import PDFReader from 'rn-pdf-reader-js';
import ViewPager from '@react-native-community/viewpager';
import _ from 'lodash';

export default class ViewDocuments extends Component {
    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
        this.fillArrayWithFiles();
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            imagePath: require("../../../assets/PetCare.png"),
            isLoading: false,
            status: "",
            pdfs: []
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
            // console.log(path);
            // console.log(documentName);
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

        let labResultFiles = [];
        let docRef = Firebase.firestore.collection("users").doc(uid);

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
        })

            // Firebase.firestore.collection("users").doc(uid).update({
            //     labResults: labResultFiles
            // })

            // .catch((e) => {
            //     console.log('uploading document error => ', e);
            //     this.setState({ loading: false, status: 'Something went wrong' });
            // });

            // IF SOMETHING BREAKS TRY TO REMOVE THIS .THEN RIGHT HERE ON LINE 92 AND THE BRACES ON 110
            .then(() => {
                task.then(() => {
                    console.log('Document uploaded to the bucket!');
                    // this.setState({ loading: false, status: 'Document uploaded successfully' });
                    this.setState({ status: 'Document uploaded successfully' });
                    ref.getDownloadURL().then(function (pdf) {
                        console.log("UMMMM OMEGAPOGGERS NO CAP ON A GLIZZY ON A STACK???? ", pdf);
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
                    .catch((e) => {
                        status = 'Something went wrong';
                        console.log('uploading document error => ', e);
                        this.setState({ loading: false, status: 'Something went wrong' });
                    });
            });
    }

    fillArrayWithFiles() {
        const { uid } = Firebase.auth.currentUser;
        let docRef = Firebase.firestore.collection("users").doc(uid);
        let array = [];

        docRef.get().then(doc => {
            if (doc.data().labResults) {
                (doc.data().labResults).forEach((field) => {
                    array.push(field)
                    console.log("IS THIS WHAT'S BEING CALLED??????: ", field);
                });
            }
        })

            // for (let i = 0; i < array.length; i++)
            // {
            //     console.log(array[i]);
            // }  
            .then(() => {
                this.setState({
                    pdfs: array
                })
            })
    }

    // FIRST SEPARATE THE FUNCTION THAT QUERIES THE ARRAY OF LAB RESULTS
    // 1. onPageSelected = {this.renderPdfViewer}
    // 2. REPLACE THAT I DOWN THERE LOOKIN SUS WITH POSITION
    renderPage = (position) => {
        // console.log(this.state.pdfs);
        console.log("THIS IS THE FIREBASE STORAGE LINK: ", this.state.pdfs[position]);
        return (
            <>
                <View style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height, backgroundColor: '#000'
                }} key={(position).toString()}>
                    <Text style={{ backgroundColor: "white" }}>Please swipe left to view the next PDF.</Text>
                    <PDFReader
                        source={{
                            uri: this.state.pdfs[position],
                        }}
                    />
                </View>
            </>
        )
    }

    renderPdfViewer = () => {
        var views = [];

        for (let i = 0; i < (this.state.pdfs).length; i++) {
            // console.log(this.state.pdfs);
            views.push(
                <View style={{ zIndex: 100 }} key={(i + 1).toString()}>
                    <View style={styles.pdfReader}>
                        <PDFReader
                            source={{
                                uri: this.state.pdfs[i],
                            }}
                        />
                    </View>
                </View>
            )
        }

        return (
            <>
                {views}
            </>
        )
    }


    render() {
        const { navigation } = this.props;
        // var views = [];

        // for (let i = 0; i < (this.state.pdfs).length; i++)
        // {
        //     // console.log(this.state.pdfs);
        //     views.push(
        //         <View style={{
        //             width: Dimensions.get ('window'). width,
        //             height: Dimensions.get ('window'). height, backgroundColor:'#000', zIndex: 100}} key={(i + 1).toString()}>
        //             <Text style={{backgroundColor: "white"}}>Please swipe left to view the next PDF.</Text>
        //           <PDFReader
        //                     source={{
        //                     uri: this.state.pdfs[i],
        //                     }}
        //                 />
        //           </View>
        //     )
        // }


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
            <View style={styles.container}>

                <NavHeaderWithButton title="Lab Results" back {...{ navigation }} buttonFn={this.chooseFile} buttonIcon="plus" />
                <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
                {/* <ViewPager style={styles.viewPager} initialPage={0} onPageSelected={}> */}
                {/* <ViewPager style={styles.viewPager} initialPage={0} showPageIndicator={true} onPageScroll = {(event) => {const{position} = event.nativeEvent; console.log(position);}}> */}
                {/* <ViewPager style={styles.viewPager} initialPage={0} showPageIndicator={true} onPageScroll = {(event) => console.log(event.nativeEvent.position)}> */}
                {/* <ViewPager style={styles.viewPager} initialPage={0} showPageIndicator={true} onPageSelected = {(event) => this.renderPage(event.nativeEvent.position)}> */}
                {/* {views} */}
                {/* {this.renderPdfViewer()} */}
                {/* </ViewPager> */}
                <ScrollView>
                    {/* {views} */}
                    {this.renderPdfViewer()}
                </ScrollView>
            </View>
        )
    }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    pdfReader: {
        height: 500,
        justifyContent: "space-around",
        margin: Theme.spacing.base
    }
});