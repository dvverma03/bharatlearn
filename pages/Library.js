import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import EbookCard from "../components/EbookCard";
import { getCourses, getEbooks, getProfile } from "../utils/Authentication.js";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import EmptyCourseImage from "../assets/EmptyCourse.png";
import EmptyEbookImage from "../assets/EmptyEbook.png";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useSelector } from "react-redux";
import CourseLibrarySkelton from "../components/Skelton/CourseLibrarySkelton";
import EbookLibrarySkelton from "../components/Skelton/EbookLibrarySkelton";

export default function Library() {
  const [course, setCourse] = useState(true);
  const [ebook, setEbook] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [ebookData, setEbookData] = useState(null);
  const [profile, setProfile] = useState("");
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    if (token) {
      const getData = async () => {
        const response = await getCourses(
          process.env.EXPO_PUBLIC_CREATOR_PROFILE
        );
        const ebooks = await getEbooks(process.env.EXPO_PUBLIC_CREATOR_PROFILE);
        setCourseData(response);
        setEbookData(ebooks);
      };
      const fetchProfile = async () => {
        try {
          const profileData = await getProfile(token);
          setProfile(profileData);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      getData();
      fetchProfile();
    }
  }, [token]);

  const ChangeCourse = () => {
    setCourse(true);
    setEbook(false);
  };

  const ChangeEbook = () => {
    setCourse(false);
    setEbook(true);
  };

  if (!fontsLoaded || !courseData) {
    return <CourseLibrarySkelton />;
  }

  if (!ebookData) {
    return <EbookLibrarySkelton />;
  }

  return (
    <View style={styles.container}>
      {process.env.EXPO_PUBLIC_SHOW_EBOOKS === "true" && (
        <View style={styles.sectionContainer}>
          <Pressable
            onPress={ChangeCourse}
            style={[
              styles.courseButton,
              course
                ? { backgroundColor: colors.orange[400] }
                : { backgroundColor: "#ffffff" },
            ]}
          >
            <Text
              style={[
                styles.text,
                course
                  ? { color: "white", fontFamily: "Inter_600SemiBold" }
                  : { color: "black" },
              ]}
            >
              Courses
            </Text>
          </Pressable>
          <Pressable
            onPress={ChangeEbook}
            style={[
              styles.ebookButton,
              ebook
                ? { backgroundColor: colors.orange[400] }
                : { backgroundColor: "#ffffff" },
            ]}
          >
            <Text
              style={[
                styles.text,
                ebook
                  ? { color: "white", fontFamily: "Inter_600SemiBold" }
                  : { color: "black" },
              ]}
            >
              Ebooks
            </Text>
          </Pressable>
        </View>
      )}

      {ebook && !course && ebookData?.length == 0 && (
        <ScrollView>
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
                onPress={() => navigation.navigate("CourseDetails", { id: id })}
                style={styles.pressableButton}
              >
                <Text style={styles.buttonText}>Explore</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}

      {course && !ebook && courseData?.length == 0 && (
        <ScrollView>
          <View style={styles.EmptyContainer}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={EmptyEbookImage} />
              <Text
                style={{
                  fontSize: 14,
                  paddingVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontFamily: "Poppins_500Medium",
                  lineHeight: 21,
                }}
              >
                Your gateway to expert insights awaits
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
                Unlock valuable knowledge with our eBook on Kroto. Dive into
                expert insights and elevate your understanding effortlessly!
              </Text>
              <Pressable
                onPress={() => navigation.navigate("CourseDetails", { id: id })}
                style={styles.pressableButton}
              >
                <Text style={styles.buttonText}>Explore</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}

      {course && !ebook && courseData && (
        <ScrollView>
          {courseData.map((e, index) => (
            <View key={index} style={{ marginTop: 20 }}>
              <CourseCard key={index} {...e} />
            </View>
          ))}
        </ScrollView>
      )}

      {ebook && !course && ebookData && (
        <ScrollView>
          {ebookData.map((e, index) => (
            <View key={index} style={{ marginTop: 20 }}>
              <EbookCard key={index} {...e} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  sectionContainer: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
  },
  courseButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 25,
  },
  ebookButton: {
    flex: 1,
    backgroundColor: colors.orange[400],
    marginHorizontal: 8,
    borderRadius: 25,
  },
  text: {
    fontSize: 20,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    paddingVertical: 5,
  },
  EmptyContainer: {
    justifyContent: "center",
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
    height: 620,
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
