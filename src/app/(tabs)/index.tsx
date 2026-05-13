import { Link } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { globalStyles } from "@/styles/global";

import HomeHeader from "@/components/HomeHeader";

export default function HomeScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <Text style={globalStyles.title}>MacroZone</Text>
        <HomeHeader />
        <Link href="/meals" style={{ fontSize: 18, color: "#007bff" }}>
          Go to Meals
        </Link>
        <Link href="/add-meal" style={{ fontSize: 18, color: "#007bff" }}>
          Go to Add Meal
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}
