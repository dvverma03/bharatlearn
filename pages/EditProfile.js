import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { editProfile, getProfile } from "../utils/Authentication.js"; // Import getProfile
import { launchImageLibraryAsync } from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "../components/LoadingOverlay";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Edit() {
  const [contact, setContact] = useState("");
  const [name, setName] = useState("Enter your name");
  const [bio, setBio] = useState(" describe yourself");
  const [image, setImage] = useState("");
  const [picked, setPicked] = useState(false);
  const navigation = useNavigation();
  const [profile, setProfile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [update, setUpdate] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const { token } = useSelector((store) => store.auth);
  async function urlToBase64(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        };
        reader.onerror = () => {
          reject(new Error("Error reading image data"));
        };
      });
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (token) {
      const profilePicker = async () => {
        try {
          const Profile = await getProfile(token);

          setProfile(Profile);
          {
            Profile?.name && setName(Profile?.name);
          }
          {
            Profile?.bio && setBio(Profile?.bio);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      profilePicker();
    }
  }, [token]);

  const editHandler = async () => {
    try {
      if (!image) {
        setUpdate(true);
        const imageUrl = await urlToBase64(profile?.image);
        await editProfile(token, bio, name, imageUrl);
        setUpdate(false);
        navigation.navigate("Profile");
      } else if (!name || !bio) {
        Alert.alert("Name and Bio field should not be empty");
      } else {
        setUpdate(true);
        const edit = await editProfile(token, bio, name, image);
        setUpdate(false);
        Alert.alert("Profile Image update may take some times");
        navigation.navigate("Profile");
      }
    } catch (error) {
      console.error("Error editing profile:", error);
    } finally {
      setUpdate(false);
    }
  };

  const pickImageAsync = async () => {
    try {
      setPicked(true);
      let result = await launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.3,
        base64: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        setImageUrl(result.assets[0]);
        setImage(result.assets[0].base64);
      } else {
        setPicked(false);
        Alert.alert("You did not select any image.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error picking image. Please try again later.");
    }
  };

  if (update) {
    return <LoadingOverlay />;
  }

  if (!fontsLoaded) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.Container}>
      <ScrollView>
        <View style={styles.EditHeader}>
          {!picked && (
            <Image style={styles.Image} source={{ uri: profile?.image }} />
          )}
          {picked && (
            <Image style={styles.Image} source={{ uri: imageUrl.uri }} />
          )}
          <Pressable onPress={pickImageAsync}>
            <MaterialCommunityIcons
              name="pencil-outline"
              style={styles.EditIcon}
              size={24}
              color={colors.orange[400]}
            />
          </Pressable>
        </View>

        <View style={styles.FormContainer}>
          <View>
            <Text style={styles.EmailText}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              style={styles.InputEmail}
              placeholderTextColor={colors.gray[400]}
            />
          </View>
          <View>
            <Text style={styles.EmailText}>Bio</Text>
            <TextInput
              placeholder="Describe yourself"
              style={styles.InputBio}
              value={bio}
              onChangeText={setBio}
              multiline={true}
              numberOfLines={10}
              placeholderTextColor={colors.gray[400]}
            />
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
          <Pressable onPress={editHandler} style={styles.PressableButton}>
            <Text style={styles.ButtonText}>Save Changes</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
    minHeight: "100%",
  },
  EditHeader: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "center",
  },
  Image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  EditIcon: {
    position: "relative",
    right: 40,
    top: -10,
    backgroundColor: colors.orange[200],
    borderRadius: 20,
    padding: 5,
  },
  FormContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
    width: "100%",
    marginTop: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  SignInText: {
    paddingLeft: 15,
    fontSize: 22,
    marginTop: 10,
    fontWeight: "600",
  },
  InputEmail: {
    borderColor: "#eae3e3",
    borderWidth: 2,
    padding: 10,
    fontSize: 16,
    marginHorizontal: 10,
    borderRadius: 5,
    fontFamily: "Poppins_400Regular",
    color: "black",
  },
  InputBio: {
    flex: 1,
    width: "94%",
    height: 150,
    color: "#FFF",
    textAlignVertical: "top", // android fix for centering it at the top-left corner
    borderWidth: 2,
    borderColor: colors.gray[200],
    color: "black",
    marginLeft: 10,
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 5,
    fontFamily: "Poppins_400Regular",
  },
  InputPhone: {
    borderColor: colors.gray[300],
    borderWidth: 2,
    padding: 8,
    fontSize: 18,
    marginHorizontal: 10,
    borderRadius: 5,
    color: colors.gray[300],
  },
  EmailText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingLeft: 10,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
  },
  PressableButton: {
    backgroundColor: "#fd872e",
    borderRadius: 10,
    width: "90%",
    marginBottom: 20,
    height: 50,
    justifyContent: "center",
  },
  ButtonText: {
    fontSize: 16,
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "Poppins_500Medium",
  },
  SignupLinkContainer: {
    flexDirection: "row",
    paddingRight: 10,
    textAlign: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});
