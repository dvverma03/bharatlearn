import { StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../constants/colors";
export default function EbookLibrarySkelton() {
  return (
    <View style={styles.Container}>
      <View style={styles.FormContainer}>
        <View>
          <View style={{ flexDirection: "row", paddingTop: 30 }}>
            <View
              style={{
                width: 125,
                height: 25,
                borderRadius: 100,
                backgroundColor: colors.gray[200],
                marginLeft: 10,
                marginTop: 20,
              }}
            ></View>
            <View
              style={{
                width: 175,
                height: 35,
                borderRadius: 100,
                backgroundColor: colors.gray[200],
                marginLeft: 40,
                marginTop: 20,
              }}
            ></View>
          </View>
          <View style={styles.containerElevation}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "40%",
                  height: 175,
                  borderRadius: 10,
                  backgroundColor: colors.gray[200],
                  marginLeft: 10,
                  marginTop: 10,
                }}
              ></View>
              <View>
                <View
                  style={{
                    width: 145,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 12,
                  }}
                ></View>
                <View
                  style={{
                    width: 175,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 18,
                  }}
                ></View>
                <View
                  style={{
                    width: 175,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 42,
                  }}
                ></View>
              </View>
            </View>
          </View>
          <View style={styles.containerElevation}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "40%",
                  height: 175,
                  borderRadius: 10,
                  backgroundColor: colors.gray[200],
                  marginLeft: 10,
                  marginTop: 10,
                }}
              ></View>
              <View>
                <View
                  style={{
                    width: 145,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 12,
                  }}
                ></View>
                <View
                  style={{
                    width: 175,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 18,
                  }}
                ></View>
                <View
                  style={{
                    width: 175,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 42,
                  }}
                ></View>
              </View>
            </View>
          </View>
          <View style={styles.containerElevation}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "40%",
                  height: 175,
                  borderRadius: 10,
                  backgroundColor: colors.gray[200],
                  marginLeft: 10,
                  marginTop: 10,
                }}
              ></View>
              <View>
                <View
                  style={{
                    width: 145,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 12,
                  }}
                ></View>
                <View
                  style={{
                    width: 175,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 18,
                  }}
                ></View>
                <View
                  style={{
                    width: 175,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 42,
                  }}
                ></View>
              </View>
            </View>
          </View>
          <View style={styles.containerElevation}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: "40%",
                  height: 175,
                  borderRadius: 10,
                  backgroundColor: colors.gray[200],
                  marginLeft: 10,
                  marginTop: 10,
                }}
              ></View>
              <View>
                <View
                  style={{
                    width: 145,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 12,
                  }}
                ></View>
                <View
                  style={{
                    width: 175,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 18,
                  }}
                ></View>
                <View
                  style={{
                    width: 175,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 42,
                  }}
                ></View>
              </View>
            </View>
          </View>
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
  FormContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
    marginTop: 20,
  },
});
