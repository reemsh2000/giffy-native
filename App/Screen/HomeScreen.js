import React, { useState } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import getDataApi from "../Api/getData";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppText from "../components/AppText";
import Card from '../components/Card'
import colors from "../config/colors";
function HomeScreen() {
  const [searchedWord, setSearchedWord] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getDataApi(searchedWord);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const onPress = () => {
    if (searchedWord) {
      getData();
    } else
      Alert.alert("Warning", "You Should search about anything", [
        { text: "OK" },
      ]);
  };

  return (
    <Screen style={styles.container}>
      <AppTextInput
        icon="text-box-search"
        style={styles.searchBox}
        onChangeText={(text) => setSearchedWord(text)}
      />
      <Pressable style={styles.searchBtn} onPress={onPress}>
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
      {data ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card
              imageUrl= {item.images.fixed_height_small.url }
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ):""}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems:"center",
    backgroundColor: colors.white,
  },searchBox:{
   width:"90%"
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

});
export default HomeScreen;
