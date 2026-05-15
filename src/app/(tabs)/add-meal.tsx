import * as Haptics from 'expo-haptics';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddMeal = async () => {
    if (isSubmitting) {
      return;
    }

    const trimmedName = name.trim();
    if (!trimmedName || !calories) {
      Alert.alert("Error", "Please enter a meal name and calories.");
      return;
    }

    const caloriesNum = Number(calories);
    if (!Number.isFinite(caloriesNum)) {
      Alert.alert("Error", "Please enter a valid number for calories.");
      return;
    }

    const parseOptionalMacro = (value: string) => {
      if (value.trim() === "") {
        return 0;
      }
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : Number.NaN;
    };

    const proteinNum = parseOptionalMacro(protein);
    const carbsNum = parseOptionalMacro(carbs);
    const fatNum = parseOptionalMacro(fat);

    if (
      Number.isNaN(proteinNum) ||
      Number.isNaN(carbsNum) ||
      Number.isNaN(fatNum)
    ) {
      Alert.alert(
        "Error",
        "Please enter valid numbers for protein, carbs, and fat.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await addMeal({
        name: trimmedName,
        calories: caloriesNum,
        protein: proteinNum,
        carbs: carbsNum,
        fat: fatNum,
      }); 

      setName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFat("");

      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      router.push("/");
    } catch (error) {
      Alert.alert("Error", "Failed to save meal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleAddMeal}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Adding..." : "Add Meal"}
          </Text>
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: APP_COLORS.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
