import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import * as targetActions from "../../store/actions/target";
import Colors from "../../constants/Colors";
import ItemBox from "../../components/ItemBox";

const TargetOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const targets = useSelector((state) => state.target.availableTargets);

  const loadTarget = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(targetActions.fetchTarget());
    } catch (error) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadTarget);

    return () => {
      unsubscribe();
    };
  }, [loadTarget]);

  useEffect(() => {
    setIsLoading(true);
    loadTarget().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadTarget]);

  const deleteItemHandler = async (id) => {
    try {
      await dispatch(targetActions.deleteTarget(id));
    } catch (error) {
      console.log(error);
    }
  };

  const achieveTargetHandler = async (id) => {
    try {
      await dispatch(targetActions.completeTarget(id));
      Alert.alert("Tebrikler!", "Hedefine ulaştığın için tebrikler!", [
        { text: "Tamam" },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button
          title="Tekrar dene"
          onPress={loadTarget}
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

  if (!isLoading && targets.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Hayatına yeni bir hedef eklemenin tam sırası!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadTarget}
      refreshing={isRefreshing}
      data={targets}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(itemData) => (
        <ItemBox
          name={itemData.item.name}
          date={itemData.item.savedTime}
          handleDelete={deleteItemHandler.bind(this, itemData.item.id)}
          achieveTarget={achieveTargetHandler.bind(this, itemData.item.id)}
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
  seperatorLine: {
    height: 1,
    backgroundColor: "black",
  },
});

export default TargetOverviewScreen;
