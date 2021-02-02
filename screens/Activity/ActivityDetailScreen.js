import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import MapPreview from "../../components/MapPreview";

const ActivityDetailScreen = (props) => {
  const activityId = props.route.params.activityId;
  const selectedActivity = useSelector((state) =>
    state.activity.availableActivities.find((act) => act.id == activityId)
  );

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <View style={styles.locationContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {new Date(selectedActivity.selectedTime).toLocaleDateString(
              "tr-TR"
            ) +
              "-" +
              new Date(selectedActivity.selectedTime).toLocaleTimeString(
                "tr-TR"
              )}
          </Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.title}>{selectedActivity.name}</Text>
          <Text style={styles.description}>{selectedActivity.description}</Text>
        </View>
        {selectedActivity.latitude == 0 &&
        selectedActivity.longitude == 0 ? null : (
          <MapPreview
            style={styles.mapPreview}
            lat={selectedActivity.latitude}
            lng={selectedActivity.longitude}
          />
        )}
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.activityTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  dateContainer: {
    textAlign: "right",
    paddingTop: 10,
  },
  dateText: {
    color: "black",
    textAlign: "right",
    fontSize: 10,
  },
  addressContainer: {
    padding: 20,
  },
  title: {
    color: Colors.primary,
    fontSize: 20,
    textAlign: "center",
  },
  description: {
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default ActivityDetailScreen;
