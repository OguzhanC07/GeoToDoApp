import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ActivityItem from "../../components/ActivityItem";

const CompletedActivityScreen = (props) => {
  const activities = useSelector((state) => state.activity.completedActivities);
  return (
    <FlatList
      data={activities}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ActivityItem
          title={itemData.item.name}
          date={
            new Date(itemData.item.selectedTime).toDateString() +
            " - " +
            new Date(itemData.item.selectedTime).getHours() +
            ":" +
            new Date(itemData.item.selectedTime).getMinutes()
          }
          onSelect={() => {
            //selectItemHandler(itemData.item.id, itemData.item.name);
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text>Harika! Bunu tamamladın</Text>
          </View>
        </ActivityItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default CompletedActivityScreen;
