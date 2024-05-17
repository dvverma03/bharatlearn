import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEnrolledCourses } from "../utils/Authentication.js";
import IndivisualCourseCard from "../components/IndivisualCourseCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import Slider from "../components/Slider.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmptyCourseImage from "../assets/EmptyCourse.png";
import colors from "../constants/colors.js";

export default function EnrolledCourses({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState(1);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  const { token } = useSelector((store) => store.auth);

  const FilterCourse = (data) => {
    if (category === "Completed") {
      return data.filter((e) => e?.course?.courseProgress === 100);
    } else if (category === "On going") {
      return data.filter((e) => {
        return (
          (e?.course?.courseProgress < 100 && e?.course?.courseProgress > 0) ||
          e?.course?.courseProgress === null
        );
      });
    } else {
      return data;
    }
  };

  const CategoryFind = (cat) => {
    setCategory(cat);
  };

  useEffect(() => {
    if (token && category) {
      const fetchData = async () => {
        const coursesData = await getEnrolledCourses(token);
        const filterData = FilterCourse(coursesData);
        setCourses(filterData);
      };
      fetchData();
    }
  }, [token, category]);

  return (
    <GestureHandlerRootView style={{ marginBottom: 60 }}>
      <>
        <View
          style={{
            flexDirection: "row",
            width: "95%",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
            paddingBottom: 10,
          }}
        >
          <Slider CategoryFind={CategoryFind} />
        </View>
        {courses.length === 0 ? (
          <View style={styles.EmptyContainer}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={EmptyCourseImage} />
              <Text
                style={{
                  fontSize: 14,
                  paddingVertical: 10,
                  fontFamily: "Poppins_500Medium",
                  lineHeight: 21,
                }}
              >
                Begin your learning journey here
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  paddingLeft: 10,
                  paddingRight: 10,
                  letterSpacing: 0.1,
                  fontFamily: "Poppins_400Regular",
                  lineHeight: 18,
                  color: "#737373",
                }}
              >
                Kickstart your learning journey with Kroto. Dive in and explore
                transformative insights today!
              </Text>
              <Pressable
                onPress={() => navigation.navigate("CourseDetails")} // Adjust navigation accordingly
                style={styles.pressableButton}
              >
                <Text style={styles.buttonText}>Explore</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <FlatList
            data={courses}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()} // Ensure id is a string
            renderItem={({ item }) => (
              <View style={{ margin: 15, marginTop: 15 }}>
                <IndivisualCourseCard {...item.course} />
              </View>
            )}
            contentContainerStyle={styles.courseList}
          />
        )}
      </>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  EmptyContainer: {
    marginHorizontal: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    elevation: 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    height: 520,
  },
  pressableButton: {
    backgroundColor: colors.orange[400],
    borderRadius: 10,
    marginTop: 15,
    width: 100,
    height: 37,
  },
  buttonText: {
    fontSize: 14,
    padding: 10,
    textAlign: "center",
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    lineHeight: 21,
  },
});
