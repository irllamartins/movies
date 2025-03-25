import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "#242A32",
        alignItems: "center",
    },
    noResult: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 10,
    },
    flatList: {
        width: width,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        padding: 25,
    },
    headerText: {
        marginTop: 30,
        fontSize: 24,
        lineHeight: 45,
        color: "#FFF",
    },
    containerInput: {
        flexDirection: "row", // Organiza elementos em linha
        alignItems: "center", // Alinha verticalmente
        justifyContent: "space-between", // Distribui os elementos
        backgroundColor: "#676860", // Mantém o fundo
        height: 42, // Altura do container
        paddingHorizontal: 10, // Ajuste lateral para espaçamento
        borderRadius: 16, // Bordas arredondadas
        marginTop: 24,
        marginBottom: 28,
    },
    input: {
        color: "#fff",
        width:"80%",
        paddingLeft: 15,
    },
    footer: {
        color: "#ccc"
    },
});