import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import LoadingOverlay from "./LoadingOverlay";

export default function AccordionContents({ chapters, allChapters }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <LoadingOverlay />;
  }

  return (
    <View>
      {chapters &&
        chapters.map((e, index) => (
          <Text key={index} style={styles.TextC}>
            {(allChapters?.find((bc) => bc?.id === e.id)?.accumulatedPosition ??
              0) + 1}
            {". "}
            {e?.title}
          </Text>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  TextC: {
    fontSize: 14,
    paddingVertical: 5,
    paddingLeft: 5,
    color: colors.gray[500],
    fontFamily: "Poppins_400Regular",
  },
});
