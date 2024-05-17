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
import { getEbookDetail } from "../utils/Authentication.js";
import colors from "../constants/colors";
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
import DetailsEbookSkelton from "../components/Skelton/DetailsEbookSkelton";

const EnrolledEbookDetails = (props) => {
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
    getEbookDetail(process.env.EXPO_PUBLIC_CREATOR_PROFILE, id).then((course) =>
      setCardData(course)
    );
  }, [id]);

  const ToggleShow = () => {
    setMessage(!message);
  };

  const ToggleReadMore = () => {
    setExpanded(!expanded);
  };

  if (!fontsLoaded || !cardData) {
    return <DetailsEbookSkelton />;
  }

  return (
    <>
      <ScrollView style={{ marginBottom: 60 }}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: cardData?.thumbnail }}
                  style={styles.imageUrl}
                />
              </View>
              <View style={{ width: "60%", paddingLeft: 10 }}>
                <View style={{ marginLeft: 0 }}>
                  <Text style={styles.title}>{cardData?.title}</Text>
                </View>
                <View>
                  <Text style={styles.description}>
                    {cardData?.ogDescription}
                  </Text>
                </View>
                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <Octicons
                      name="person"
                      size={20}
                      color={colors.gray[500]}
                    />
                    <Text style={styles.detailText}>self paced</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 19,
                marginVertical: 10,
                color: colors.gray[700],
                fontFamily: "Inter_600SemiBold",
              }}
            >
              About this book
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
              {cardData?.eBook?.interactiveEbook?.course?.sections &&
                cardData.eBook.interactiveEbook.course.sections.map(
                  (e, index) => (
                    <Accordions message={message} key={index} {...e} />
                  )
                )}
            </View>
          </View>
        </View>
        <View></View>
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
              fontFamily: "Inter_700Bold",
              paddingTop: 10,
            }}
          >
            ₹ 250{" "}
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

export default EnrolledEbookDetails;

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
    width: "40%",
    alignItems: "center",
  },
  imageUrl: {
    width: "100%",
    height: 230,
    marginTop: 10,
    marginLeft: 5,
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
    textAlign: "left",
    color: colors.gray[900],
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: colors.gray[600],
    marginTop: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginLeft: 5,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
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
    fontFamily: "Inter_500Medium",
  },
  stickyBottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    zIndex: 1, // Ensure it stays above other components
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
    fontSize: 16,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
});
