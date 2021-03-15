import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import faker from 'faker'; // makes fake data
import _ from 'lodash';
import Pagination,{Icon,Dot} from 'react-native-pagination';//{Icon,Dot} also available
import Firebase from "../../../components/Firebase";
import {Text, NavHeader, Theme, Button} from "../../../components";
import { LinearGradient } from "expo-linear-gradient";

export default class TrainingScreen extends Component {
    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
    }

    render()
    {
        const { navigation } = this.props;
        return(
            <View>
                <NavHeader title="Training Videos" back {...{navigation}}/>
                <SafeAreaView>
                    <Text>Training Videos</Text>
                </SafeAreaView>
            </View>
        )
    }
}