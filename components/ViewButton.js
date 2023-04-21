import { View, Text, Pressable, StyleSheet } from 'react-native';

import {GlobalStyles} from '../constants/styles'

function ViewButton({ children, onPress, style, buttonText }) {
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
        {children}
      </Pressable>
    </View>
  );
}

export default ViewButton;

const styles = StyleSheet.create({

  buttonInnerContainer: {
    elevation: 2,
  },

  pressed: {
    opacity: 0.75,
  },
});
