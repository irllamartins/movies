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
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        backgroundColor: "#676860", 
        height: 42, 
        paddingHorizontal: 10, 
        borderRadius: 16, 
        marginTop: 24,
        marginBottom: 2,
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