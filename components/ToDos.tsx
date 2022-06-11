import { Text, TouchableOpacity, View, Alert } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { IToDos } from "./App";
import { styles } from "../styles/styles";
import { theme } from "../styles/color";

interface IToDosProps {
  id: string;
  toDos: IToDos;
  setToDos: React.Dispatch<React.SetStateAction<IToDos>>;
  saveToDo: (toDos: IToDos) => void;
}

function ToDos({ id, toDos, setToDos, saveToDo }: IToDosProps) {
  const completeToDo = async () => {
    const newToDos = { ...toDos };
    if (toDos[id].completed) {
      newToDos[id].completed = false;
    } else {
      newToDos[id].completed = true;
    }
    setToDos(newToDos);
    await saveToDo(newToDos);
  };
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
      <View style={styles.passiveCheckbox}>
        <TouchableOpacity onPress={completeToDo}>
          {toDos[id].completed ? (
            <Fontisto name="checkbox-active" size={18} color={theme.grey} />
          ) : (
            <Fontisto name="checkbox-passive" size={18} color={theme.white} />
          )}
        </TouchableOpacity>
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
