import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";

type ChipSelectorProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const ChipSelector = ({ value, options, onChange }: ChipSelectorProps) => {
  return (
    <View style={styles.chipContainer}>
      {options.map((option) => (
        <Chip
          key={option}
          mode="outlined"
          elevated
          showSelectedCheck={true}
          onPress={() => onChange?.(option)}
          selected={option === value}
        >
          {option}
        </Chip>
      ))}
    </View>
  );
};

export default ChipSelector;

const styles = StyleSheet.create({
  chipContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
