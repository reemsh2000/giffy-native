import React from "react";
import { View, StyleSheet, Image } from "react-native";

function Card({ imageUrl }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.gifImage}  resizeMode={"cover"}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#F0F1F2",
    borderRadius:15,
    borderWidth:1,
    width: 280,
    height: 260,
    marginBottom: 14,
  },
  gifImage: {
    width: 240,
    height: 230,
    borderRadius:5,
  },
});

export default Card;
