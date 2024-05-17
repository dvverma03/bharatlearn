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
import { useDispatch } from "react-redux";
import { addCourseId } from "../store/courseSlice";
import CourseLibrarySkelton from "./Skelton/CourseLibrarySkelton";
import { Ionicons } from "@expo/vector-icons";

export default function CourseCard({
  title,
  ogDescription,
  thumbnail,
  id,
  price,
  slashedPrice,
  _count,
  tags,
  feedbacks,
  averageRating,
}) {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  const dispatch = useDispatch();

  const navigationHandler = () => {
    dispatch(addCourseId(id));
    navigation.navigate("CourseDetails", { id: id });
  };

  if (!fontsLoaded) {
    return <CourseLibrarySkelton />;
  }

  return (
    <Pressable onPress={navigationHandler} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageUrl}
            source={{
              uri: `https://delc45ezm9w02.cloudfront.net${thumbnail}`,
            }}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 5,
              alignItems: "center",
              paddingTop: 5,
            }}
          >
            {tags?.length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {tags?.map((e, index) => (
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 14,
                    }}
                    key={index}
                  >
                    {e?.title}•
                  </Text>
                ))}
              </View>
            )}
            <View style={{ flexDirection: "row", paddingLeft: 8 }}>
              {averageRating > 0 && (
                <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 14 }}>
                  {averageRating}
                </Text>
              )}
              {averageRating > 0 && (
                <AntDesign
                  name="star"
                  size={12}
                  color="black"
                  style={{ paddingTop: 4 }}
                />
              )}
            </View>
            {feedbacks?.length > 0 && (
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  paddingLeft: 5,
                }}
              >
                ({feedbacks?.length})
              </Text>
            )}
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text style={styles.description}>{ogDescription}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Inter_500Medium",
                color: colors.gray[700],
              }}
            >
              {!price || price == "0" ? "Free" : `₹${price}`}
            </Text>
            {slashedPrice ? (
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Inter_400Regular",
                  paddingLeft: 10,
                  color: colors.gray[700],
                  textDecorationLine: "line-through",
                }}
              >
                ₹{slashedPrice}
              </Text>
            ) : (
              ""
            )}
          </View>
          <View style={styles.detailItem}>
            <AntDesign name="clockcircleo" size={12} color={colors.gray[600]} />
            <Text style={styles.detailText}>
              {_count?.blocksChapters} Chapters
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
    marginHorizontal: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
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
    width: "97%",
    alignItems: "center",
    height: 195,
    marginHorizontal: 8,
    marginTop: 8,
  },
  imageUrl: {
    width: "100%",
    height: 192,
    borderRadius: 10,
    objectFit: "cover",
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
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#525252",
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
    paddingTop: 2,
  },
  detailText: {
    marginLeft: 5,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colors.gray[600],
    paddingTop: 2,
  },
  pressableButton: {
    backgroundColor: colors.orange[400],
    borderRadius: 10,
    marginTop: 15,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    padding: 10,
    textAlign: "center",
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});
