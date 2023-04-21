import { StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


function NewTaskInput({textInputConfig, style, iconName, label}) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Ionicons name={iconName} size={28} color="black" />
      <Text style={styles.label}>{label}</Text>
      <TextInput 
      style={[styles.inputStyles, style]} {...textInputConfig} 
      />
    </View>
  );
}
export default NewTaskInput;


const styles = StyleSheet.create({ 
    inputContainer: {
      flexDirection: 'column',
      marginHorizontal: 25,
      marginVertical: Platform.OS === 'ios' ? 5 : -2
      
    },
    inputStyles: {
      padding: 8,
      fontSize: 18,
      width: "100%",
      borderWidth: 1,
      borderColor: "#008c8c",
      backgroundColor: "#ffffff",
      borderRadius: 8, 
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 1,
      elevation: 1,
      
    },
    label:{
      marginBottom:4,
    }
});