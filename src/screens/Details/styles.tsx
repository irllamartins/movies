import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  header: {
    paddingTop: 30,
    height: 115,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  detailsImage: {
    position: "absolute",
    width: "100%",
    height: 210,
  },
  detailsPosterImage: {
    width: 100,
    height: 160,
    borderRadius: 16,
    left: 29,
    right: 251,
    top: 140,
  },
  titleMovie: {
    position: "absolute",
    height: 50,
    left: 140,
    right: 32,
    top: 240,
    color: "#fff",
    fontSize: 18,
    lineHeight: 27,
    fontWeight: "700",
  },
  description: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 170,
  },
  descriptionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  descriptionText: {
    marginRight: 10,
    color: "#92929D",
  },
  descriptionText1: {
    marginRight: 10,
    color: "#FF8700",
  },
  about: {
    padding: 20,
  },
  aboutText: {
    color: "#fff",
    textAlign: "justify",
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  genresContainer: {
    borderRadius: 16,
    padding: 5,
    flexDirection: "column",
    borderColor: '#0296e5',
    borderWidth: 1,
    color: "#fff",
    margin: 2
  },
  underline: {
    marginTop: 5,
    height: 2,
    backgroundColor: '#0296e5',
    width: '100%',
  },
  produceContainer: {
    display: "flex",
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
  produceImage: {
    minHeight: 80,
    minWidth: 160,
    borderRadius: 10,
    backgroundColor: "#ccc",
    
  },
  personImage: {
    height: 80,
    width: 80,
   
    borderRadius: 50,
    backgroundColor: "#fff"
  },
  infoPersonText: {
    color: "#fff",
  },
  infoCharacterText: {
    color: "#fff",
    fontWeight: "bold"
  },
  infoPersonConatiner: {
    alignItems: "center",
    paddingHorizontal:10
  }
})