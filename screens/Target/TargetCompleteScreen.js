import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import TargetDetail from "../../components/TargetDetail";

const TargetCompleteScreen = (props) => {
  const targets = useSelector((state) => state.target.completedTargets);

  if (targets.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Hedeflerin için her zaman bekliyorum</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default TargetCompleteScreen;
