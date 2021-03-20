import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text, NavHeader, Theme, Button, TextField } from "../../components";
import { FontAwesome5 } from '@expo/vector-icons';
import Firebase from "../../components/Firebase";
import TextInputComponent from "../../walkthrough/TextInputComponent";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

export default class AddPets extends React.Component<SettingsState> {
   
    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
    }

    constructor(props) {
        super(props);
        this.state = {
            pet: null,
            breed: null,
            age: 0,
            sex: null,
            isVisibleA: false,
            isVisibleB: false,
        };
    
        //this.controller;
    }

    changeVisibility(state) {
        this.setState({
            ...state,
            isVisibleA: false,
            isVisibleB: false,
        });
        console.log(this.state.isVisibleA)
    }

    render() {
        const { navigation } = this.props;

        return (
            <>  
                <NavHeader title="Add Pet" back {...{ navigation }} />

                <DropDownPicker
                    items={[
                        {label: 'Dog', value: 'dog', icon: () => <FontAwesome5 name="dog" size={18} color="#900" />},
                        {label: 'Cat', value: 'cat', icon: () => <FontAwesome5 name="cat" size={18} color="#900" />},
                        {label: 'Bird', value: 'bird', icon: () => <FontAwesome5 name="dove" size={18} color="#900" />},
                        {label: 'Horse', value: 'horse', icon: () => <FontAwesome5 name="horse" size={18} color="#900" />},
                        {label: 'Fish', value: 'fish', icon: () => <FontAwesome5 name="fish" size={18} color="#900" />},
                        {label: 'Exotic', value: 'exotic', icon: () => <FontAwesome5 name="spider" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.pet}
                    containerStyle={{height: 40, marginBottom: 160}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        pet: item.value
                    })}
                    placeholder="Select a species"
                    isVisible={this.state.isVisibleA}
                    onOpen={() => this.setState({
                        isVisibleA: true
                    })}
                    onClose={() => this.setState({
                        isVisibleA: false
                    })}
                />

                <DropDownPicker
                    items={[
                        {label: 'Male', value: 'male', icon: () => <FontAwesome5 name="mars" size={18} color="#900" />},
                        {label: 'Female', value: 'female', icon: () => <FontAwesome5 name="venus" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.sex}
                    containerStyle={{height: 40, marginBottom: 80}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        sex: item.value
                    })}
                    placeholder="Select sex"
                    isVisible={this.state.isVisibleB}
                    onOpen={() => this.setState({
                        isVisibleB: true
                    })}
                    onClose={() => this.setState({
                        isVisibleB: false
                    })}
                />

                <Text>Breed:</Text>

                <TextField
                    style={styles.input}
                    onChangeText={item => this.setState({
                        age: item.value
                    })}
                    returnKeyType = 'done'
                />

                <Text>Age:</Text>

                <TextField
                    style={styles.input}
                    onChangeText={item => this.setState({
                        age: item.value
                    })}
                    keyboardType="numeric"
                    returnKeyType = 'done'
                />

                <Button
                    title="Press me"
                    onPress={console.log(this.state.pet)}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 283,
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginVertical: Theme.spacing.base
    },
    image: {
        padding: 10
    },
    message: {
        color: Theme.palette.black,
        fontSize: 20,
        fontFamily: Theme.typography.semibold,
        textAlign: "center",
        marginBottom: Theme.spacing.base
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        paddingTop: 40,
    },
});

/*
Plans for this screen
similar to the first select screen with some different text and no description at the bottom

*/