import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getCourseDetail } from "../utils/Authentication.js";
import colors from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { setCurrentChapter } from "../store/playerSlice";

export default function ChapterList({ navigation }) {
  const [courseData, setCourseData] = useState(null);
  const [sectionsOpen, setSectionsOpen] = useState([]);

  const { courseId } = useSelector((state) => state.player);
  const { currentChapter } = useSelector((store) => store?.player);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCourse = async () => {
      if (courseId && currentChapter) {
        const courseData = await getCourseDetail(
          process.env.EXPO_PUBLIC_CREATOR_PROFILE,
          courseId
        );

        if (courseData) {
          setCourseData(courseData);
          setSectionsOpen(
            courseData?.sections?.map((section) =>
              section?.chapters?.some((sc) => sc?.id === currentChapter)
                ? true
                : false
            )
          );
        }
      }
    };
    getCourse();
  }, [courseId, currentChapter]);

  if (!courseData) {
    return <></>;
  }

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: 14,
          paddingTop: 40,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: colors.gray[600],
            paddingLeft: 2,
            fontWeight: 500,
          }}
        >
          Chapters
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            width: "100%",
          }}
        >
          {courseData?.sections?.map((section, sectionIdx) => (
            <View key={section.id} style={styles.accordion} className="w-full">
              <View style={styles.wrapper}>
                <Pressable
                  style={{ width: "90%" }}
                  onPress={() => {
                    setSectionsOpen(
                      sectionsOpen?.map((so, soIdx) =>
                        soIdx === sectionIdx ? !so : so
                      )
                    );
                  }}
                >
                  <View className="flex flex-row items-center w-full justify-between">
                    <Text
                      style={{
                        fontSize: 14,
                        paddingHorizontal: 3,
                        fontFamily: "Poppins_400Regular",
                        paddingVertical: 5,
                        color: colors.gray[600],
                        width: "90%",
                      }}
                      className="overflow-hidden line-clamp-2 text-ellipsis w-full"
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {section?.title}
                    </Text>

                    <Entypo
                      name={
                        sectionsOpen[sectionIdx]
                          ? "chevron-small-up"
                          : "chevron-small-down"
                      }
                      size={24}
                      color={colors.gray[500]}
                    />
                  </View>
                </Pressable>
                <View className="flex gap-4 flex-col w-full pl-3">
                  {sectionsOpen[sectionIdx] && (
                    <>
                      {!!section?.chapters &&
                        section?.chapters.map((chapter) => (
                          <Pressable
                            key={chapter.id}
                            onPress={() => {
                              dispatch(
                                setCurrentChapter({
                                  currentChapter: chapter?.id,
                                  courseId: courseId,
                                  title: `${
                                    courseData?.blocksChapters?.find(
                                      (b) => b?.id === chapter?.id
                                    )?.accumulatedPosition + 1
                                  }. ${chapter?.title}`,
                                })
                              );

                              navigation.toggleDrawer();
                            }}
                            style={{ width: "100%" }}
                          >
                            <View
                              className={`flex w-full px-1 items-center flex-row gap-2 border-2 border-gray-300 pb-[5px] pt-0 rounded-lg ${
                                currentChapter === chapter?.id
                                  ? "border-orange-300 bg-orange-100"
                                  : "border-gray-300"
                              }`}
                            >
                              <View
                                className={`w-7 h-7 aspect-square rounded-full flex items-center justify-center ${
                                  currentChapter === chapter?.id
                                    ? "bg-orange-500"
                                    : "bg-neutral-700"
                                }`}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Poppins_400Regular",
                                    fontSize: 14,
                                    paddingTop: 3,
                                    color: "white",
                                  }}
                                >
                                  {(courseData?.blocksChapters?.find(
                                    (bc) => bc?.id === chapter.id
                                  )?.accumulatedPosition ?? 0) + 1}
                                </Text>
                              </View>
                              <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={[
                                  styles.TextC,
                                  {
                                    fontFamily: "Poppins_400Regular",
                                    color:
                                      currentChapter === chapter?.id
                                        ? colors.gray[700]
                                        : colors.gray[600],
                                  },
                                ]}
                                className="overflow-hidden line-clamp-2 text-ellipsis w-[80%]"
                              >
                                {chapter?.title}
                              </Text>
                            </View>
                          </Pressable>
                        ))}
                    </>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  accordion: {
    borderColor: colors.gray[200],
    borderWidth: 2,
    padding: 8,
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: "center",
  },
  wrapper: {
    gap: 8,
    width: "100%",
    flexDirection: "column",
  },
  TextC: {
    fontSize: 14,
    color: colors.gray[500],
    flexDirection: "row",
    gap: 2,
  },
});
