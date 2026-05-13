import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { addMeal } from "@/storage/meals";
import { APP_COLORS, globalStyles } from "@/styles/global";

export default function AddMealsScreen() {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const handleAddMeal = async () => {
    if (!name || !calories) {
      Alert.alert("Error", "Please enter a meal name and calories.");
      return;
    }

    await addMeal({
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    });

    setName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");

    Alert.alert("Success", "Meal added successfully!");

    // @ts-ignore-next-line
    router.push("/");
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View>
        <Text style={globalStyles.title}>Add Meal</Text>

        <TextInput
          style={styles.input}
          placeholder="Meal name"
          placeholderTextColor={APP_COLORS.textSecondary}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Calories"
          placeholderTextColor={APP_COLORS.textSecondary}
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.rowInput]}
            placeholder="Protein (g)"
            placeholderTextColor={APP_COLORS.textSecondary}
            keyboardType="numeric"
            value={protein}
            onChangeText={setProtein}
          />
          <TextInput
            style={[styles.input, styles.rowInput]}
            placeholder="Carbs (g)"
            placeholderTextColor={APP_COLORS.textSecondary}
            keyboardType="numeric"
            value={carbs}
            onChangeText={setCarbs}
          />
          <TextInput
            style={[styles.input, styles.rowInput]}
            placeholder="Fat (g)"
            placeholderTextColor={APP_COLORS.textSecondary}
            keyboardType="numeric"
            value={fat}
            onChangeText={setFat}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddMeal}>
          <Text style={styles.buttonText}>Add Meal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: APP_COLORS.surface,
    color: APP_COLORS.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: APP_COLORS.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: APP_COLORS.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
