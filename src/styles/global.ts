import { StyleSheet } from "react-native";

export const APP_COLORS = {
  background: "#1a1a2e",
  header: "#242444",
  surface: "#2a2a4a",
  primary: "#4fc3f7",
  text: "#ffffff",
  textSecondary: "#a0a0b0",
  alert: "#ff5252",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.background,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: APP_COLORS.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: APP_COLORS.textSecondary,
    marginTop: 30,
    marginBottom: 16,
  },
  empty: {
    color: APP_COLORS.textSecondary,
    fontSize: 14,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
