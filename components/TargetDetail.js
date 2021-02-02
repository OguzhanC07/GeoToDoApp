import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";

import Colors from "../constants/Colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

const TargetDetail = (props) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <View style={styles.achievedTarget}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{props.name}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetail ? "Detayları Gizle" : "Detayları Göster"}
        onPress={() => {
          setShowDetail((prevState) => !prevState);
        }}
      />
      {showDetail && (
        <View>
          <View style={styles.itemText}>
            <Text style={styles.totalAmount}>Eklenme Tarihi</Text>
            <Text style={styles.totalAmount}>
              {new Date(props.savedTime).toLocaleDateString("tr-TR")}
            </Text>
          </View>
          <View style={styles.itemText}>
            <Text style={styles.totalAmount}>Hedefine Ulaşma</Text>
            <Text style={styles.totalAmount}>
              {new Date(props.achievedTime).toLocaleDateString("tr-TR")}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  achievedTarget: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  itemText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 5,
    paddingTop: 30,
    paddingLeft: 90,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  totalAmount: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

export default TargetDetail;
