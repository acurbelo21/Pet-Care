// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { inject, observer } from "mobx-react";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";

import ProfileStore from "../ProfileStore";

import { Text, Avatar, Theme, NavHeaderWithButton } from "../../components";
import type { ScreenProps } from "../../components/Types";

type InjectedProps = {
  profileStore: ProfileStore
};

@inject("profileStore")
@observer
export default class ProfileComp extends React.Component<
  ScreenProps<> & InjectedProps
> {

  @autobind
  settings() {
    const { profile } = this.props.profileStore;
    this.props.navigation.navigate("Settings", { profile });
  }

  render(): React.Node {
    const { profileStore, navigation } = this.props;
    const { profile } = profileStore;
    return (
      <View style={styles.container}>
        {/* <NavHeader title="Profile" {...{ navigation }} /> */}
        <NavHeaderWithButton title="Profile" buttonFn={this.settings} buttonIcon="settings" />
        <LinearGradient
          colors={["#81f1f7", "#9dffb0"]}
          style={styles.gradient}
        />
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={this.settings} style={styles.settings}>
            <View>
              <Icon name="settings" size={30} color={Theme.palette.black} />
            </View>
          </TouchableOpacity> */}
          <View style={styles.title}>
            {/* <Text type="large" style={styles.outline}>Pet Owner</Text> */}
            <Text type="header2" style={styles.name}>{profile.name}</Text>
          </View>
          <Avatar
            size={avatarSize}
            style={styles.avatar}
            {...profile.picture}
          />
        </View>
      </View>
    );
  }
}

const avatarSize = 150;
const { width, height } = Dimensions.get("window");
const { statusBarHeight } = Constants;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    marginBottom: avatarSize * 0.5 + Theme.spacing.small,
  },
  cover: {
    width,
    height: height * 0.9,
  },
  avatar: {
    position: "absolute",
    // right: Theme.spacing.small,
    alignSelf: "center",
    top: statusBarHeight + Theme.spacing.xLarge,
  },
  settings: {
    position: "absolute",
    top: statusBarHeight + Theme.spacing.small,
    right: Theme.spacing.base,
    backgroundColor: "transparent",
    zIndex: 10000,
  },
  title: {
    position: "absolute",
    // left: Theme.spacing.small,
    alignSelf: "center",
    top: 175 + statusBarHeight + Theme.spacing.xLarge,
  },
  outline: {
    color: Theme.palette.black,
    alignSelf: "center",
  },
  name: {
    color: Theme.palette.black,
  },
});
