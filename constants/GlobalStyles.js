import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 30 : 0
    },
    IosSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 30 : 0
    },

});
