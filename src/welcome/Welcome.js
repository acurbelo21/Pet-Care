// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, Dimensions, Linking, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import {Text, Button, Container, Logo, Theme, AnimatedView, Firebase, serializeException} from "../components";
import type {ScreenProps} from "../components/Types";

export default class Welcome extends React.Component<ScreenProps<>> {

    @autobind
    signUp() {
        this.props.navigation.navigate("SignUp");
    }

    @autobind
    login() {
        this.props.navigation.navigate("Login");
    }

    render(): React.Node {
        return (
            // <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
            <Container gutter={2} style={styles.root}>
                <Logo />
                <AnimatedView style={styles.container}>
                    <Text type="header1" style={styles.header}>Pet Care</Text>
                </AnimatedView>
                <AnimatedView style={styles.container} delay={600} duration={300}>
                    <Button label="Login" onPress={this.login} full primary style={{o: Theme.palette.warning}} />
                    {/* <Button label="Login Anonymously" onPress={loginAnonymously} full /> */}
                    <Button label="Sign Up" onPress={this.signUp} full />
                </AnimatedView>
                {/* <TouchableOpacity style={styles.framer} onPress={framer}>
                    <Text style={styles.framerText}>Designed by Framer</Text>
                </TouchableOpacity> */}
            </Container>
        );
    }
}

const framer = () => Linking.openURL("https://framer.com/fiber");
const loginAnonymously = async (): Promise<void> => {
    try {
        await Firebase.auth.signInAnonymously();
    } catch (e) {
        // eslint-disable-next-line no-alert
        alert(serializeException(e));
    }
};
const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        alignSelf: "stretch"
    },
    header: {
        color: Theme.palette.black,
        textAlign: "center",
        marginTop: Theme.spacing.base * 2,
        marginBottom: Theme.spacing.base * 2
    },
    framer: {
        position: "absolute",
        bottom: Theme.spacing.tiny,
        width
    },
    framerText: {
        textAlign: "center",
        fontSize: 12
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
