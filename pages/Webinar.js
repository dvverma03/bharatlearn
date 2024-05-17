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
import { getAllWebinars, getCreatorProfile } from "../utils/Authentication.js";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../components/LoadingOverlay.js";
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
import colors from "../constants/colors.js";
import EmptyWebinar from "../assets/EmptyWebinar.png";
import WebinarCard from "../components/webinarCard.js";
import { useSelector } from "react-redux";

export default function Homepage() {
  const navigation = useNavigation();
  const [upcomingWebinars, setUpcomingWebinars] = useState(null);
  const [creatorProfile, setCreatorProfile] = useState("");
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
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const creator = await getCreatorProfile();
        setCreatorProfile(creator);
        const webinars = await getAllWebinars();
        setUpcomingWebinars(webinars);
      };
      fetchData();
    }
  }, [token]);

  if (!fontsLoaded) {
    return <LoadingOverlay />;
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
      <View style={styles.EmptyContainer}>
        {!upcomingWebinars ||
          (upcomingWebinars?.length === 0 && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image style={{ marginVertical: 20 }} source={EmptyWebinar} />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  paddingBottom: 5,
                  color: colors.gray[500],
                }}
              >
                There are no upcoming webinars
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: colors.gray[500],
                }}
              >
                Meanwhile have a look through our list of courses in the store
              </Text>
              <Pressable
                onPress={() => navigation.navigate("LibraryScreen")}
                style={styles.pressableButton}
              >
                <Text style={styles.buttonText}>Explore</Text>
              </Pressable>
            </View>
          ))}

        {upcomingWebinars &&
          upcomingWebinars?.map((e, index) => (
            <ScrollView>
              <WebinarCard
                key={index}
                {...e}
                creatorImage={creatorProfile?.image}
                creatorName={creatorProfile?.name}
              />
            </ScrollView>
          ))}
      </View>
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
  sectionContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    paddingBottom: 10,
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
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    paddingVertical: 5,
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
    height: "85%",
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
