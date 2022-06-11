import {
  StyleSheet,
  TouchableHighlightBase,
  TouchableWithoutFeedbackBase,
} from "react-native";
import { theme } from "./color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  btnText: {
    fontSize: 44,
  },
  input: {
    backgroundColor: theme.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 25,
  },
  toDo: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: theme.white,
    fontSize: 18,
    marginLeft: 10,
  },
  toDoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  utilities: {
    flexDirection: "row",
    alignItems: "center",
  },
  editingInput: {
    backgroundColor: theme.bg,
    fontSize: 18,
    paddingLeft: 10,
    marginLeft: 5,
    width: 220,
    color: theme.white,
    borderRadius: 5,
  },
});
