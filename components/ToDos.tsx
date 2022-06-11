import { Text, TouchableOpacity, View, Alert } from "react-native";
import { IToDos } from "../App";
import { styles } from "../styles";

interface IToDosProps {
  id: string;
  toDos: IToDos;
  setToDos: Function;
  saveToDo: Function;
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
      <Text style={styles.toDoText}>{toDos[id].text}</Text>
      <TouchableOpacity onPress={() => deleteToDo(id)}>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ToDos;
