import { Text, TouchableOpacity, View, Alert } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { IToDos } from "./App";
import { styles } from "../styles/styles";
import { theme } from "../styles/color";
import CheckBox from "./CheckBox";

interface IToDosProps {
  id: string;
  toDos: IToDos;
  setToDos: React.Dispatch<React.SetStateAction<IToDos>>;
  saveToDo: (toDos: IToDos) => void;
}

function ToDos({ id, toDos, setToDos, saveToDo }: IToDosProps) {
  const deleteToDo = (key: string) => {
    Alert.alert("Delete ToDo", "Are you sure?", [
      { text: "Cancle" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDo(newToDos);
        },
      },
    ]);
  };
  return (
    <View style={styles.toDo}>
      <View style={styles.toDoContainer}>
        <CheckBox
          id={id}
          toDos={toDos}
          setToDos={setToDos}
          saveToDo={saveToDo}
        />
        <Text
          style={
            toDos[id].completed
              ? {
                  ...styles.toDoText,
                  textDecorationLine: "line-through",
                  color: theme.grey,
                }
              : { ...styles.toDoText }
          }
        >
          {toDos[id].text}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteToDo(id)}>
        <Fontisto name="trash" size={20} color={theme.grey} />
      </TouchableOpacity>
    </View>
  );
}

export default ToDos;
