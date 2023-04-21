import { StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Input({
  textInputConfig,
  style,
  iconName,
  label,
  iconColor,
  value,
  onChangeText,
  isInvalid
}) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Ionicons name={iconName} size={28} color={iconColor} />
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.inputStyles, isInvalid && styles.inputInvalid]}
        value={value}
        onChangeText={onChangeText}
        {...textInputConfig}
      />
    </View>
  );
}
export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 4,
    marginVertical: 8,
    paddingVertical: 6,
  },
  inputStyles: {
    paddingLeft: 10,
    fontSize: 22,
    width: "100%",
  
  },
  inputInvalid: {
    width: "90%",
    fontSize: 22,
    

  },
});
