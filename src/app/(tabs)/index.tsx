import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getMeals, Meal } from "@/storage";
import { globalStyles } from "@/styles/global";

import HomeHeader from "@/components/HomeHeader";
import MacroGrid from "@/components/MacroGrid";
import RecentMeals from "@/components/RecentMeals";
import ShareButton from '@/components/ShareButton';


export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    try {
      const data = await getMeals();
      setMeals(data);
    } catch {
      Alert.alert("Error", "Couldn't load meals. Please try again.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      void loadMeals();
    }, []),
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={globalStyles.header}>
          <Text style={globalStyles.title}>MacroZone</Text>
          <ShareButton meals={meals} />
        </View>
        <HomeHeader />
        <MacroGrid meals={meals} />
        <RecentMeals meals={meals} onDelete={loadMeals} />
      </ScrollView>
    </SafeAreaView>
  );
}
