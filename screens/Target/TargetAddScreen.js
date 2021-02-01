import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import * as targetActions from "../../store/actions/target";

const TargetAddScreen = (props) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const saveHandler = async (name) => {
    try {
      setIsLoading(true);
      await dispatch(targetActions.createTarget(name));
      setIsLoading(false);
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.centerContainer}>
      <TextInput
        style={styles.inputStyle}
        onChangeText={(text) => {
          setName(text);
        }}
        placeholder="Hedefinin adı"
        value={name}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <TouchableOpacity
          style={styles.buttonStyle}
          title="Hedefini Ekle"
          onPress={() => {
            saveHandler(name);
          }}
        >
          <Text>Kaydet</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    borderWidth: 3,
    borderRadius: 10,
    padding: 20,
    borderColor: "black",
    width: "70%",
    height: 60,
    margin: 20,
  },
  buttonStyle: {
    width: 200,
    backgroundColor: "grey",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  text: {
    color: "white",
  },
});

export default TargetAddScreen;
