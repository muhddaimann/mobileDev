import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { triviaDifficultyOptions, triviaCategoryOptions } from "@/hooks/useTrivia";
import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTheme } from 'react-native-paper';

interface TriviaFilterProps {
  onFilterApply: (difficulty: string, category: number) => void;
}

export default function TriviaFilter({ onFilterApply }: TriviaFilterProps) {
  const { colors } = useTheme();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [openDifficulty, setOpenDifficulty] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: colors.primary }]}>Choose Your Quiz</Text>

      <View style={styles.selectorContainer}>
        <DropDownPicker
          open={openDifficulty}
          value={selectedDifficulty}
          items={triviaDifficultyOptions}
          setOpen={setOpenDifficulty}
          setValue={setSelectedDifficulty}
          placeholder="Select Difficulty"
          style={[styles.dropdown, { backgroundColor: colors.outline }, { borderColor: colors.primary } ]}
          dropDownContainerStyle={styles.dropdownContainer}
        />
        <DropDownPicker
          open={openCategory}
          value={selectedCategory}
          items={triviaCategoryOptions}
          setOpen={setOpenCategory}
          setValue={setSelectedCategory}
          placeholder="Select Category"
          style={[styles.dropdown, { backgroundColor: colors.outline }, { borderColor: colors.primary } ]}
          dropDownContainerStyle={[styles.dropdownContainer, { backgroundColor: colors.outline } ]}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: selectedDifficulty && selectedCategory ? colors.primary : '#ccc' }
        ]}
        onPress={() => {
          if (selectedDifficulty && selectedCategory) {
            onFilterApply(selectedDifficulty, selectedCategory);
          }
        }}
        disabled={!selectedDifficulty || !selectedCategory}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: colors.primary }]}>Generate Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: wp(5), marginBottom: wp(5) },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: wp(5),
  },
  selectorContainer: { flexDirection: "column", marginBottom: wp(4) },
  dropdown: {
    width: "100%",
    marginBottom: wp(3),
    borderRadius: 10,
    elevation: 3,
  },
  dropdownContainer: {
    borderColor: "#ddd",
  },
  button: {
    padding: wp(3),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
