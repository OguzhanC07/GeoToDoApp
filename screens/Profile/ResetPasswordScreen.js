import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useTheme } from "react-native-paper";

import {
  MaterialCommunityIcons as Icon,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const ResetPasswordScreen = (props) => {
  const profile = useSelector((state) => state.auth.userInfo);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const passwordResetHandler = async (
    id,
    oldpassword,
    password,
    passwordconfirm
  ) => {
    setError(null);

    try {
      setIsLoading(true);
      await dispatch(
        authActions.resetPassword(id, oldpassword, password, passwordconfirm)
      );
      setIsLoading(false);
      props.navigation.navigate("ProfileOverview");
    } catch (err) {
      setError(err.messsage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Bir Hata oluştu!", error, [{ text: "Tamam" }]);
    }
  }, [error]);

  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 20, alignItems: "center" }}>
        <TouchableOpacity>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("../../assets/profile.png")}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></View>
            </ImageBackground>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              {profile.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="Şifre"
          secureTextEntry
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={(text) => {
            setOldPassword(text);
          }}
        />
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="Yeni Şifre"
          secureTextEntry
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={(text) => {
            setNewPassword(text);
          }}
        />
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="Yeni Şifre Tekrar"
          secureTextEntry
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => {
            passwordResetHandler(
              profile.id,
              oldPassword,
              newPassword,
              confirmPassword
            );
          }}
        >
          <Text style={styles.panelButtonTitle}>Kaydet</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 5,
    marginLeft: 20,
    width: "80%",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingTop: 7,
    paddingLeft: 10,
    color: "#05375a",
  },
});

export default ResetPasswordScreen;
