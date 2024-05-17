import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { VerifyUser, login } from "../utils/Authentication.js";
import { useDispatch, useSelector } from "react-redux";
import { addtoken, setToken } from "../store/tokenSlice";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import colors from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VerificationSkelton from "../components/Skelton/VerificationSkelton";
import HomeScreenSkelton from "../components/Skelton/HomeScreenSkelton";
import Icon from "../assets/adaptive-icon.png";

export default function Verification() {
  const e1 = useRef("");
  const e2 = useRef("");
  const e3 = useRef("");
  const e4 = useRef("");
  const e5 = useRef("");
  const e6 = useRef("");
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [d3, setD3] = useState("");
  const [d4, setD4] = useState("");
  const [d5, setD5] = useState("");
  const [d6, setD6] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resend, setResend] = useState(false);
  const navigation = useNavigation();
  const Otp = `${d1}${d2}${d3}${d4}${d5}${d6}`;
  const data = useSelector((store) => store.contact);
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (d1 && d2 && d3 && d4 && d5 && d6) {
      VerifyOtp();
    }
  }, [d1, d2, d3, d4, d5, d6]);

  if (!fontsLoaded) {
    return <VerificationSkelton />;
  }

  const VerifyOtp = async () => {
    setVerifying(true);
    try {
      const Verified = await VerifyUser(
        data.email,
        data.contactNumber,
        data.countryCode,
        Otp
      );
      if (Verified) {
        dispatch(setToken(Verified.jwtToken));
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Try again.");
    } finally {
      setVerifying(false);
    }
  };

  const ResendOTPHandler = async () => {
    setResend(true);
    try {
      await login(data.email, data.contactNumber, data.countryCode);
    } catch (error) {
      Alert.alert("Error", "Some thing went wrong. Please try again later.");
    } finally {
      setResend(false);
    }
  };

  if (verifying) {
    return <HomeScreenSkelton />;
  }

  if (resend) {
    return <VerificationSkelton />;
  }

  return (
    <View style={styles.Container}>
      <Image className="h-60 w-60 translate-y-8" source={Icon} />

      <View style={styles.FormContainer}>
        <View>
          <AntDesign
            onPress={() => {
              navigation.replace("SignIn");
            }}
            style={{ marginLeft: 10, marginTop: 20 }}
            name="arrowleft"
            size={26}
            color="#4c4b4b"
          />
        </View>
        <Text style={styles.SignInText}> OTP Verification</Text>
        <View>
          <Text
            style={{
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 10,
              color: colors.gray[500],
              fontFamily: "Inter_400Regular",
            }}
          >
            Enter the verification code we've just sent to the{" "}
            {data.countryCode}
            {data.contactNumber}
          </Text>
        </View>
        <View style={styles.OtpContainer}>
          <TextInput
            ref={e1}
            value={d1}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d1.length >= 1 ? colors.orange[400] : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD1(txt);
                e2.current.focus();
              } else if (txt.length <= 0) {
                e1.current.focus();
                setD1("");
              }
            }}
          ></TextInput>
          <TextInput
            ref={e2}
            value={d2}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d2.length >= 1 ? colors.orange[400] : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD2(txt);
                e3.current.focus();
              } else if (txt.length <= 0) {
                setD2("");
                e1.current.focus();
              }
            }}
          ></TextInput>
          <TextInput
            ref={e3}
            value={d3}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d3.length >= 1 ? colors.orange[400] : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD3(txt);
                e4.current.focus();
              } else if (txt.length <= 0) {
                setD3("");
                e2.current.focus();
              }
            }}
          ></TextInput>
          <TextInput
            ref={e4}
            value={d4}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d4.length >= 1 ? colors.orange[400] : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD4(txt);
                e5.current.focus();
              } else if (txt.length <= 0) {
                setD4("");
                e3.current.focus();
              }
            }}
          ></TextInput>
          <TextInput
            ref={e5}
            value={d5}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d5.length >= 1 ? colors.orange[400] : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD5(txt);
                e6.current.focus();
              } else if (txt.length <= 0) {
                setD5("");
                e4.current.focus();
              }
            }}
          ></TextInput>
          <TextInput
            ref={e6}
            value={d6}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              { borderColor: d6.length >= 1 ? colors.orange[400] : "#d2d7d2" },
            ]}
            onChangeText={(txt) => {
              if (txt.length >= 1) {
                setD6(txt);
                e6.current.focus();
              } else if (txt.length <= 0) {
                setD6("");
                e5.current.focus();
              }
            }}
          ></TextInput>
        </View>

        <Pressable onPress={ResendOTPHandler}>
          <Text
            style={{
              fontSize: 17,
              paddingLeft: 10,
              paddingTop: 15,
              fontFamily: "Inter_500Medium",
            }}
          >
            Resend Code
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.orange[400],
    height: "100%",
    alignItems: "center",
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
    paddingLeft: 5,
    fontSize: 20,
    marginTop: 15,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 5,
  },
  PressableButton: {
    backgroundColor: colors.orange[400],
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 25,
  },
  ButtonText: {
    fontSize: 17,
    padding: 10,
    textAlign: "center",
    color: "white",
    fontFamily: "Inter_500Medium",
  },
  otpBox: {
    borderColor: "gray",
    borderWidth: 2,
    width: 46,
    height: 50,
    borderRadius: 8,
    marginHorizontal: 5,
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
  OtpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
