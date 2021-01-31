import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

import apiKey from "../constants/apiKey";

const MapPreview = (props) => {
  let imagePreviewUrl;

  imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.lat},${props.lng}&key=${apiKey.googleApiKey}`;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.lat ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
