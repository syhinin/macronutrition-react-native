import { StyleSheet, Text, View } from "react-native";

import { APP_COLORS, globalStyles } from "@/styles/global";

export default function HomeHeader() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={globalStyles.header}>
      <Text style={styles.date}>{currentDate}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: 14,
    color: APP_COLORS.textSecondary,
    marginTop: 4,
    marginBottom: 30,
  },
});
