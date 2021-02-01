import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../constants/Colors";

import * as authActions from "../../store/actions/auth";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("Bir Hata oluştu!", error, [{ text: "Tamam" }]);
    }
  }, [error]);

  const authHandler = async (email, password) => {
    console.log(email, password);
    let action;
    action = authActions.login(email, password);
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>GeoToDo</Text>
      <Text style={styles.topMessage}>
        Bir yere giderken yapacaklarını unutma! Telefonuna kaydet, o sana
        göstersin!
      </Text>
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputText}
          placeholder="Şifre"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            authHandler(email, password);
          }}
        >
          <Text style={styles.loginText}>Giriş Yap</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Register");
        }}
      >
        <Text style={styles.loginText}>Kayıt ol</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  topMessage: {
    color: "white",
    fontSize: 13,
    marginBottom: 50,
    marginHorizontal: 20,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});

export default LoginScreen;
