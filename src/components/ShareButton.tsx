import { Ionicons } from '@expo/vector-icons';
import { Alert, Share, TouchableOpacity } from 'react-native';

import { Meal } from '@/storage/meals';
import { APP_COLORS } from '@/styles/global';

type ShareButtonProps = {
  meals: Meal[];
};

export default function ShareButton({ meals }: ShareButtonProps) {
  const handleShare = async () => {
    const totals = meals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fat: acc.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );

    try {
      await Share.share({
        message: `MacroNutrition Daily Summary\n\nCalories: ${totals.calories}\nProtein: ${totals.protein}g\nCarbs: ${totals.carbs}g\nFat: ${totals.fat}g\n\nMeals: ${meals.length} logged today`,
      });
    } catch {
      Alert.alert('Error', 'Could not open share sheet. Please try again.');
    }
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <Ionicons name='share-outline' size={24} color={APP_COLORS.primary} />
    </TouchableOpacity>
  );
}