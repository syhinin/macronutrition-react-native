import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { globalStyles } from "@/styles/global";

import HomeHeader from "@/components/HomeHeader";
import MacroGrid from "@/components/MacroGrid";
import RecentMeals from "@/components/RecentMeals";

export default function HomeScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <Text style={globalStyles.title}>MacroZone</Text>
        <HomeHeader />
        <MacroGrid />
        <RecentMeals />
      </ScrollView>
    </SafeAreaView>
  );
}
