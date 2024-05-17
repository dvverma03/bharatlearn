import {
  Image,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SignIn from "./pages/Signin.js";
import Verification from "./pages/Verification.js";
import { Link, NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "./store/appStore.js";
import Homepage from "./pages/Homepage.js";
import Library from "./pages/Library.js";
import Webinar from "./pages/Webinar.js";
import Profile from "./pages/Profile.js";
import EditProfile from "./pages/EditProfile.js";
import Queries from "./pages/Queries.js";
import Testimonials from "./pages/Testimonials.js";
import CourseDetails from "./pages/CourseDetails.js";
import EnrolledCourses from "./pages/EnrolledCourses.js";
import EnrolledEbooks from "./pages/EnrolledEbooks.js";
import EnrolledCourseDetails from "./pages/EnrolledCourseDetails.js";
import EnrolledEbookDetails from "./pages/EnrolledEbookDetails.js";
import EbookDetails from "./pages/EbookDetails.js";
import ParticularChapter from "./pages/ParticularChapter.js";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./constants/colors.js";
import * as Linking from "expo-linking";
import ChapterList from "./components/ChapterList.js";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getProfile } from "./utils/Authentication.js";
import LoadingOverlay from "./components/LoadingOverlay.js";
import { useFonts } from "expo-font";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";
import WebinarDetails from "./pages/WebinarDetails.js";
import { Entypo } from "@expo/vector-icons";
import { initializeToken } from "./store/tokenSlice.js";

const prefix = Linking.createURL(`https://${process.env.EXPO_PUBLIC_DOMAIN}`);

function AppHelper() {
  const Drawer = createDrawerNavigator();
  const Stack = createNativeStackNavigator();
  const { isAuthenticated } = useSelector((store) => store.auth);

  const UnAuthentication = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={SignIn} name="SignIn"></Stack.Screen>
        <Stack.Screen
          component={Verification}
          name="Verification"
        ></Stack.Screen>
      </Stack.Navigator>
    );
  };

  const LibraryScreen = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Library"
        component={Library}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  const ProfileScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Queries" component={Queries} />
        <Stack.Screen name="Testimonials" component={Testimonials} />
      </Stack.Navigator>
    );
  };

  const HomePageScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnrolledCourse"
          component={EnrolledCourses}
          options={{ headerTitle: "" }}
        />
        <Stack.Screen
          name="EnrolledEbook"
          component={EnrolledEbooks}
          options={{ headerTitle: "" }}
        />
      </Stack.Navigator>
    );
  };

  const Authenticate = () => {
    const Tab = createBottomTabNavigator();

    const { token } = useSelector((store) => store.auth);

    const [userData, setUserData] = useState(null);

    const [fontsLoaded] = useFonts({
      Poppins_500Medium,
    });

    useEffect(() => {
      if (token) {
        getProfile(token).then((d) => setUserData(d));
      }
    }, [token]);

    if (!fontsLoaded) return <LoadingOverlay />;

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;

            if (route.name === "Home") {
              icon = (
                <View style={{ paddingTop: 10 }}>
                  <Svg width="25" height="25" viewBox="0 0 14 14" fill="none">
                    <G clip-path="url(#clip0_1222_22615)">
                      <Path
                        d="M13.5 6.94C13.501 6.8012 13.473 6.66372 13.4179 6.53632C13.3628 6.40892 13.2818 6.29438 13.18 6.2L7.00002 0.5L0.820023 6.2C0.718248 6.29438 0.637236 6.40892 0.582143 6.53632C0.52705 6.66372 0.499084 6.8012 0.500023 6.94V12.5C0.500023 12.7652 0.60538 13.0196 0.792916 13.2071C0.980452 13.3946 1.23481 13.5 1.50002 13.5H12.5C12.7652 13.5 13.0196 13.3946 13.2071 13.2071C13.3947 13.0196 13.5 12.7652 13.5 12.5V6.94Z"
                        fill={focused ? colors.orange[100] : "white"}
                      />
                      <Path
                        d="M13.5 6.94C13.501 6.8012 13.473 6.66372 13.4179 6.53632C13.3628 6.40892 13.2818 6.29438 13.18 6.2L7.00002 0.5L0.820023 6.2C0.718248 6.29438 0.637236 6.40892 0.582143 6.53632C0.52705 6.66372 0.499084 6.8012 0.500023 6.94V12.5C0.500023 12.7652 0.60538 13.0196 0.792916 13.2071C0.980452 13.3946 1.23481 13.5 1.50002 13.5H12.5C12.7652 13.5 13.0196 13.3946 13.2071 13.2071C13.3947 13.0196 13.5 12.7652 13.5 12.5V6.94Z"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M7 13.5V9.5"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </G>
                    <Defs>
                      <ClipPath id="clip0_1222_22615">
                        <Rect width="14" height="14" fill="white" />
                      </ClipPath>
                    </Defs>
                  </Svg>
                </View>
              );
            } else if (route.name === "LibraryScreen") {
              icon = (
                <View style={{ paddingTop: 10 }}>
                  <Svg
                    width="25"
                    height="25"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <G clip-path="url(#clip0_1222_27555)">
                      <Path
                        d="M4.77015 4V4.9977C4.77015 5.52691 4.55992 6.03445 4.18571 6.40866C3.8115 6.78286 3.30396 6.99309 2.77475 6.99309H2.4954C1.96618 6.99309 1.45865 6.78286 1.08444 6.40866C0.710229 6.03445 0.5 5.52691 0.5 4.9977V4"
                        fill={focused ? colors.orange[100] : "white"}
                      />
                      <Path
                        d="M4.77015 4V4.9977C4.77015 5.52691 4.55992 6.03445 4.18571 6.40866C3.8115 6.78286 3.30396 6.99309 2.77475 6.99309H2.4954C1.96618 6.99309 1.45865 6.78286 1.08444 6.40866C0.710229 6.03445 0.5 5.52691 0.5 4.9977V4"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M13.5 4V4.9977C13.5 5.52691 13.2898 6.03445 12.9156 6.40866C12.5413 6.78286 12.0338 6.99309 11.5046 6.99309H11.2552C10.726 6.99309 10.2184 6.78286 9.84422 6.40866C9.47001 6.03445 9.25978 5.52691 9.25978 4.9977V4"
                        fill={focused ? colors.orange[100] : "white"}
                      />
                      <Path
                        d="M13.5 4V4.9977C13.5 5.52691 13.2898 6.03445 12.9156 6.40866C12.5414 6.78286 12.0338 6.99309 11.5046 6.99309H11.2552C10.726 6.99309 10.2184 6.78286 9.84422 6.40866C9.47001 6.03445 9.25978 5.52691 9.25978 4.9977V4"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M1.5 8.5V13C1.5 13.1326 1.55268 13.2598 1.64645 13.3536C1.74021 13.4473 1.86739 13.5 2 13.5H12C12.1326 13.5 12.2598 13.4473 12.3536 13.3536C12.4473 13.2598 12.5 13.1326 12.5 13V8.5"
                        fill="white"
                      />
                      <Path
                        d="M9.25978 4V4.9977C9.25978 5.52691 9.04955 6.03445 8.67534 6.40866C8.30113 6.78286 7.7936 6.99309 7.26439 6.99309H6.76554C6.23633 6.99309 5.72879 6.78286 5.35458 6.40866C4.98037 6.03445 4.77014 5.52691 4.77014 4.9977V4"
                        fill={focused ? colors.orange[100] : "white"}
                      />
                      <Path
                        d="M1.5 10H8V13.5H1.5V10Z"
                        fill={focused ? colors.orange[100] : "white"}
                      />
                      <Path
                        d="M1.5 8.5V13C1.5 13.1326 1.55268 13.2598 1.64645 13.3536C1.74021 13.4473 1.86739 13.5 2 13.5H12C12.1326 13.5 12.2598 13.4473 12.3536 13.3536C12.4473 13.2598 12.5 13.1326 12.5 13V8.5"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M8 8.5V13.5"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M1.5 10H8"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M0.5 4L2 0.5H12L13.5 4H0.5Z"
                        fill={focused ? colors.orange[100] : "white"}
                      />
                      <Path
                        d="M0.5 4L2 0.5H12L13.5 4H0.5Z"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M9.25979 4V4.9977C9.25979 5.52691 9.04956 6.03445 8.67535 6.40866C8.30114 6.78286 7.7936 6.99309 7.26439 6.99309H6.76554C6.23633 6.99309 5.72879 6.78286 5.35458 6.40866C4.98037 6.03445 4.77015 5.52691 4.77015 4.9977V4"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </G>
                    <Defs>
                      <ClipPath id="clip0_1222_27555">
                        <Rect width="14" height="14" fill="white" />
                      </ClipPath>
                    </Defs>
                  </Svg>
                </View>
              );
            } else if (route.name === "ProfileScreen") {
              icon = userData ? (
                <View
                  className={`border-2 aspect-square mt-[10px] rounded-full overflow-hidden ${
                    focused ? "border-orange-500" : "border-gray-300"
                  }`}
                >
                  <Image
                    className={`h-7 w-7 aspect-square object-cover rounded-full`}
                    source={{ uri: userData?.image }}
                  />
                </View>
              ) : (
                <></>
              );
            } else if (route.name === "Webinar") {
              icon = (
                <View style={{ paddingTop: 10 }}>
                  <Svg
                    width="25"
                    height="25"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <G clip-path="url(#clip0_1222_29675)">
                      <Path
                        d="M12.652 0.5H3.11194V8.97632H12.652C13.1208 8.97632 13.5008 8.59629 13.5008 8.1275V1.34882C13.5008 0.88003 13.1208 0.5 12.652 0.5Z"
                        fill="white"
                      />
                      <Path
                        d="M6.34961 0.5H12.652C13.1208 0.5 13.5008 0.88003 13.5008 1.34882V8.1275C13.5008 8.59629 13.1208 8.97632 12.652 8.97632H7.5"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M3.14854 4.00107C4.11534 4.00107 4.89908 3.21733 4.89908 2.25053C4.89908 1.28374 4.11534 0.5 3.14854 0.5C2.18175 0.5 1.39801 1.28374 1.39801 2.25053C1.39801 3.21733 2.18175 4.00107 3.14854 4.00107Z"
                        fill={focused ? colors.orange[100] : "white"}
                      />
                      <Path
                        d="M9 5.52747C9 4.96001 8.53999 4.5 7.97253 4.5H3.14893C1.68597 4.5 0.500001 5.68596 0.5 7.14893V9.5H1.63525L2.01367 13.5H4.28418L5.15625 6.55493H7.97253C8.53999 6.55493 9 6.09492 9 5.52747Z"
                        fill={focused ? colors.orange[100] : "white"}
                      />
                      <Path
                        d="M3.14854 4.00107C4.11534 4.00107 4.89908 3.21733 4.89908 2.25053C4.89908 1.28374 4.11534 0.5 3.14854 0.5C2.18175 0.5 1.39801 1.28374 1.39801 2.25053C1.39801 3.21733 2.18175 4.00107 3.14854 4.00107Z"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M9 5.52747C9 4.96001 8.53999 4.5 7.97253 4.5H3.14893C1.68597 4.5 0.500001 5.68596 0.5 7.14893V9.5H1.63525L2.01367 13.5H4.28418L5.15625 6.55493H7.97253C8.53999 6.55493 9 6.09492 9 5.52747Z"
                        stroke={focused ? colors.orange[500] : colors.gray[500]}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </G>
                    <Defs>
                      <ClipPath id="clip0_1222_29675">
                        <Rect width="14" height="14" fill="white" />
                      </ClipPath>
                    </Defs>
                  </Svg>
                </View>
              );
            }

            return icon;
          },
          tabBarLabel: ({ focused }) => {
            if (route.name === "Home") {
              return (
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    color: focused ? colors.gray[700] : colors.gray[500],
                    paddingBottom: Platform.OS === "ios" ? 0 : 7,
                  }}
                >
                  Home
                </Text>
              );
            } else if (route.name === "LibraryScreen") {
              return (
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    color: focused ? colors.gray[700] : colors.gray[500],
                    paddingBottom: Platform.OS === "ios" ? 0 : 7,
                  }}
                >
                  Store
                </Text>
              );
            } else if (route.name === "ProfileScreen") {
              return (
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    color: focused ? colors.gray[700] : colors.gray[500],
                    paddingBottom: Platform.OS === "ios" ? 0 : 7,
                  }}
                >
                  Profile
                </Text>
              );
            } else if (route.name === "Webinar") {
              return (
                <Text
                  style={{
                    fontFamily: "Poppins_500Medium",
                    color: focused ? colors.gray[700] : colors.gray[500],
                    paddingBottom: Platform.OS === "ios" ? 0 : 7,
                  }}
                >
                  Webinar
                </Text>
              );
            }
          },

          headerShown: false,
          tabBarStyle: {
            paddingHorizontal: 15,
            height: Platform.OS === "ios" ? 100 : 80,
            borderColor: colors.gray[400],
            borderTopWidth: 0.5,
            borderWidth: 0,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomePageScreen} />
        <Tab.Screen name="LibraryScreen" component={LibraryScreen} />
        <Tab.Screen name="Webinar" component={Webinar} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  const ChapterScreen = (props) => {
    const { title } = useSelector((store) => store.player);

    return (
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          drawerStyle: {
            width: 350,
          },
          drawerPosition: "right",
          drawerType: "slide",
          headerTitle: title,
          headerLeft: () => (
            <AntDesign
              onPress={() => {
                navigation.pop();
              }}
              style={{ marginLeft: 10, marginTop: 5 }}
              name="arrowleft"
              size={26}
              color={colors.gray[500]}
            />
          ),
          headerRight: () => (
            <FontAwesome5
              name="list-ol"
              style={{ paddingRight: 16 }}
              onPress={() => navigation.toggleDrawer()}
              size={22}
              color={colors.gray[600]}
            />
          ),
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: colors.gray[200],
          },
        })}
        drawerContent={({ navigation }) => (
          <ChapterList navigation={navigation} />
        )}
      >
        <Drawer.Screen name="ParticularChapter" component={ParticularChapter} />
      </Drawer.Navigator>
    );
  };

  const Details = () => {
    return (
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <AntDesign
              onPress={() => {
                navigation.pop();
              }}
              style={{ marginTop: 5 }}
              name="arrowleft"
              size={26}
              color={colors.gray[500]}
            />
          ),
        })}
        drawerContent={({ navigation }) => (
          <ChapterList navigation={navigation} />
        )}
      >
        <Stack.Screen
          name="Authenticate"
          component={Authenticate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EbookDetails"
          component={EbookDetails}
          options={{
            headerTitle: "",
            headerRight: () => (
              <Entypo
                onPress={async () => {
                  await Share.share({
                    message: `Hey, Checkout BharatLearn App https://expo://bharatlearnapp://`,
                  });
                }}
                name="share"
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Stack.Screen
          name="CourseDetails"
          component={CourseDetails}
          options={{
            headerTitle: "",

            headerRight: () => (
              <Entypo
                onPress={async () => {
                  await Share.share({
                    message: `Hey, checkout BharatLearn App https://com.kroto.bharatlearnguru`,
                  });
                }}
                name="share"
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Stack.Screen
          name="edit screen"
          component={EditProfile}
          options={{
            headerTitle: "Edit Profile",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#ffff",
            },
          }}
        />
        <Stack.Screen
          name="EnrolledCourseDetails"
          component={EnrolledCourseDetails}
          options={{
            headerTitle: "",
            headerRight: () => (
              <Entypo
                onPress={async () => {
                  await Share.share({
                    message: `Hey, checkout BharatLearn App https://com.kroto.bharatlearnguru`,
                  });
                }}
                name="share"
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Stack.Screen
          name="EnrolledEbookDetails"
          component={EnrolledEbookDetails}
          options={{
            headerTitle: "",
            headerRight: () => (
              <Entypo
                onPress={async () => {
                  await Share.share({
                    message: `Hey, checkout BharatLearn App https://com.kroto.bharatlearnguru`,
                  });
                }}
                name="share"
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Stack.Screen
          name="ChapterScreen"
          component={ChapterScreen}
          options={() => ({
            headerShown: false,
            headerRight: () => (
              <Entypo
                onPress={async () => {
                  await Share.share({
                    message: `Hey, checkout BharatLearn App https://com.kroto.bharatlearnguru`,
                  });
                }}
                name="share"
                size={24}
                color="black"
              />
            ),
          })}
        />
        <Stack.Screen
          name="WebinarDetails"
          component={WebinarDetails}
          options={{
            headerTitle: "",
            headerRight: () => (
              <Entypo
                onPress={async () => {
                  await Share.share({
                    message: `Hey, checkout BharatLearn App https://com.kroto.bharatlearnguru`,
                  });
                }}
                name="share"
                size={24}
                color="black"
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <>
      {!isAuthenticated && <UnAuthentication />}
      {isAuthenticated && <Details />}
    </>
  );
}

const AsyncProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeToken());
  }, []);

  return children;
};

export default App = () => {
  const linking = {
    prefixes: [prefix],
  };

  return (
    <Provider store={appStore}>
      <AsyncProvider>
        <NavigationContainer linking={linking}>
          <AppHelper />
        </NavigationContainer>
      </AsyncProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
