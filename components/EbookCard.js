import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import EbookLibrarySkelton from "./Skelton/EbookLibrarySkelton";
import { Ionicons } from "@expo/vector-icons";

export default function EbookCard({
  title,
  ogDescription,
  thumbnail,
  id,
  permanentDiscount,
  price,
}) {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <EbookLibrarySkelton />;
  }

  return (
    <Pressable
      onPress={() => navigation.navigate("EbookDetails", { id: id })}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageUrl}
            source={{
              uri: `https://delc45ezm9w02.cloudfront.net${thumbnail}`,
            }}
          />
        </View>
        <View style={{ width: "60%", paddingLeft: 10 }}>
          <View style={{ marginLeft: 0 }}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <Text style={styles.description}>{ogDescription}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons
                name="person-outline"
                size={18}
                color={colors.gray[500]}
              />
              <Text style={styles.detailText}>self paced</Text>
            </View>
          </View>

          <View
            style={{
              width: "50%",
              flexDirection: "row",
              paddingLeft: 5,
              alignItems: "center",
              paddingTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Inter_500Medium",
                color: colors.gray[700],
                alignItems: "center",
              }}
            >
              {!permanentDiscount || permanentDiscount == "0"
                ? "Free"
                : `₹${permanentDiscount}`}
            </Text>
            {price ? (
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Inter_400Regular",
                  paddingLeft: 10,
                  color: colors.gray[700],
                  textDecorationLine: "line-through",
                }}
              >
                ₹{price}
              </Text>
            ) : (
              ""
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    elevation: 10, // Android shadow
    shadowColor: "#fff", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff", // Background color to match iOS shadow
    borderRadius: 10,
    marginBottom: 10,
    height: 250,
  },

  imageContainer: {
    width: 142,
    objectFit: "contains",
    objectFit: "cover",
    height: 220,
    marginRight: 8,
  },
  content: {
    flexDirection: "row",
  },
  imageUrl: {
    width: "100%",
    height: "95%",
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 3,
  },
  title: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
    textAlign: "left",
    paddingLeft: 5,
  },
  description: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: colors.gray[600],
    marginTop: 5,
    marginLeft: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
    marginLeft: 5,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 8,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.gray[600],
  },
  pressableButton: {
    backgroundColor: colors.orange[400],
    borderRadius: 10,
    marginTop: 15,
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});
