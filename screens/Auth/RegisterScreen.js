import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import * as authActions from "../../store/actions/auth";
import Colors from "../../constants/Colors";

const RegisterScreen = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("Bir Hata oluştu!", error, [{ text: "Tamam" }]);
    }
  }, [error]);

  const authHandler = async (username, email, password, name, surname) => {
    let action;
    action = authActions.signup(username, email, password, name, surname);
    dispatch(action);
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
      <Text style={styles.logo}>Kayıt Ol</Text>
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputText}
          placeholder="Kullanıcı Adı"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
      </View>
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
          style={styles.inputText}
          placeholder="Adın"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setName(text);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Soyadın"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => {
            setSurname(text);
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
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
            authHandler(username, email, password, name, surname);
          }}
        >
          <Text style={styles.loginText}>Kayıt Ol</Text>
        </TouchableOpacity>
      )}
      <Text>Hesabın var mı?</Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <Text style={styles.loginText}>Giriş Yap</Text>
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

export default RegisterScreen;
