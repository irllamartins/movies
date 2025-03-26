import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    text: {
        color: "#fff",
        
    },
    active: {
        color: "#fff",
        backgroundColor: "#FF8700",
    },
    button: {
        color: "#fff",
        /* paddingHorizontal: 60,
         margin:4*/
        width: 100, 
        height:50,
        marginHorizontal: 5,
        alignItems: "center",
    },
    underline: {
        marginTop: 5,           
        height: 4,            
        backgroundColor: '#0296e5', 
        width: '80%',          
      },
    container: {
        alignItems: "center",
        flexDirection: "row",
        // backgroundColor: "#b2b",
        height: 50,
        // width: width,
    }
});