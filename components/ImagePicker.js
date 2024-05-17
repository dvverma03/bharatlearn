import { launchCameraAsync } from "expo-image-picker";

export default function ImagePicker() {
  const pickImageAsync = async () => {
    let result = await launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      base64: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
    } else {
      alert("You did not select any image.");
    }
  };
}
