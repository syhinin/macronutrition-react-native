import * as Haptics from 'expo-haptics';
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

import { deleteMeal } from "@/storage/meals";
import { APP_COLORS } from "@/styles/global";

type MealItemProps = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  onDelete: () => void;
};

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  onDelete,
}: MealItemProps) {
  const handleLongPress = () => {
    Alert.alert("Delete Meal", `Are you sure you want to delete "${name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteMeal(id);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            onDelete();
          } catch {
            Alert.alert(
              "Delete failed",
              "Unable to delete this meal. Please try again.",
            );
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.macros}>
        {calories} cal • {protein}g P • {carbs}g C • {fat}g F
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_COLORS.surface,
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: APP_COLORS.text,
  },
  macros: {
    fontSize: 13,
    color: APP_COLORS.textSecondary,
    marginTop: 4,
  },
});
