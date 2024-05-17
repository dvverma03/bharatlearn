import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import HTMLView from "react-native-htmlview";
import { getCourseDetail } from "../utils/Authentication.js";
import colors from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import Accordions from "../components/Accordions";
import DetailsCourseSkelton from "../components/Skelton/DetailsCourseSkelton";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CourseDetails = (props) => {
  const { token } = useSelector((store) => store.auth);
  const navigation = useNavigation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (token) {
        const getCourse = async () => {
          const Course = await getCourseDetail(
            process.env.EXPO_PUBLIC_CREATOR_PROFILE,
            id,
            token
          );
          setCardData(Course);
          if (cardData?.isEnrolled) WebBrowser.dismissBrowser();
        };
        getCourse();
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [token]);

  const { id } = props.route.params;
  const [cardData, setCardData] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const ToggleReadMore = () => {
    setExpanded(!expanded);
  };

  if (!cardData || !fontsLoaded) {
    return <DetailsCourseSkelton />;
  }

  return (
    <>
      <ScrollView style={{ marginBottom: 60 }}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: cardData?.thumbnail }}
                objectFit="cover"
                height={192}
                style={{ borderRadius: 10, width: "100%" }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 5,
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              {cardData?.tags?.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  {cardData?.tags?.map((e, index) => (
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
                {cardData?.averageRating > 0 && (
                  <Text
                    style={{ fontFamily: "Poppins_500Medium", fontSize: 14 }}
                  >
                    {cardData?.averageRating}
                  </Text>
                )}
                {cardData?.averageRating > 0 && (
                  <AntDesign
                    name="star"
                    size={12}
                    color="black"
                    style={{ paddingTop: 4 }}
                  />
                )}
              </View>
              {cardData?.feedbacks?.length > 0 && (
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                    paddingLeft: 5,
                  }}
                >
                  ({cardData?.feedbacks?.length})
                </Text>
              )}
            </View>
            <View style={{ marginLeft: 0 }}>
              <Text style={styles.title}>{cardData?.title}</Text>
            </View>
            <View>
              <Text style={styles.description}>{cardData?.ogDescription}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <AntDesign
                  name="clockcircleo"
                  size={15}
                  color={colors.gray[500]}
                />

                <Text style={styles.detailText}>32 Chapters</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={colors.gray[500]}
                />
                <Text style={styles.detailText}>self paced</Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 16,
                marginVertical: 10,
                color: colors.gray[600],
                fontFamily: "Poppins_500Medium",
                marginLeft: 5,
              }}
            >
              About this course
            </Text>
            <View style={{ marginLeft: 5 }}>
              <HTMLView
                value={
                  expanded
                    ? cardData?.htmlDescription
                    : getShortenedDescription(cardData?.htmlDescription)
                }
                stylesheet={htmlStyles}
              />
            </View>
            <Pressable onPress={ToggleReadMore}>
              <Text
                style={{
                  fontSize: 15,
                  paddingLeft: 6,
                  paddingVertical: 10,
                  fontFamily: "Poppins_500Medium",
                  color: colors.orange[400],
                }}
              >
                {!expanded ? "Read more" : "Read less"}
              </Text>
            </Pressable>

            <View style={{ marginLeft: 3 }}>
              {cardData?.sections &&
                cardData?.sections.map((e, index) => (
                  <Accordions
                    allChapters={cardData?.blocksChapters}
                    {...e}
                    key={index}
                  />
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <Pressable style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            height: 60,
            zIndex: 100,
          }}
        >
          {!cardData?.isEnrolled ? (
            <View
              style={{
                width: "50%",
                flexDirection: "row",
                paddingLeft: 10,
                alignItems: "center",
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
                {!cardData?.price || cardData?.price == "0"
                  ? "Free"
                  : `₹${cardData?.price}`}
              </Text>
              {cardData?.slashedPrice ? (
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Inter_400Regular",
                    paddingLeft: 10,
                    color: colors.gray[700],
                    textDecorationLine: "line-through",
                    alignItems: "center",
                  }}
                >
                  ₹{cardData?.slashedPrice}
                </Text>
              ) : (
                ""
              )}
            </View>
          ) : (
            <></>
          )}
          {cardData?.isEnrolled ? (
            <Pressable
              onPress={() => {
                navigation.navigate("ChapterScreen", {
                  screen: "ParticularChapter",
                  params: { id: id },
                });
              }}
              style={styles.pressableButton}
            >
              <Text style={styles.buttonText}>Play</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={async () => {
                const url = `https://www.kroto.in/${process.env.EXPO_PUBLIC_CREATOR_PROFILE}/course/${id}/checkout?manual_close=1&token=${token}`;
                await WebBrowser.openBrowserAsync(url);
              }}
              style={styles.pressableButton}
            >
              <Text style={styles.buttonText}>Enroll Now</Text>
            </Pressable>
          )}
        </View>
      </Pressable>
    </>
  );
};

const getShortenedDescription = (description) => {
  const words = description?.split(" ");
  const shortDescription = words?.slice(0, 40).join(" ");
  return shortDescription + "...";
};

export default CourseDetails;

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
    marginTop: 10,
  },

  imageContainer: {
    width: "97%",
    alignItems: "center",
    borderRadius: 10,
    height: 200,
    marginHorizontal: 8,
    marginTop: 8,
  },
  imageUrl: {
    width: "100%",
    borderRadius: 10,
    height: 192,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
    textAlign: "left",
    paddingLeft: 5,
    color: "#0A0A0A",
    lineHeight: 24,
  },
  description: {
    fontSize: 12,
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
    marginLeft: 8,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colors.gray[600],
  },
  pressableButton: {
    backgroundColor: colors.orange[400],
    borderRadius: 10,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    marginRight: 15,
    marginLeft: 15,
    paddingVertical: 7,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontFamily: "Inter_500Medium",
  },
});

const htmlStyles = StyleSheet.create({
  h1: {
    color: colors.gray[600],
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    paddingVertical: -15,
  },
  h2: {
    color: colors.gray[600],
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  h3: {
    color: colors.gray[600],
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  h4: {
    color: colors.gray[600],
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
  },
  p: {
    color: colors.gray[600],
    fontSize: 12,
    paddingHorizontal: 5,
    fontFamily: "Poppins_400Regular",
  },
});
