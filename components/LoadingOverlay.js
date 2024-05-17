import { Image, StyleSheet, View } from "react-native";
import { MotiImage } from "moti";
import Icon from "../assets/icon.png";

function LoadingOverlay() {
  return (
    <View style={styles.rootContainer}>
      <View className="relative items-center justify-center">
        <MotiImage
          className="w-32 h-32 rounded-full absolute"
          source={Icon}
          from={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 0, scale: 2.3 }}
          transition={{
            type: "timing",
            repeat: Infinity,
            duration: 1000,
            repeatReverse: false,
            delay: 200,
          }}
        />
        <Image className="w-32 h-32 animate-pulse rounded-full" source={Icon} />
      </View>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
