import { View, Text, Pressable, StyleSheet } from 'react-native';

import {GlobalStyles} from '../constants/styles'

function TextButton({ children, onPress, style, buttonText }) {
  return (
    <View style={ style}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: GlobalStyles.colors.primaryGreen }}
      >
        <Text style={buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default TextButton;

const styles = StyleSheet.create({

  buttonInnerContainer: {
    elevation: 2,
  },

  pressed: {
    opacity: 0.75,
  },
});
