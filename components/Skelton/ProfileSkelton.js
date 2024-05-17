import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";
export default function HomeScreenSkelton() {
  return (
    <View>
      <View style={styles.HeaderContainer}>
        <Text
          style={{
            backgroundColor: colors.gray[200],
            width: 35,
            height: 35,
            borderRadius: 35,
          }}
        ></Text>
        <Text
          style={{
            backgroundColor: colors.gray[200],
            width: 200,
            height: 25,
            marginLeft: 20,
            borderRadius: 10,
          }}
        >
          {" "}
        </Text>
      </View>
      <View>
        <View style={[styles.containerElevationProfile]}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: 80,
                height: 85,
                borderRadius: 100,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 10,
              }}
            ></View>
            <View>
              <View
                style={{
                  width: 215,
                  height: 17,
                  borderRadius: 10,
                  backgroundColor: colors.gray[200],
                  marginLeft: 10,
                  marginTop: 12,
                }}
              ></View>
              <View
                style={{
                  width: 255,
                  height: 17,
                  borderRadius: 10,
                  backgroundColor: colors.gray[200],
                  marginLeft: 10,
                  marginTop: 12,
                }}
              ></View>
            </View>
          </View>
        </View>
        <View style={[styles.containerElevationTheme]}>
          <View
            style={{
              width: 80,
              height: 17,
              borderRadius: 100,
              backgroundColor: colors.gray[200],
              marginLeft: 10,
              marginTop: 10,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                width: 115,
                height: 17,
                borderRadius: 10,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 12,
              }}
            ></View>
            <View
              style={{
                width: 155,
                height: 17,
                borderRadius: 10,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 12,
              }}
            ></View>
          </View>
        </View>
        <View style={[styles.containerElevationSection]}>
          <View
            style={{
              width: 80,
              height: 17,
              borderRadius: 100,
              backgroundColor: colors.gray[200],
              marginLeft: 10,
              marginTop: 10,
            }}
          ></View>
          <View
            style={{
              width: 155,
              height: 17,
              borderRadius: 10,
              backgroundColor: colors.gray[200],
              marginLeft: 10,
              marginTop: 12,
            }}
          ></View>
          <View
            style={{
              width: 155,
              height: 17,
              borderRadius: 10,
              backgroundColor: colors.gray[200],
              marginLeft: 10,
              marginTop: 12,
            }}
          ></View>
          <View
            style={{
              width: 125,
              height: 17,
              borderRadius: 10,
              backgroundColor: colors.gray[200],
              marginLeft: 10,
              marginTop: 12,
            }}
          ></View>
        </View>
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
  containerElevationProfile: {
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
    height: 120,
  },
  containerElevationTheme: {
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
    height: 100,
  },
  containerElevationSection: {
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
    height: 160,
  },
});
