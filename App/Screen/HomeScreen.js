import React, { useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Alert,
} from "react-native";
import axios from "axios";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import colors from "../config/colors";
function HomeScreen() {
  const [searchedWord, setSearchedWord] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://api.giphy.com/v1/gifs/search?q=${searchedWord} &limit=4 &api_key=4L8vbrY0Yf0GpnXzHV6QNlMhdAfUAtg4`
      );
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen style={styles.container}>
      <AppTextInput
        icon="text-box-search"
        onChangeText={(text) => setSearchedWord(text)}
      />
      <Pressable
        style={styles.searchBtn}
        onPress={() => {
          if (searchedWord) {
            getData();
          } else
            Alert.alert("Warning", "You Should search about anything", [
              { text: "OK" },
            ]);
        }}
      >
        <AppText style={styles.searchBtnText}>Search</AppText>
      </Pressable>

      {isLoading && (
        <ActivityIndicator
          size="small"
          color="#0000ff"
          size="large"
          style={styles.loading}
        />
      )}
      {data && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.images.fixed_height_small.url }}
              style={styles.gifImage}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  searchBtn: {
    width: 130,
    borderRadius: 20,
    backgroundColor: colors.danger,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    marginVertical: 12,
    alignSelf: "center",
  },
  searchBtnText: {
    color: colors.white,
  },
  loading: {
    padding: 200,
  },
  gifImage: {
    width: 400,
    height: 300,
    marginBottom: 10,
  },
});
export default HomeScreen;
