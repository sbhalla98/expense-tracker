import React from "react";
import { Chip } from "react-native-paper";
import { ThemedView } from "../ThemedView";
import { StyleSheet } from "react-native";

type ChipSelectorProps = {
    value: string;
    options: string[],
    onChange: (value: string) => void
}

const ChipSelector = ({
    value,
    options,
    onChange
}: ChipSelectorProps) => {
    return (
        <ThemedView style={styles.chipContainer}>
            {
                options.map(option => (
                    <Chip
                        key={option}
                        mode="outlined"
                        elevated
                        showSelectedCheck={true}
                        onPress={() => onChange?.(option)}
                        selected={option === value}>
                        {option}
                    </Chip>))
            }
        </ThemedView>
    )
}

export default ChipSelector;

const styles = StyleSheet.create({
    chipContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8
    },
  });
