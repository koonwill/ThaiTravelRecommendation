import { ImageBackground, Text, View } from "react-native";
import SignupForm from "./screens/signup";

export default function Index() {
  const background = require("../assets/images/background.jpg")
  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Signup</Text>
      <SignupForm />
    </View>
    </ImageBackground> 
  );
}
