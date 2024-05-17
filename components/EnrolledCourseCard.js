import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
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
import { getProgressEnroll } from "../utils/Authentication.js";
import AllEnrollCourseSkelton from "./Skelton/AllEnrollCourseSkelton";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function EnrolledCourseCard({
  title,
  ogDescription,
  thumbnail,
  id,
  _count,
}) {
  const navigation = useNavigation();
  const [courseProgress, setCourseProgress] = useState("");
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  const { token } = useSelector((store) => store.auth);
  const [progressUptoDate, setProgressUptoDate] = useState(false);

  useEffect(() => {
    if (token && !progressUptoDate) {
      const CourseProgress = async () => {
        const progress = await getProgressEnroll(id, token);
        setCourseProgress(progress);
        setProgressUptoDate(true);
      };
      CourseProgress();
    }
  }, [token, progressUptoDate]);

  useEffect(() => {
    navigation.addListener("focus", () => setProgressUptoDate(false));

    return () => {
      navigation.removeListener("focus");
    };
  }, [navigation]);

  if (!fontsLoaded) {
    return <AllEnrollCourseSkelton />;
  }

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ChapterScreen", {
          screen: "ParticularChapter",
          params: { id: id },
        });
      }}
      style={styles.container}
    >
      <View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageUrl}
            source={{
              uri: thumbnail,
            }}
          />
        </View>
        <View style={{ marginLeft: 0 }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {title}
          </Text>
        </View>
        <View>
          <Text
            style={styles.description}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {ogDescription}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <AntDesign name="clockcircleo" size={12} color={colors.gray[600]} />
            <Text style={styles.detailText}>
              {_count?.blocksChapters} Chapters
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons
              name="person-outline"
              size={12}
              color={colors.gray[600]}
            />
            <Text style={styles.detailText}>self paced</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
          width: 222,
        }}
      >
        <View style={{ width: "85%" }}>
          <Progress.Bar
            progress={
              courseProgress?.progress && courseProgress?.progress / 100
            }
            color={colors.orange[400]}
            height={10}
            unfilledColor={colors.gray[100]}
            borderColor="white"
            borderRadius={5}
            width={180}
          />
        </View>
        <Text
          style={{
            fontSize: 14,
            paddingLeft: 10,
            fontFamily: "Poppins_400Regular",
            color: colors.gray[600],
            paddingTop: 2,
          }}
        >
          {courseProgress?.progress?.toFixed(1)}%
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginRight: 8,
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
    width: 246,
    height: 258,
  },

  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  imageUrl: {
    width: 222,
    height: 118,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
    textAlign: "left",
    paddingLeft: 5,
    lineHeight: 21,
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
    marginTop: 3,
  },
});
