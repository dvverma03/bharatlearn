import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../constants/colors";
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
        <View
          style={[
            styles.sectionHeader,
            { marginTop: 20, flexDirection: "row" },
          ]}
        >
          <Text
            style={{
              backgroundColor: colors.gray[200],
              width: 200,
              height: 25,
              borderRadius: 10,
              marginLeft: 10,
            }}
          ></Text>
          <Text
            style={{
              backgroundColor: colors.gray[200],
              width: 100,
              height: 25,
              borderRadius: 10,
              marginLeft: 50,
            }}
          ></Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.containerElevation]}>
            <View>
              <View
                style={{
                  width: 290,
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
                  width: "93%",
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: colors.gray[200],
                  marginLeft: 10,
                  marginTop: 28,
                }}
              ></View>
            </View>
          </View>
          <View style={[styles.containerElevation]}>
            <View>
              <View
                style={{
                  width: 290,
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
                  width: "93%",
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: colors.gray[200],
                  marginLeft: 10,
                  marginTop: 28,
                }}
              ></View>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View
          style={[
            styles.sectionHeader,
            { marginTop: 20, flexDirection: "row" },
          ]}
        >
          <Text
            style={{
              backgroundColor: colors.gray[200],
              width: 200,
              height: 25,
              borderRadius: 10,
              marginLeft: 10,
            }}
          ></Text>
          <Text
            style={{
              backgroundColor: colors.gray[200],
              width: 100,
              height: 25,
              borderRadius: 10,
              marginLeft: 50,
            }}
          ></Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.containerElevationEbook]}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 100,
                  height: 210,
                  borderRadius: 10,
                  backgroundColor: colors.gray[200],
                  marginLeft: 10,
                  marginTop: 10,
                }}
              ></View>
              <View>
                <View
                  style={{
                    width: 115,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 12,
                  }}
                ></View>
                <View
                  style={{
                    width: 155,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 12,
                  }}
                ></View>
                <View
                  style={{
                    width: 155,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 28,
                  }}
                ></View>
              </View>
            </View>
          </View>
          <View style={[styles.containerElevationEbook]}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 100,
                  height: 210,
                  borderRadius: 10,
                  backgroundColor: colors.gray[200],
                  marginLeft: 10,
                  marginTop: 10,
                }}
              ></View>
              <View>
                <View
                  style={{
                    width: 115,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 12,
                  }}
                ></View>
                <View
                  style={{
                    width: 155,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 12,
                  }}
                ></View>
                <View
                  style={{
                    width: 155,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: colors.gray[200],
                    marginLeft: 10,
                    marginTop: 28,
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
  HeaderContainer: {
    paddingTop: 40,
    flexDirection: "row",
    paddingLeft: 20,
    height: 100,
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 15,
  },
  containerElevation: {
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
    height: 320,
  },
  containerElevationEbook: {
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
    height: 240,
  },
});
