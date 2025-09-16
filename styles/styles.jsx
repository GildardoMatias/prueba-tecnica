import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
    mainContainer: { flex: 1, paddingHorizontal: 18, backgroundColor: '#ddefe8' },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 4,
        marginVertical: 4
    },
    button: { backgroundColor: '#34a379ff', height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    buttonText: { color: 'white' },
    secButton: { backgroundColor: '#90beadff', height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    title:{fontSize: 18, fontWeight: 'bold'},
    label: {fontSize: 12}
})