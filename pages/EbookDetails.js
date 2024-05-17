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
import { Ionicons } from "@expo/vector-icons";

const EbookDetails = (props) => {
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
    const getCourse = async () => {
      const Course = await getEbookDetail(
        process.env.EXPO_PUBLIC_CREATOR_PROFILE,
        id
      );
      setCardData(Course);
    };
    getCourse();
  }, [id]);

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
                    {/* <Octicons
                      name="person"
                      size={20}
                      color={colors.gray[500]}
                    /> */}
                    <Ionicons
                      name="person-outline"
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
                marginVertical: 20,
                color: colors.gray[700],
                fontFamily: "Inter_600SemiBold",
                marginLeft: 5,
              }}
            >
              About this book
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
                  paddingLeft: 5,
                  paddingVertical: 10,
                  fontFamily: "Poppins_500Medium",
                  color: colors.orange[400],
                }}
              >
                {!expanded ? "Read more" : "Read less"}
              </Text>
            </Pressable>

            <View style={{ paddingLeft: 2 }}>
              {cardData?.eBook?.interactiveEbook?.course?.sections &&
                cardData.eBook.interactiveEbook.course.sections.map(
                  (e, index) => (
                    <Accordions
                      allChapters={cardData?.blocksChapters}
                      message={message}
                      key={index}
                      {...e}
                    />
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
              {!cardData?.permanentDiscount ||
              cardData?.permanentDiscount == "0"
                ? "Free"
                : `₹${cardData?.permanentDiscount}`}
            </Text>
            {cardData?.price ? (
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
                ₹{cardData?.price}
              </Text>
            ) : (
              ""
            )}
          </View>
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

export default EbookDetails;

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
    width: 142,
    alignItems: "center",
    height: 220,
  },
  imageUrl: {
    width: "95%",
    height: "100%",
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
    textAlign: "left",
    color: colors.gray[900],
    lineHeight: 21,
  },
  description: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: colors.gray[600],
    marginTop: 10,
    lineHeight: 18,
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
    paddingVertical: 7,
  },
  buttonText: {
    fontSize: 18,
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
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    paddingVertical: -15,
  },
  h2: {
    color: colors.gray[600],
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  h3: {
    color: colors.gray[600],
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  h4: {
    color: colors.gray[600],
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  p: {
    color: colors.gray[600],
    fontSize: 12,
    paddingVertical: 15,
    fontFamily: "Poppins_400Regular",
  },
});
