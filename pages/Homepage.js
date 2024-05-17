import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  getCreatorProfile,
  getEnrolledCourses,
  getEnrolledEbooks,
  getPastLiveClass,
  getPastWebinars,
  getProfile,
  getUpcomingLiveClass,
  getUpcomingWebinars,
} from "../utils/Authentication.js";
import EnrolledCourseCard from "../components/EnrolledCourseCard";
import EnrolledEbookCard from "../components/EnrolledEbookCard";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../components/LoadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import EmptyCourseImage from "../assets/EmptyEnrollCourse.png";
import colors from "../constants/colors";
import EmptyWebinar from "../assets/EmptyWebinar.png";
import WebinarCard from "../components/webinarCard";
import LiveClassCard from "../components/LiveClassCard";
import HomeScreenSkelton from "../components/Skelton/HomeScreenSkelton.js";

export default function Homepage() {
  const [courses, setCourses] = useState(null);
  const [ebooks, setEbooks] = useState(null);
  const [creatorProfile, setCreatorProfile] = useState();
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });
  const [dataUptoDate, setDataUpToDate] = useState(false);

  const { token } = useSelector((store) => store.auth);
  useEffect(() => {
    if (token && !dataUptoDate) {
      const fetchData = async () => {
        const creator = await getCreatorProfile();
        setCreatorProfile(creator);
        const coursesData = await getEnrolledCourses(token);
        const ebooksData = await getEnrolledEbooks(token);
        setCourses(coursesData);
        setEbooks(ebooksData);
        setDataUpToDate(true);
      };
      fetchData();
    }
  }, [token, dataUptoDate]);

  useEffect(() => {
    navigation.addListener("focus", () => setDataUpToDate(false));

    return () => {
      navigation.removeListener("focus");
    };
  }, [navigation]);

  const [upcoming, setUpcoming] = useState(true);
  const [past, setPast] = useState(false);
  const [upcomingWebinars, setUpcomingWebinars] = useState(null);
  const [pastWebinars, setPastWebinars] = useState(null);
  const [upcomingLive, setUpcomingLive] = useState(null);
  const [pastLive, setPastLive] = useState(null);
  const [upcomingLiveClass, setUpcomingLiveClass] = useState(true);
  const [pastLiveClass, setPastLiveClass] = useState(false);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const webinars = await getUpcomingWebinars(token);
        setUpcomingWebinars(webinars);
        const pastWebinar = await getPastWebinars(token);
        setPastWebinars(pastWebinar);
        const upcomingLiveClass = await getUpcomingLiveClass(token);
        setUpcomingLive(upcomingLiveClass);
        const pastLiveClass = await getPastLiveClass(token);
        setPastLive(pastLiveClass);
      };
      fetchData();
    }
  }, [token]);

  const ChangeUpcoming = () => {
    setUpcoming(true);
    setPast(false);
  };

  const ChangePast = () => {
    setUpcoming(false);
    setPast(true);
  };

  const ChangeUpcomingLive = () => {
    setUpcomingLiveClass(true);
    setPastLiveClass(false);
  };

  const ChangePastLive = () => {
    setUpcomingLiveClass(false);
    setPastLiveClass(true);
  };

  if (
    !ebooks ||
    !courses ||
    !upcomingLive ||
    !pastLive ||
    !upcomingWebinars ||
    !pastWebinars ||
    !creatorProfile
  ) {
    return <HomeScreenSkelton />;
  }

  if (!fontsLoaded) {
    return <HomeScreenSkelton />;
  }

  return (
    <View>
      <View style={styles.HeaderContainer}>
        <Image
          style={styles.Image}
          source={{
            uri: `https://delc45ezm9w02.cloudfront.net${creatorProfile?.image}`,
          }}
        />
        <Text style={styles.HeaderText}>From {creatorProfile?.name}</Text>
      </View>
      <ScrollView style={{ marginBottom: 100 }}>
        {courses && courses?.length !== 0 && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>Continue Learning</Text>
              <Pressable
                style={styles.viewAll}
                onPress={() => navigation.navigate("EnrolledCourse")}
              >
                <Text style={styles.viewAllText}>view all</Text>
                <AntDesign
                  style={styles.viewAllIcon}
                  name="right"
                  size={14}
                  color={colors.gray[500]}
                />
              </Pressable>
            </View>
            <FlatList
              data={courses}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) =>
                item?.courseId?.toString() ?? `course${index}`
              } // Ensure id is a string
              renderItem={({ item }) => (
                <View style={{ width: 260 }}>
                  <EnrolledCourseCard {...item.course} />
                </View>
              )}
              contentContainerStyle={styles.courseList}
            />
          </View>
        )}

        {courses.length === 0 && (
          <View>
            <Text
              style={[
                styles.sectionHeaderText,
                { paddingTop: 10, paddingLeft: 10 },
              ]}
            >
              Continue Learning
            </Text>
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
                  You have not enrolled in any course
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
                  Explore our many courses in the store
                </Text>
                <Pressable
                  onPress={() => navigation.navigate("Library")}
                  style={styles.pressableButton}
                >
                  <Text style={styles.buttonText}>Explore</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}

        {process.env.EXPO_PUBLIC_SHOW_EBOOKS === "true" && (
          <>
            {ebooks && ebooks?.length === 0 && (
              <View>
                <Text
                  style={[
                    styles.sectionHeaderText,
                    { paddingTop: 10, paddingLeft: 10 },
                  ]}
                >
                  Continue Learning
                </Text>
                <View style={styles.EmptyContainer}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
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
                      Kickstart your learning journey with Kroto. Dive in and
                      explore transformative insights today!
                    </Text>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("CourseDetails", { id: id })
                      }
                      style={styles.pressableButton}
                    >
                      <Text style={styles.buttonText}>Explore</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}

            {ebooks?.length !== 0 && (
              <View>
                <View style={[styles.sectionHeader, { marginTop: 20 }]}>
                  <Text style={styles.sectionHeaderText}>Continue Reading</Text>
                  <Pressable
                    onPress={() => navigation.navigate("EnrolledEbook")}
                    style={styles.viewAll}
                  >
                    <Text style={styles.viewAllText}>view all</Text>
                    <AntDesign
                      style={styles.viewAllIcon}
                      name="right"
                      size={14}
                      color={colors.gray[500]}
                    />
                  </Pressable>
                </View>
                <FlatList
                  data={ebooks}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) =>
                    item?.eBook?.id?.toString() ?? `ebook${index}`
                  } // Ensure id is a string
                  renderItem={({ item }) => (
                    <View style={{ width: 266, height: 130, marginBottom: 20 }}>
                      <EnrolledEbookCard {...item?.eBook?.product} />
                    </View>
                  )}
                  contentContainerStyle={styles.courseList}
                />
              </View>
            )}
          </>
        )}

        {process.env.EXPO_PUBLIC_SHOW_WEBINARS === "true" && (
          <View style={styles.EmptyContainerWebinar}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins_500Medium",
                paddingTop: 10,
                paddingLeft: 8,
              }}
            >
              Registered Webinars
            </Text>
            <View style={styles.sectionContainerWebinar}>
              <Pressable
                onPress={ChangeUpcoming}
                style={[
                  styles.courseButton,
                  upcoming
                    ? { backgroundColor: colors.orange[400] }
                    : { backgroundColor: "#ffffff" },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    upcoming
                      ? { color: "white", fontFamily: "Poppins_500Medium" }
                      : { color: "black" },
                  ]}
                >
                  Upcoming
                </Text>
              </Pressable>
              <Pressable
                onPress={ChangePast}
                style={[
                  styles.ebookButton,
                  past
                    ? { backgroundColor: colors.orange[400] }
                    : { backgroundColor: "#ffffff" },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    past
                      ? { color: "white", fontFamily: "Poppins_500Medium" }
                      : { color: "black" },
                  ]}
                >
                  Past
                </Text>
              </Pressable>
            </View>

            {upcoming && !past && (upcomingWebinars?.length ?? 0) === 0 && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image style={{ marginVertical: 20 }} source={EmptyWebinar} />
                <Text style={styles.emptyText}>
                  You have no upcoming webinars
                </Text>
                <Text style={{ textAlign: "center" }}>
                  Explore our upcoming webinars and register for them
                </Text>
                <Pressable
                  onPress={() => navigation.navigate("Webinar")}
                  style={styles.pressableButton}
                >
                  <Text style={styles.buttonText}>Explore</Text>
                </Pressable>
              </View>
            )}

            {upcoming &&
              upcomingWebinars?.length !== 0 &&
              upcomingWebinars?.map((e, index) => (
                <View key={index}>
                  <WebinarCard
                    {...e}
                    creatorImage={creatorProfile?.image}
                    creatorName={creatorProfile?.name}
                  />
                </View>
              ))}

            {past && !upcoming && pastWebinars?.length === 0 && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image style={{ marginVertical: 20 }} source={EmptyWebinar} />
                <Text style={styles.emptyText}>You have no past webinars</Text>
                <Text style={styles.emptyText}>
                  Explore our upcoming webinars and register for them
                </Text>
                <Pressable
                  onPress={() => navigation.navigate("Webinar")}
                  style={styles.pressableButton}
                >
                  <Text style={styles.buttonText}>Explore</Text>
                </Pressable>
              </View>
            )}

            {past &&
              pastWebinars?.length !== 0 &&
              pastWebinars?.map((e, index) => (
                <View key={index}>
                  <WebinarCard
                    {...e}
                    creatorImage={creatorProfile?.image}
                    creatorName={creatorProfile?.name}
                  />
                </View>
              ))}
          </View>
        )}

        <View style={styles.EmptyContainerWebinar}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_500Medium",
              paddingTop: 10,
              paddingLeft: 8,
            }}
          >
            Live Classes
          </Text>
          <View style={styles.sectionContainerWebinar}>
            <Pressable
              onPress={ChangeUpcomingLive}
              style={[
                styles.courseButton,
                upcomingLiveClass
                  ? { backgroundColor: colors.orange[400] }
                  : { backgroundColor: "#ffffff" },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  upcomingLiveClass
                    ? { color: "white", fontFamily: "Poppins_500Medium" }
                    : { color: "black" },
                ]}
              >
                Upcoming Live
              </Text>
            </Pressable>
            <Pressable
              onPress={ChangePastLive}
              style={[
                styles.ebookButton,
                pastLiveClass
                  ? { backgroundColor: colors.orange[400] }
                  : { backgroundColor: "#ffffff" },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  pastLiveClass
                    ? { color: "white", fontFamily: "Poppins_500Medium" }
                    : { color: "black" },
                ]}
              >
                Past Live
              </Text>
            </Pressable>
          </View>

          {upcomingLiveClass &&
            !pastLiveClass &&
            upcomingLive?.length === 0 && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image style={{ marginVertical: 20 }} source={EmptyWebinar} />
                <Text style={styles.emptyText}>No upcoming live classes</Text>
              </View>
            )}

          {upcomingLiveClass &&
            !pastLiveClass &&
            upcomingLive?.length !== 0 &&
            upcomingLive?.map((e, index) => (
              <View key={index}>
                <LiveClassCard
                  {...e}
                  creatorImage={creatorProfile?.image}
                  creatorName={creatorProfile?.name}
                />
              </View>
            ))}

          {pastLiveClass && !upcomingLiveClass && pastLive?.length === 0 && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image style={{ marginVertical: 20 }} source={EmptyWebinar} />
              <Text style={styles.emptyText}>No past live classes</Text>
            </View>
          )}

          {pastLiveClass &&
            !upcomingLiveClass &&
            pastLive?.length !== 0 &&
            pastLive?.map((e, index) => (
              <View key={index}>
                <LiveClassCard
                  {...e}
                  creatorImage={creatorProfile?.image}
                  creatorName={creatorProfile?.name}
                  isPast
                />
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContainer: {
    paddingTop: 40,
    flexDirection: "row",
    paddingLeft: 20,
    height: 100,
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 15,
  },
  Image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  HeaderText: {
    fontSize: 17,
    paddingLeft: 10,
    fontFamily: "Inter_500Medium",
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10, // Adjust vertical margin here
  },
  sectionHeaderText: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    lineHeight: 24,
  },
  viewAll: {
    flexDirection: "row",
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: colors.gray[500],
  },
  viewAllIcon: {
    paddingLeft: 3,
    paddingTop: 3,
  },
  courseList: {
    paddingHorizontal: 15,
  },
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
    height: 420,
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
  courseButton: {
    flex: 1,
    borderRadius: 25,
  },
  ebookButton: {
    flex: 1,
    backgroundColor: colors.orange[400],
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    paddingVertical: 5,
  },
  EmptyContainerWebinar: {
    marginHorizontal: 15,
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
  },
  sectionContainerWebinar: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
});
