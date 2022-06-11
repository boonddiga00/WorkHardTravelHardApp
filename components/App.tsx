import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../styles/styles";
import Header from "./Header";
import ToDos from "./ToDos";

const STORAGE_KEY = "@toDos";

export interface IToDos {
  [key: string]: IToDo;
}

interface IToDo {
  text: string;
  working: boolean;
  completed: boolean;
}

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState<IToDos>({});
  const onChangeText = (payload: string) => setText(payload);
  const saveToDo = async (toDos: IToDos) => {
    const toDosString = JSON.stringify(toDos);
    await AsyncStorage.setItem(STORAGE_KEY, toDosString);
  };
  const addToDo = () => {
    if (text === "") {
      return;
    }
    const newToDo = {
      [Date.now().toString()]: { text, working, completed: false },
    };
    const newToDos = { ...toDos, ...newToDo };
    setToDos(newToDos);
    saveToDo(newToDos);
    setText("");
  };
  const getToDos = async () => {
    const storageToDos = await AsyncStorage.getItem(STORAGE_KEY);
    const toDosObject: IToDos = storageToDos ? JSON.parse(storageToDos) : {};
    setToDos(toDosObject);
  };
  useEffect(() => {
    getToDos();
  }, []);
  return (
    <View style={styles.container}>
      <Header setWorking={setWorking} working={working} />
      <TextInput
        style={styles.input}
        placeholder={working ? "Add a To Do" : "Where Do You Want to Go?"}
        value={text}
        returnKeyType="done"
        onChangeText={onChangeText}
        onSubmitEditing={addToDo}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <ToDos
              key={key}
              id={key}
              toDos={toDos}
              setToDos={setToDos}
              saveToDo={saveToDo}
            />
          ) : null
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
