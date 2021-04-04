import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import faker from 'faker'; // makes fake data
import _ from 'lodash';
import Pagination,{Icon,Dot} from 'react-native-pagination';//{Icon,Dot} also available
import Firebase from "../../../components/Firebase";
import {Text, NavHeader, Theme, Button} from "../../../components";
import { LinearGradient } from "expo-linear-gradient";
import PlayYouTube from "./PlayYouTube";

export default class TrainingScreen extends Component {
    async componentDidMount(): Promise<void> {
    }

    render()
    {
        const { navigation } = this.props;
        return(
            <View>
                <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
                <NavHeader title="Training Videos" back {...{navigation}}/>
                <SafeAreaView>
                    <PlayYouTube videoId="dQw4w9WgXcQ"/>
                    <View style={{
                        height: 400
                    }}>

                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
})
