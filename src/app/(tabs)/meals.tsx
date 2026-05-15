import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import MealItem from '@/components/MealItem';
import { clearAllMeals, getMeals, Meal } from '@/storage/meals';
import { globalStyles } from '@/styles/global';


export default function AllMealsScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  const handleClearAll = async () => {
     try {
      await clearAllMeals();
      await loadMeals();
    } catch {
     Alert.alert("Error", "Failed to clear meals. Please try again.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
        <SafeAreaView style={globalStyles.container}>
    
    <ScrollView >
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>All Meals</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Clear all meals?", "This cannot be undone.", [
              { text: "Cancel", style: "cancel" },
              { text: "Clear All", style: "destructive", onPress: handleClearAll },
            ])
         }
       >
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30 }}>
        {meals.length === 0 ? (
          <Text style={globalStyles.empty}>No meals logged yet.</Text>
        ) : (
          meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              onDelete={loadMeals}
            />
          ))
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  clearButton: {
    color: 'red',
    fontSize: 16,
  },
};