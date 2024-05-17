import { StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../constants/colors";

export default function AllEnrollCourseSkelton() {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10,
        width: 246,
        height: 258,
        flexDirection: "column",
        gap: 4,
      }}
      className="p-4 bg-white"
    >
      <View className="w-full h-32 rounded-lg bg-gray-200"></View>
      <View className="w-full h-4 mt-4 rounded-full bg-gray-200"></View>
      <View className="w-[40%] mt-4 h-4 rounded-full bg-gray-200"></View>
    </View>
  );
}
