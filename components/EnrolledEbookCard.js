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
import * as Progress from "react-native-progress";
import AllEnrollEbookSkelton from "./Skelton/AllEnrollEbookSkelton";
import { Ionicons } from "@expo/vector-icons";

export default function EnrolledEbookCard({
  title,
  ogDescription,
  thumbnail,
  id,
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
    return <AllEnrollEbookSkelton />;
  }

  return (
    <Pressable
      onPress={() => navigation.navigate("EnrolledEbookDetails", { id: id })}
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
        <View style={{ width: 134, marginLeft: 10 }}>
          <View style={{ marginLeft: 0 }}>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}>
              {title}
            </Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons
                name="person-outline"
                size={12}
                color={colors.gray[500]}
              />
              <Text style={styles.detailText}>self paced</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Progress.Bar
              style={{ flex: 1 }}
              progress={0.64}
              color={colors.orange[400]}
              height={8}
              unfilledColor={colors.gray[100]}
              borderColor="white"
              borderRadius={5}
            />
            <Text
              style={{
                fontSize: 14,
                paddingLeft: 10,
                fontFamily: "Poppins_400Regular",
                color: colors.gray[600],
                paddingTop: 2,
              }}
            >
              64%
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
    elevation: 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
  },

  imageContainer: {
    width: 75,
    height: 106,
    marginTop: 10,
    marginLeft: 5,
  },
  imageUrl: {
    width: "100%",
    height: 106,
    objectFit: "cover",
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
    textAlign: "left",
    paddingLeft: 5,
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: colors.gray[600],
    marginTop: 5,
    marginLeft: 5,
    lineHeight: 18,
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
    marginLeft: 5,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: colors.gray[600],
  },
  content: {
    flexDirection: "row",
    width: 276,
    height: 130,
  },
});
