import { StyleSheet, Text, View, Image, Pressable, Share } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { getCreatorProfile, getProfile } from "../utils/Authentication.js";
import LoadingOverlay from "../components/LoadingOverlay";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../store/tokenSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function Profile() {
  const navigation = useNavigation();
  const [profile, setProfile] = useState("");
  const [remove, setRemove] = useState(false);
  const [creatorProfile, setCreatorProfile] = useState("");
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const { token } = useSelector((store) => store.auth);

  const fetchProfile = async () => {
    try {
      const creator = await getCreatorProfile();
      setCreatorProfile(creator);
      const profileData = await getProfile(token);
      setProfile(profileData);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchProfile();
    });

    return unsubscribe;
  }, [navigation]);

  const removeToken = async () => {
    try {
      setRemove(true);
      dispatch(clearToken());
      setRemove(false);
    } catch (error) {
      console.error("Error removing token:", error);
    } finally {
      setRemove(false);
    }
  };

  if (remove) {
    <LoadingOverlay />;
  }

  if (!fontsLoaded) {
    return <LoadingOverlay />;
  }

  return (
    <View>
      <View style={styles.HeaderContainer}>
        {!!creatorProfile?.image && (
          <Image
            style={styles.Image}
            source={{
              uri: `https://delc45ezm9w02.cloudfront.net${creatorProfile?.image}`,
            }}
          />
        )}
        <Text style={styles.HeaderText}>From {creatorProfile?.name}</Text>
      </View>
      <View style={styles.ProfileContainer}>
        {!!profile?.image && (
          <Image
            style={styles.Profile}
            source={{
              uri: profile?.image,
            }}
          />
        )}
        <View style={{ paddingLeft: 20, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 16,
              paddingBottom: 5,
              fontFamily: "Poppins_500Medium",
              lineHeight: 24,
            }}
          >
            {profile?.name}
          </Text>
          <Text
            style={{
              color: colors.gray[500],
              fontFamily: "Poppins_400Regular",
              fontSize: 13,
            }}
          >
            Welcome Back
          </Text>
        </View>
      </View>
      <View style={styles.GeneralSection}>
        <Text
          style={{
            fontSize: 16,
            color: colors.gray[400],
            fontFamily: "Poppins_500Medium",
            lineHeight: 24,
            paddingLeft: 15,
            paddingTop: 6,
          }}
        >
          General
        </Text>
        <Pressable
          onPress={() => navigation.navigate("edit screen")}
          style={styles.Sections}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color={colors.gray[400]}
          />
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 15,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Edit profile
          </Text>
        </Pressable>
        <Pressable
          onPress={async () => {
            await Share.share({
              message: `Hey, checkout BharatLearn App https://com.kroto.bharatlearnguru`,
            });
          }}
          style={styles.Sections}
        >
          <Entypo name="share" size={24} color={colors.gray[400]} />
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 15,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Share
          </Text>
        </Pressable>

        <Pressable onPress={removeToken} style={styles.Sections}>
          <MaterialIcons name="logout" size={24} color="#FF5858" />
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 15,
              color: "#FF5858",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Sign out
          </Text>
        </Pressable>
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
  ProfileContainer: {
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
    marginTop: 20,
    flexDirection: "row",
    marginBottom: 8,
  },
  Image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  Profile: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  HeaderText: {
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  ThemeContainer: {
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
    margin: 10,
    height: 110,
  },
  Sections: {
    flexDirection: "row",
    paddingVertical: 10,
    marginVertical: 3,
    paddingLeft: 14,
  },
  GeneralSection: {
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
    margin: 10,
  },
});
