import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../constants/colors";
export default function DetailsCourseSkelton() {
  return (
    <View style={styles.Container}>
      <View
        style={{
          backgroundColor: "#ffffff",
          height: 90,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: 100,
            backgroundColor: colors.gray[200],
            marginLeft: 10,
            marginTop: 40,
          }}
        ></View>
        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: 100,
            backgroundColor: colors.gray[200],
            marginLeft: 230,
            marginTop: 40,
          }}
        ></View>
        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: 100,
            backgroundColor: colors.gray[200],
            marginLeft: 10,
            marginTop: 40,
          }}
        ></View>
      </View>

      <View style={styles.FormContainer}>
        <View style={{ paddingTop: 20 }}>
          <View style={styles.containerElevation}>
            <View
              style={{
                width: "93%",
                height: 175,
                borderRadius: 10,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 10,
              }}
            ></View>
            <View
              style={{
                width: 215,
                height: 20,
                borderRadius: 10,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 12,
              }}
            ></View>
            <View
              style={{
                width: 255,
                height: 20,
                borderRadius: 10,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 12,
              }}
            ></View>
            <View
              style={{
                width: 215,
                height: 20,
                borderRadius: 10,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 12,
              }}
            ></View>
            <View
              style={{
                width: "93%",
                height: 35,
                borderRadius: 10,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 12,
              }}
            ></View>
            <View
              style={{
                width: "93%",
                height: 35,
                borderRadius: 10,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 12,
              }}
            ></View>
            <View
              style={{
                width: "93%",
                height: 175,
                borderRadius: 10,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 10,
              }}
            ></View>
            <View
              style={{
                width: 215,
                height: 25,
                borderRadius: 10,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 12,
              }}
            ></View>
            <View
              style={{
                width: 255,
                height: 25,
                borderRadius: 10,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 12,
              }}
            ></View>
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              justifyContent: "space-between",
              alignItems: "center",
              height: 70,
              zIndex: 100,
            }}
          >
            <View
              style={{
                backgroundColor: colors.gray[200],
                height: 25,
                width: 100,
                borderRadius: 10,
                paddingRight: 35,
              }}
            ></View>
            <View
              style={{
                backgroundColor: colors.gray[200],
                height: 35,
                width: 200,
                borderRadius: 10,
                marginLeft: 35,
              }}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: "100%",
    alignItems: "center",
  },
  FormContainer: {
    backgroundColor: colors.gray[200],
    flex: 1,
    width: "100%",
  },
  containerElevation: {
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
  },
});
