import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getCreatorProfile,
  getWebinarDetails,
} from "../utils/Authentication.js";
import colors from "../constants/colors";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import DetailsCourseSkelton from "../components/Skelton/DetailsCourseSkelton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import formatTimestamp from "../components/FormateTime.js";
import HTML from "react-native-render-html";

const WebinarDetails = (props) => {
  const { id } = props.route.params;
  const [creator, setCreator] = useState();

  const [cardData, setCardData] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const { width } = useWindowDimensions();

  const ToggleReadMore = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const webinar = async () => {
      const webinarsDet = await getWebinarDetails(id);
      const creator = await getCreatorProfile(
        process.env.EXPO_PUBLIC_CREATOR_PROFILE
      );
      setCreator(creator);
      setCardData(webinarsDet);
    };
    webinar();
  }, []);

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
            <View style={{ width: "97%", justifyContent: "center" }}>
              <Text style={styles.title}>{cardData?.title}</Text>
            </View>
            <View style={styles.HeaderContainer}>
              <Image
                style={styles.Image}
                source={{
                  uri: `https://delc45ezm9w02.cloudfront.net${creator?.image}`,
                }}
              />
              <Text style={styles.HeaderText}>{creator?.name}</Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 8 }}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="calendar-number-outline"
                  size={18}
                  color={colors.gray[600]}
                />
                <Text style={styles.description}>
                  {formatTimestamp(cardData?.datetime).date}
                </Text>
              </View>
              <View style={{ flexDirection: "row", paddingLeft: 20 }}>
                <Ionicons
                  name="time-outline"
                  size={18}
                  color={colors.gray[600]}
                />
                <Text style={styles.description}>
                  {formatTimestamp(cardData?.datetime).time.slice(0, 5)}-
                  {formatTimestamp(cardData?.endTime).time}
                </Text>
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
              About
            </Text>
            <View style={{ marginLeft: 5 }}>
              <HTML
                source={{
                  html: expanded
                    ? cardData?.description
                    : getShortenedDescription(cardData?.description),
                }}
                contentWidth={width}
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
            {cardData?.parmanentDiscount ? (
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
                ₹{cardData?.parmanentDiscount}
              </Text>
            ) : (
              ""
            )}
          </View>
          <Pressable style={styles.pressableButton}>
            <Text style={styles.buttonText}>Join now</Text>
          </Pressable>
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

export default WebinarDetails;

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
    color: "#0A0A0A",
    lineHeight: 24,
    marginHorizontal: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: colors.gray[600],
    lineHeight: 18,
    justifyContent: "center",
    marginLeft: 8,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
    marginLeft: 15,
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
    width: "50%",
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
  HeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 8,
  },
  Image: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  HeaderText: {
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: "Poppins_400Regular",
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
