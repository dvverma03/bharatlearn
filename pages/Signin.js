import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { SignInFormValidation } from "../utils/Validate";
import { Entypo } from "@expo/vector-icons";
import { login } from "../utils/Authentication.js";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addUser } from "../store/signinSlice";
import LoadingOverlay from "../components/LoadingOverlay";
import colors from "../constants/colors";
import * as WebBrowser from "expo-web-browser";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import PhoneInput from "react-native-phone-number-input";
import { AntDesign } from "@expo/vector-icons";
import Icon from "../assets/adaptive-icon.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [agree, setAgree] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searching, setSearching] = useState(false);
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState("");
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <LoadingOverlay />;
  }

  const SignInHandler = async () => {
    const NotValid = SignInFormValidation(
      email,
      `+${phoneInput?.current?.state?.code}${phoneInput?.current?.state?.number}`
    );
    if (!agree) {
      Alert.alert("Please check the terms and condition box");
    } else {
      if (NotValid) {
        setError(NotValid);
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        const contactNumber = phoneInput?.current?.state?.number;
        const countryCode = `+${phoneInput?.current?.state?.code}`;

        setSearching(true);
        try {
          const User = await login(email, contactNumber, countryCode);
          if (User) {
            dispatch(addUser({ email, contactNumber, countryCode }));
            navigation.replace("Verification");
          }
        } catch (error) {
          Alert.alert("Error", "Invalid credential. Please try again later.", [
            { text: "OK" },
          ]);
        } finally {
          setSearching(false);
        }
      }
    }
  };

  const ToggleAgree = () => {
    setAgree(!agree);
  };

  if (searching) return <LoadingOverlay />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        styles.Container,
        { padding: 0, backgroundColor: "red", width: "100%" },
      ]}
    >
      <View style={[styles.Container]}>
        <Image className="h-60 w-60 translate-y-8" source={Icon} />

        <View style={styles.FormContainer}>
          <View>
            <Text style={styles.EmailText}>Email</Text>
            <TextInput
              placeholderTextColor={colors.gray[300]}
              placeholder="you@mail.com"
              style={styles.InputEmail}
              value={email}
              onChangeText={setEmail}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.EmailText}>Phone</Text>
            <View
              style={{
                width: "92%",
                borderWidth: 2,
                borderColor: colors.gray[200],
                marginHorizontal: 15,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <PhoneInput
                ref={phoneInput}
                defaultValue={contact}
                defaultCode="IN"
                layout="second"
                placeholder="0000000000"
                onChangeText={(text) => {
                  setContact(text);
                }}
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                }}
                containerStyle={{
                  alignItems: "center",
                  flexDirection: "row",
                }}
                textContainerStyle={{
                  backgroundColor: "white",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingLeft: 0,
                  paddingTop: 15,
                  paddingBottom: 8,
                }}
                textInputProps={{
                  fontSize: 19,
                  placeholderTextColor: colors.gray[200],
                  fontFamily: "Poppins_400Regular",
                }}
                codeTextStyle={{
                  fontSize: 19,
                  fontFamily: "Poppins_400Regular",
                  paddingTop: 5,
                }}
              />
            </View>
          </View>
          {error && <Text style={styles.Error}>{error}</Text>}

          <Pressable
            // onPress={() => {
            //   Linking.openURL("com.kroto.bharatlearnguru://");
            // }}
            onPress={SignInHandler}
            style={styles.PressableButton}
          >
            <Text style={styles.ButtonText}>Sign in</Text>
          </Pressable>
          <View style={styles.SignupLinkContainer}>
            <Pressable style={{ paddingTop: 2 }} onPress={ToggleAgree}>
              {!agree ? (
                <Entypo name="circle" size={22} color="gray" />
              ) : (
                <AntDesign name="checkcircle" size={22} color="gray" />
              )}
            </Pressable>

            <Text
              style={{
                fontSize: 16,
                color: colors.gray[400],
                fontFamily: "Poppins_400Regular",
              }}
            >
              By signing up, you agree to the{" "}
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  color: colors.gray[600],
                }}
                onPress={async () => {
                  const url = `https://www.kroto.in/${process.env.EXPO_PUBLIC_CREATOR_PROFILE}/terms-of-service`;
                  await WebBrowser.openBrowserAsync(url);
                }}
              >
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  color: colors.gray[600],
                }}
                onPress={async () => {
                  const url = `https://www.kroto.in/${process.env.EXPO_PUBLIC_CREATOR_PROFILE}/privacy-policy`;
                  await WebBrowser.openBrowserAsync(url);
                }}
              >
                Privacy Policy
              </Text>{" "}
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.orange[400],
    height: "100%",
    alignItems: "center",
    width: "100%",
    padding: 0,
  },

  FormContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
    width: "100%",
    marginTop: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  SignInText: {
    paddingLeft: 15,
    fontSize: 20,
    marginTop: 20,
    fontFamily: "Poppins_500Medium",
    lineHeight: 27,
  },
  InputEmail: {
    borderColor: "#eae3e3",
    borderWidth: 2,
    padding: 14,
    paddingBottom: 15,
    paddingLeft: 20,
    fontSize: 20,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  EmailText: {
    fontSize: 16,
    padding: 10,
    paddingLeft: 15,
    marginTop: 15,
    fontFamily: "Poppins_400Regular",
  },
  PressableButton: {
    backgroundColor: colors.orange[400],
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 25,
  },
  ButtonText: {
    fontSize: 18,
    padding: 8,
    textAlign: "center",
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  SignupLinkContainer: {
    flexDirection: "row",
    paddingTop: 15,
    paddingHorizontal: 15,
    gap: 10,
  },
  Error: {
    color: "red",
    fontSize: 16,
    paddingLeft: 15,
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
  },
});
