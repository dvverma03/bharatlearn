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
import DetailsCourseSkelton from "./Skelton/DetailsCourseSkelton";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function IndivisualCourseCard({
  title,
  ogDescription,
  thumbnail,
  id,
  _count,
}) {
  const navigation = useNavigation();
  const [courseProgress, setCourseProgress] = useState();
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    if (token) {
      const CourseProgress = async () => {
        const progress = await getProgressEnroll(id, token);
        setCourseProgress(progress);
      };
      CourseProgress();
    }
  }, [token]);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded || !courseProgress) {
    return <DetailsCourseSkelton />;
  }

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ChapterScreen", {
          screen: "ParticularChapter",
          params: { id: id },
        })
      }
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageUrl}
            source={{
              uri: thumbnail,
            }}
          />
        </View>
        <View style={{ marginLeft: 0 }}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
          <Text style={styles.description}>{ogDescription}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <AntDesign
              name="clockcircleo"
              size={14}
              color={colors.gray[500]}
              style={{ paddingTop: 4 }}
            />
            <Text style={styles.detailText}>
              {_count?.blocksChapters} Chapters
            </Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialIcons
              name="person-outline"
              size={18}
              style={{ paddingTop: 2 }}
              color={colors.gray[500]}
            />
            <Text style={styles.detailText}>self paced</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <View>
            <Progress.Bar
              progress={
                courseProgress?.progress && courseProgress?.progress / 100
              }
              color={colors.orange[400]}
              height={10}
              unfilledColor={colors.gray[100]}
              borderColor="white"
              borderRadius={5}
              width={300}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              paddingLeft: 5,
              paddingTop: 2,
              fontFamily: "Poppins_400Regular",
              color: colors.gray[600],
            }}
          >
            {courseProgress?.progress}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    elevation: 10, // Android shadow
    shadowColor: "#ffff", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#ffff", // Background color to match iOS shadow
    borderRadius: 10,
    height: 350,
  },

  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  imageUrl: {
    width: "100%",
    height: 175,
    borderRadius: 10,
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
  },
  detailText: {
    marginLeft: 8,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: colors.gray[600],
  },
});
