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
import { Octicons } from "@expo/vector-icons";
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

const EnrolledCourseDetails = (props) => {
  const { id } = props.route.params;
  const [cardData, setCardData] = useState();
  const [message, setMessage] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  useEffect(() => {
    getCourseDetail(process.env.EXPO_PUBLIC_CREATOR_PROFILE, id).then(
      (course) => setCardData(course)
    );
  }, [id]);

  const ToggleReadMore = () => {
    setExpanded(!expanded);
  };

  if (!fontsLoaded || !cardData) {
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
                style={styles.Image}
              />
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
                  size={16}
                  color={colors.gray[500]}
                />
                <Text style={styles.detailText}>32 Chapters</Text>
              </View>
              <View style={styles.detailItem}>
                <Octicons name="person" size={16} color={colors.gray[500]} />
                <Text style={styles.detailText}>self paced</Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 16,
                marginVertical: 10,
                color: colors.gray[700],
                fontFamily: "Poppins_500Medium",
              }}
            >
              About this course
            </Text>
            <View style={expanded ? styles.ReadMore : styles.ReadLess}>
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
                  fontSize: 17,
                  paddingLeft: 3,
                  paddingVertical: 10,
                  fontFamily: "Poppins_500Medium",
                  color: colors.orange[400],
                }}
              >
                {!expanded ? "Read More" : "Read Less"}
              </Text>
            </Pressable>

            <View>
              {cardData?.sections &&
                cardData?.sections.map((e, index) => (
                  <Accordions message={message} {...e} key={index} />
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
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
          <Text
            style={{
              flex: 0.8,
              fontSize: 25,
              paddingLeft: 15,
              fontFamily: "Poppins_500Medium",
              paddingTop: 10,
              color: colors.orange[400],
            }}
          >
            ₹ 1999{" "}
          </Text>
          <Pressable style={styles.pressableButton}>
            <Text style={styles.buttonText}>Enroll Now</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const getShortenedDescription = (description) => {
  const words = description?.split(" ");
  const shortDescription = words?.slice(0, 40).join(" ");
  return shortDescription + "...";
};

export default EnrolledCourseDetails;

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
    width: "100%",
    height: 185,
  },
  imageUrl: {
    width: "100%",
    height: 175,
    borderRadius: 10,
  },
  Image: {
    height: 175,
    width: "100%",
    borderRadius: 20,
    padding: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
    textAlign: "left",
    paddingLeft: 5,
    color: colors.gray[900],
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
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
    fontSize: 14,
    color: colors.gray[600],
  },
  pressableButton: {
    backgroundColor: colors.orange[400],
    borderRadius: 10,
    margin: 10,
    width: "100%",
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    padding: 10,
    textAlign: "center",
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});

const htmlStyles = StyleSheet.create({
  h1: {
    color: colors.gray[600],
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
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
    fontSize: 14,
    paddingHorizontal: 5,
    fontFamily: "Poppins_400Regular",
  },
});
