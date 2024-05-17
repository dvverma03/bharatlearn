import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
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
import DetailsEbookSkelton from "./Skelton/DetailsEbookSkelton";
import { MaterialIcons } from "@expo/vector-icons";

export default function IndivisualEbookCard({
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
    return <DetailsEbookSkelton />;
  }

  return (
    <Pressable
      style={{ marginBottom: 10 }}
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
        <View style={{ width: "60%", height: 220 }}>
          <View style={{ marginLeft: 0 }}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <Text style={styles.description}>{ogDescription}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <MaterialIcons
                name="person-outline"
                size={18}
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
            <View style={{ marginLeft: 3 }}>
              <Progress.Bar
                progress={0.64}
                color={colors.orange[400]}
                height={9}
                unfilledColor={colors.gray[100]}
                borderColor="white"
                borderRadius={5}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                paddingLeft: 5,
                fontFamily: "Poppins_400Regular",
                color: colors.gray[600],
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
  },

  imageContainer: {
    width: 117,
    marginRight: 18,
    marginLeft: 5,
    height: 195,
    marginTop: 12,
  },
  imageUrl: {
    width: 127,
    height: 192,
    objectFit: "cover",
    borderRadius: 3,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
    textAlign: "left",
    paddingLeft: 5,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
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
    marginLeft: 3,
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
  content: {
    flexDirection: "row",
  },
});
