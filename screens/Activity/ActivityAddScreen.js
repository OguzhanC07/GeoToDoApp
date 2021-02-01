import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import * as activityActions from "../../store/actions/activity";

const ActivityAddScreen = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState();
  const [openMap, setOpenMap] = useState(false);
  const [region, setRegion] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Gerekli izinler alınamadı",
        "Uygulamayı düzgün kullanabilmek için izin vermeniz gereklidir.",
        [{ text: "Tamam" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      let userRegion = {
        latitude: parseFloat(location.coords.latitude),
        longitude: parseFloat(location.coords.longitude),
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      };
      setRegion(userRegion);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocationHandler();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const dispatch = useDispatch();

  const saveHandler = async (selectedLocation, name, description, date) => {
    if (selectedLocation == undefined) {
      try {
        await dispatch(
          activityActions.createActivity(name, description, date, 0, 0)
        );
        props.navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await dispatch(
          activityActions.createActivity(
            name,
            description,
            date,
            selectedLocation.lat,
            selectedLocation.lng
          )
        );
        props.navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (openMap) {
    return (
      <View>
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onPress={selectLocationHandler}
        >
          {markerCoordinates && (
            <Marker title="Seçilen Konum" coordinate={markerCoordinates} />
          )}
        </MapView>
        <View style={styles.mapBottom}>
          <View style={{ paddingRight: 10 }}>
            <Button
              title="Geri Dön"
              onPress={() => {
                setSelectedLocation(undefined);
                setOpenMap(false);
              }}
            />
          </View>
          <Button
            disabled={markerCoordinates ? false : true}
            title="Bu konumu kaydet"
            onPress={() => {
              setOpenMap(false);
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputText}
          placeholder="Aktivite Adı"
          placeholderTextColor="#003f5c"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
      </View>
      <View style={styles.textareaInput}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Açıklama"
          style={styles.textArea}
          placeholderTextColor="#003f5c"
          multiline={true}
          value={description}
          numberOfLines={10}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ padding: 5 }}>
          <Button onPress={showDatepicker} title="Tarih Ekle" />
        </View>
        <View style={{ padding: 5 }}>
          <Button onPress={showTimepicker} title="Saat Ekle" />
        </View>
      </View>
      <Text>Şu anda seçilen Tarih</Text>
      <Text>
        {new Date(date).toDateString() +
          " " +
          new Date(date).getHours() +
          ":" +
          new Date(date).getMinutes()}
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TouchableOpacity
        onPress={(state) => {
          setOpenMap(true);
        }}
      >
        <Text>Konum Ekle</Text>
      </TouchableOpacity>
      {selectedLocation ? <Text>Konum seçimi yapıldı.</Text> : null}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          saveHandler(selectedLocation, name, description, date);
        }}
      >
        <Text style={styles.loginText}>Kaydet</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "90%",
  },
  mapBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#00716F",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    color: "black",
  },
  textareaInput: {
    width: "80%",
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#00716F",
    textAlignVertical: "top",
    height: 100,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
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

export default ActivityAddScreen;
