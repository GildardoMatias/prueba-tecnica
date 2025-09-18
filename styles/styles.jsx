import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
    mainContainer: { flex: 1, paddingHorizontal: 18, backgroundColor: '#ddefe8' },
    container: { flex: 1, justifyContent: 'center' },
    input: { backgroundColor: 'white', borderRadius: 6, marginVertical: 4 },
    iconButton: {flexDirection:'row',gap: 10, backgroundColor: '#34a379ff', height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    button: { backgroundColor: '#34a379ff', height: 32, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    buttonText: { color: 'white' },
    secButton: { flexDirection: 'row',gap: 8,backgroundColor: '#b6e7d5ff', height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    bigTitle: { fontSize: 24, fontWeight: 'bold' },
    title: { fontSize: 18, fontWeight: 'bold' },
    subtitle: { fontSize: 16, fontWeight: 'bold' },
    rowLabel : {flexDirection: 'row', gap: 6, alignItems: 'center'},
    label: { fontSize: 14 },
})