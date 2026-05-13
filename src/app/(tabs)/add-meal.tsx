import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { globalStyles } from "@/styles/global";

export default function AddMealsScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <Text style={globalStyles.title}>Add Meal</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
