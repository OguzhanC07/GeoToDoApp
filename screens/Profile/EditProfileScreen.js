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

const EditProfileScreen = (props) => {
  const profile = useSelector((state) => state.auth.userInfo);
  const [name, setName] = useState(profile.name);
  const [surname, setSurname] = useState(profile.surname);
  const [userName, setUserName] = useState(profile.userName);
  const [email, setEmail] = useState(profile.email);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const editUserHandler = async (id, name, surname, username, email) => {
    setError(null);
    try {
      setIsLoading(true);
      await dispatch(authActions.editUser(id, email, username, surname, name));
      setIsLoading(false);
      props.navigation.navigate("ProfileOverview");
    } catch (err) {
      setError(err.message);
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
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
          {name}
        </Text>
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} />
        <TextInput
          placeholder="Ad"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput
          placeholder="Soyad"
          placeholderTextColor="#666666"
          value={surname}
          onChangeText={(text) => {
            setSurname(text);
          }}
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <MaterialIcons name="alternate-email" color={colors.text} size={20} />
        <TextInput
          placeholder="Kullanıcı Adı"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userName}
          onChangeText={(text) => {
            setUserName(text);
          }}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="envelope-o" color={colors.text} size={20} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666666"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => {
            editUserHandler(profile.id, name, surname, userName, email);
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

export default EditProfileScreen;
