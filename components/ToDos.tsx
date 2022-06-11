import { Text, View, Alert, TextInput } from "react-native";
import { IToDos } from "./App";
import { styles } from "../styles/styles";
import { theme } from "../styles/color";
import CheckBox from "./CheckBox";
import Utilities from "./Utilities";
import { useState } from "react";

interface IToDosProps {
  id: string;
  toDos: IToDos;
  setToDos: React.Dispatch<React.SetStateAction<IToDos>>;
  saveToDo: (toDos: IToDos) => void;
}

function ToDos({ id, toDos, setToDos, saveToDo }: IToDosProps) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState<string>(toDos[id].text);
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
  const onChangeText = (payload: string) => setEditedText(payload);
  const editToDo = () => {
    if (toDos[id].text === editedText) {
      setEditing(false);
      return;
    }
    const newToDos = { ...toDos };
    newToDos[id].text = editedText;
    setToDos(newToDos);
    saveToDo(newToDos);
    setEditing(false);
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
        {editing ? (
          <TextInput
            style={styles.editingInput}
            placeholder="Edit Your ToDo"
            placeholderTextColor="white"
            value={editedText}
            returnKeyType="done"
            onChangeText={onChangeText}
            onSubmitEditing={editToDo}
          />
        ) : (
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
        )}
      </View>
      <Utilities id={id} deleteToDo={deleteToDo} setEditing={setEditing} />
    </View>
  );
}

export default ToDos;
