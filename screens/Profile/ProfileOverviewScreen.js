import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";

import * as authActions from "../../store/actions/auth";
import Colors from "../../constants/Colors";

const ProfileOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.userInfo);
  const activityCount = useSelector(
    (state) => state.activity.availableActivities
  );
  const completedCount = useSelector(
    (state) => state.activity.completedActivities
  );

  const deleteProfileHandler = async (id) => {
    Alert.alert("Emin misin?", "Bu hesabı silersen birdaha erişemeyeceksin!", [
      { text: "Hayır", style: "default" },
      {
        text: "Evet",
        style: "destructive",
        onPress: () => {
          try {
            setIsLoading(true);
            dispatch(authActions.deleteUser(id));
            setIsLoading(false);
          } catch (error) {
            console.log(error.message);
          }
        },
      },
    ]);
  };

  const loadProfile = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      dispatch(authActions.GetUserInfo());
    } catch (error) {
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadProfile);

    return () => {
      unsubscribe();
    };
  }, [loadProfile]);

  useEffect(() => {
    setIsLoading(true);
    loadProfile().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProfile]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
        <Button
          title="Tekrar dene"
          onPress={loadProfile}
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

  if (!isLoading && profile === undefined) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={require("../../assets/profile.png")}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {profile.name} {profile.surname}
            </Title>
            <Caption style={styles.caption}>@{profile.userName}</Caption>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View
            style={[
              styles.row,
              {
                marginTop: 20,
              },
            ]}
          >
            <MaterialCommunityIcons name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {profile.email}
            </Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: "#dddddd",
                borderRightWidth: 1,
              },
            ]}
          >
            <Title>{activityCount.length}</Title>
            <Caption>Aktif Aktiviteler</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{completedCount.length}</Title>
            <Caption>Tamamladıkların</Caption>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() => {
              props.navigation.navigate("ProfileEdit");
            }}
          >
            <View style={styles.menuItem}>
              <MaterialCommunityIcons
                name="account-edit"
                color="#FF6347"
                size={25}
              />
              <Text style={styles.menuItemText}>Profili Düzenle</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              props.navigation.navigate("ProfileResetPassword");
            }}
          >
            <View style={styles.menuItem}>
              <MaterialCommunityIcons
                name="form-textbox-password"
                color="#FF6347"
                size={25}
              />
              <Text style={styles.menuItemText}>Şifreyi Değiştir</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={deleteProfileHandler.bind(this, profile.id)}
          >
            <View style={styles.menuItem}>
              <MaterialCommunityIcons name="delete" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Hesabı Sil</Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});

export default ProfileOverviewScreen;
