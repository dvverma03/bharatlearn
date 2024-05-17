import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import formatTimestamp from "./FormateTime";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";

export default function LiveClassCard({
  id,
  title,
  liveDateTime,
  creatorImage,
  creatorName,
  isPast,
}) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  return (
    <View style={styles.classesContainer}>
      <View style={styles.content}>
        <View style={{ width: "100%", flex: 1 }}>
          <View style={{ marginLeft: 0 }}>
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.HeaderContainer}>
            <Image
              style={styles.Image}
              source={{
                uri: `https://delc45ezm9w02.cloudfront.net${creatorImage}`,
              }}
            />
            <Text style={styles.HeaderText}>{creatorName}</Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="calendar-number-outline"
                size={18}
                color={colors.gray[600]}
              />
              <Text style={styles.description}>
                {formatTimestamp(liveDateTime).date},
                {formatTimestamp(liveDateTime).year}
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingLeft: 20 }}>
              <Ionicons
                name="time-outline"
                size={18}
                color={colors.gray[600]}
              />
              <Text style={styles.description}>
                {formatTimestamp(liveDateTime).time}
              </Text>
            </View>
          </View>
        </View>
        {!isPast && (
          <Pressable style={styles.pressableButton}>
            <Text style={styles.buttonText}>Join Now</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  classesContainer: {
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 12,

    backgroundColor: "#fff", // Background color to match iOS shadow
    borderRadius: 10,
    marginBottom: 10,
    borderColor: colors.gray[200],
    borderWidth: 1,
    alignItems: "center",
  },
  imageContainer: {
    width: 95,
    marginRight: 12,
    marginLeft: 5,
  },
  content: {
    width: "90%",
  },
  imageUrl: {
    width: 95,
    height: 95,
    objectFit: "cover",
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: "Poppins_500Medium",
    textAlign: "left",
    lineHeight: 24,
  },
  description: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: colors.gray[600],
    marginLeft: 5,
  },
  HeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 5,
    paddingTop: 5,
  },
  Image: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  HeaderText: {
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: "Poppins_400Regular",
  },
  pressableButton: {
    backgroundColor: colors.orange[400],
    borderRadius: 10,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 7,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontFamily: "Inter_500Medium",
  },
});
