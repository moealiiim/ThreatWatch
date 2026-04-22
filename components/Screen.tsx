import React, { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type ScreenProps = {
  children: ReactNode;
  scrollable?: boolean;
};

export const Screen = ({ children, scrollable = false }: ScreenProps) => {
  const content = <View style={styles.content}>{children}</View>;
  return (
    <View style={styles.root}>
      {scrollable ? (
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#020817",
    flex: 1
  },
  content: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 24
  },
  scrollContent: {
    flexGrow: 1
  }
});
