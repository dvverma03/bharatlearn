import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import colors from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";

export default function Slider({ CategoryFind }) {
  const [active, setActive] = useState(1);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const SliderItem = [
    {
      id: 1,
      name: "All Courses",
      icon: "fire",
    },
    {
      id: 2,
      name: "On going",
      icon: "watch-later",
    },
    {
      id: 3,
      name: "Completed",
      icon: "checkcircle",
    },
  ];

  const setActiveItem = (index, name) => {
    setActive(index);
    CategoryFind(name);
  };

  return (
    <>
      <FlatList
        data={SliderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()} // Ensure id is a string
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setActiveItem(item.id, item.name)}>
            <View
              style={
                item.id === active
                  ? styles.SelectedHeaderContainer
                  : styles.UnselectedHeaderContainer
              }
            >
              <Text>
                {item.id === 1 ? (
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={20}
                    color={
                      item.id === active ? colors.orange[400] : colors.gray[400]
                    }
                  />
                ) : item.id === 2 ? (
                  <MaterialIcons
                    name={item.icon}
                    size={20}
                    color={
                      item.id === active ? colors.orange[400] : colors.gray[400]
                    }
                  />
                ) : (
                  <AntDesign
                    name={item.icon}
                    size={20}
                    color={
                      item.id === active ? colors.orange[400] : colors.gray[400]
                    }
                  />
                )}
              </Text>
              <Text
                style={
                  item.id === active
                    ? styles.SelectedHeader
                    : styles.UnselectedHeader
                }
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  UnselectedHeaderContainer: {
    borderWidth: 2,
    borderColor: colors.gray[400],
    backgroundColor: colors.gray[200],
    paddingVertical: 8,
    width: 130,
    borderRadius: 8,
    flexDirection: "row",
    marginLeft: 8,
    marginTop: 10,
    justifyContent: "center",
  },
  SelectedHeaderContainer: {
    borderWidth: 2,
    borderColor: colors.orange[400],
    backgroundColor: colors.orange[200],
    paddingVertical: 8,
    width: 130,
    borderRadius: 8,
    flexDirection: "row",
    marginLeft: 8,
    marginTop: 10,
    justifyContent: "center",
  },
  UnselectedHeader: {
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray[400],
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  SelectedHeader: {
    marginHorizontal: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.orange[400],
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
});
