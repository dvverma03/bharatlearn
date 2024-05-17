import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import colors from "../constants/colors";
import AccordionContents from "./AccordionContents";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import LoadingOverlay from "./LoadingOverlay";
import { Entypo } from "@expo/vector-icons";

export default function Accordions({ title, chapters, allChapters }) {
  const [clicked, setClicked] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const toggleShow = () => {
    setClicked(!clicked);
  };

  if (!fontsLoaded) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.accordion}>
      <View style={styles.textContent}>
        <Text
          style={{
            fontSize: 14,
            paddingHorizontal: 3,
            fontFamily: "Poppins_400Regular",
            paddingVertical: 5,
            color: colors.gray[600],
          }}
        >
          {title}
        </Text>
        {clicked && (
          <AccordionContents allChapters={allChapters} chapters={chapters} />
        )}
      </View>
      <Pressable onPress={toggleShow}>
        {/* <AntDesign style={{marginTop:8}} name={clicked ? "up" : "down"} size={22} color="black" /> */}
        <Entypo
          name={clicked ? "chevron-small-up" : "chevron-small-down"}
          size={24}
          color={colors.gray[500]}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  accordion: {
    borderColor: colors.gray[200],
    borderWidth: 2,
    padding: 5,
    margin: 3,
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "center",
  },
  textContent: {
    width: "90%",
  },
});
