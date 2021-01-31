import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import ActivityItem from "../../components/ActivityItem";
import Colors from "../../constants/Colors";
import * as activityActions from "../../store/actions/activity";

const ActivityOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activity.availableActivities);

  const loadActivity = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      ///BURAYA REDUX EKLENECEK
      await dispatch(activityActions.fetchActivity());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadActivity);

    return () => {
      unsubscribe();
    };
  }, [loadActivity]);

  useEffect(() => {
    setIsLoading(true);
    loadActivity().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadActivity]);

  const selectItemHandler = (id, name) => {
    props.navigation.navigate("ActivityDetail", {
      activityId: id,
      activityTitle: name,
    });
  };

  const editActivityHandler = (id) => {
    props.navigation.navigate("EditActivity", { activityId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("Emin misin?", "Bu aktiviteyi silmek istediğine emin misin?", [
      { text: "Hayır", style: "default" },
      {
        text: "Evet",
        style: "destructive",
        onPress: () => {
          dispatch(activityActions.deleteActivity(id));
        },
      },
    ]);
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button
          title="Tekrar dene"
          onPress={loadActivity}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && activities.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>
          Bugüne ait hiç aktivite bulunamadı. Yeni eklemek ister misin?
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadActivity}
      refreshing={isRefreshing}
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
            selectItemHandler(itemData.item.id, itemData.item.name);
          }}
        >
          <Button color={Colors.primary} title="Düzenle" onPress={() => {}} />
          <Button
            color={Colors.primary}
            title="Sil"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ActivityItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ActivityOverviewScreen;
