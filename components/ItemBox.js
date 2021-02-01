import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Colors from "../constants/Colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

const ItemBox = (props) => {
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.Text style={{ transform: [{ scale: scale }] }}>
            Sil
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={props.achieveTarget} activeOpacity={0.6}>
        <View style={styles.achieveBox}>
          <Animated.Text style={{ transform: [{ scale: scale }] }}>
            Tamamla
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
      <TouchableOpacity style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{props.name}</Text>
          {<Text>{new Date(props.date).toLocaleDateString("tr-TR")}</Text>}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ItemBox;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 16,
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 80,
  },
  achieveBox: {
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 80,
  },
});
