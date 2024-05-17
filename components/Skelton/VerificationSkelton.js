import { StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../constants/colors";
export default function VerificationSkelton() {
  return (
    <View style={styles.Container}>
      <View style={styles.Header}></View>

      <View style={styles.FormContainer}>
        <View>
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 100,
              backgroundColor: colors.gray[200],
              marginLeft: 10,
              marginTop: 20,
            }}
          ></View>
          <View
            style={{
              width: 255,
              height: 25,
              borderRadius: 10,
              backgroundColor: colors.gray[200],
              marginLeft: 10,
              marginTop: 20,
            }}
          ></View>
          <View
            style={{
              width: "93%",
              height: 25,
              borderRadius: 10,
              backgroundColor: colors.gray[200],
              marginLeft: 10,
              marginTop: 20,
            }}
          ></View>
          <View
            style={{
              width: "93%",
              height: 45,
              borderRadius: 10,
              marginLeft: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                marginLeft: 10,
                backgroundColor: colors.gray[200],
                marginTop: 20,
              }}
            ></View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                marginLeft: 10,
                backgroundColor: colors.gray[200],
                marginTop: 20,
              }}
            ></View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                marginLeft: 10,
                backgroundColor: colors.gray[200],
                marginTop: 20,
              }}
            ></View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                marginLeft: 10,
                backgroundColor: colors.gray[200],
                marginTop: 20,
              }}
            ></View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                marginLeft: 10,
                backgroundColor: colors.gray[200],
                marginTop: 20,
              }}
            ></View>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                marginLeft: 10,
                backgroundColor: colors.gray[200],
                marginTop: 20,
              }}
            ></View>
          </View>
          <View
            style={{
              width: "93%",
              height: 45,
              borderRadius: 10,
              backgroundColor: colors.gray[200],
              marginLeft: 10,
              marginTop: 50,
            }}
          ></View>
          <View
            style={{
              width: 205,
              height: 25,
              borderRadius: 10,
              backgroundColor: colors.gray[200],
              marginLeft: 10,
              marginTop: 20,
            }}
          ></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.gray[200],
    height: "100%",
    alignItems: "center",
  },
  Header: {
    marginTop: 140,
    flexDirection: "row",
    width: "55%",
    padding: 5,
    justifyContent: "space-between",
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
});
