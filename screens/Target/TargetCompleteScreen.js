import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import TargetDetail from "../../components/TargetDetail";

const TargetCompleteScreen = (props) => {
  const targets = useSelector((state) => state.target.completedTargets);

  return (
    <FlatList
      data={targets}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <TargetDetail
          name={itemData.item.name}
          savedTime={itemData.item.savedTime}
          achievedTime={itemData.item.achievedTime}
        />
      )}
      ItemSeparatorComponent={() => {
        return <View style={styles.seperatorLine}></View>;
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default TargetCompleteScreen;
