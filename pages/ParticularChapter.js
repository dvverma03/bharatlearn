import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import {
  getChapterProgress,
  getCourseDetail,
  getProgressEnroll,
  updateChapterProgress,
  updateLastChapterWatched,
} from "../utils/Authentication.js";
import { setCurrentChapter } from "../store/playerSlice.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../constants/colors.js";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function ParticularChapter(props) {
  const { currentChapter, courseId } = useSelector((store) => store.player);
  const { token } = useSelector((store) => store.auth);
  const [completed, setCompleted] = useState(false);

  const { id } = props.route.params;
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      if (id && token) {
        const course = await getCourseDetail(
          process.env.EXPO_PUBLIC_CREATOR_PROFILE,
          id
        );
        const progress = await getProgressEnroll(id, token);
        const lastChapter = progress?.lastChapterId
          ? course?.blocksChapters?.find(
              (bc) => bc?.id === progress?.lastChapterId
            )
          : course?.blocksChapters[0];

        if (course) {
          dispatch(
            setCurrentChapter({
              currentChapter: lastChapter?.id,
              courseId: course?.id,
              title: `${
                course?.blocksChapters?.find((bc) => bc?.id === lastChapter?.id)
                  ?.accumulatedPosition + 1
              }. ${lastChapter?.title}`,
            })
          );
          setCourseData(course);
        }
      }
    };
    getDetails();
  }, [id, token]);

  useEffect(() => {
    if (currentChapter && token && courseId) {
      getChapterProgress(currentChapter, token).then((data) => {
        setCompleted(!!data?.watched);
      });

      updateLastChapterWatched(courseId, currentChapter, token);
    }
  }, [currentChapter, token, courseId]);

  if (!currentChapter) return <></>;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      tabBar={() => (
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            gap: 6,
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 12,
            backgroundColor: "white",
            borderColor: colors.gray[200],
            borderTopWidth: 1,
          }}
        >
          {!completed ? (
            <Pressable
              onPress={async () => {
                void updateChapterProgress(currentChapter, true, token)?.then(
                  (updatedProgress) => {
                    if (updatedProgress) setCompleted(updatedProgress?.watched);
                  }
                );
                setCompleted(true);
              }}
              style={[styles.CompleteButton]}
            >
              <Entypo name="circle" size={22} color={colors.orange[300]} />
              <Text
                style={{
                  fontSize: 17,
                  padding: 10,
                  textAlign: "center",
                  fontFamily: "Inter_500Medium",
                  color: colors.orange[400],
                }}
              >
                Complete
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={async () => {
                void updateChapterProgress(currentChapter, false, token)?.then(
                  (updatedProgress) => {
                    if (updatedProgress) setCompleted(updatedProgress?.watched);
                  }
                );
                setCompleted(false);
              }}
              style={[styles.CompleteButton]}
            >
              <AntDesign
                name="checkcircle"
                size={24}
                color={colors.orange[400]}
              />
              <Text
                style={{
                  fontSize: 17,
                  padding: 10,
                  textAlign: "center",
                  fontFamily: "Inter_500Medium",
                  color: colors.orange[400],
                }}
              >
                Complete
              </Text>
            </Pressable>
          )}

          {courseData?.blocksChapters?.find((bc) => bc?.id === currentChapter)
            ?.accumulatedPosition +
            1 <
            courseData?.blocksChapters?.length && (
            <Pressable
              onPress={() => {
                const nextChapter =
                  courseData?.blocksChapters[
                    courseData?.blocksChapters?.find(
                      (bc) => bc?.id === currentChapter
                    )?.accumulatedPosition + 1
                  ];

                dispatch(
                  setCurrentChapter({
                    currentChapter: nextChapter?.id,
                    courseId,
                    title: `${nextChapter?.accumulatedPosition + 1}. ${
                      nextChapter?.title
                    }`,
                  })
                );
              }}
              style={[styles.NextButton]}
            >
              <Text
                style={{
                  fontSize: 17,
                  padding: 10,
                  textAlign: "center",
                  fontFamily: "Inter_500Medium",
                  color: "white",
                }}
              >
                Next
              </Text>
              <AntDesign
                style={{ color: "white" }}
                name="right"
                size={18}
                color={colors.gray[500]}
              />
            </Pressable>
          )}
        </View>
      )}
    >
      <Tab.Screen
        name="ParticularChapterInternal"
        component={ParticularChapterInternal}
      />
    </Tab.Navigator>
  );
}

function ParticularChapterInternal({ id }) {
  const { currentChapter, courseId } = useSelector((store) => store.player);
  const { token } = useSelector((store) => store.auth);

  if (!currentChapter) return <></>;

  return (
    <WebView
      source={{
        uri: `https://www.kroto.in/${process.env.EXPO_PUBLIC_CREATOR_PROFILE}/course/${courseId}/embed/player/${currentChapter}?token=${token}`,
      }}
      style={{ flex: 1 }}
      domStorageEnabled
      allowsFullscreenVideo
      javaScriptCanOpenWindowsAutomatically
      allowsInlineMediaPlayback
      javaScriptEnabled
    />
  );
}

const styles = StyleSheet.create({
  CompleteButton: {
    borderColor: colors.orange[400],
    borderWidth: 2,
    backgroundColor: "white",
    color: colors.orange[400],
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  NextButton: {
    backgroundColor: colors.orange[400],
    borderColor: colors.orange[400],
    borderRadius: 10,
    borderWidth: 2,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
});
