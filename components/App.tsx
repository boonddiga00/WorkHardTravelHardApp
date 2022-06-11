import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../color";
import Header from "./Header";
import ToDos from "./ToDos";

const STORAGE_KEY = "@toDos";

export interface IToDos {
  [key: string]: IToDo;
}

interface IToDo {
  text: string;
  working: boolean;
}

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState<IToDos>({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload: string) => setText(payload);
  const saveToDo = async (toDos: IToDos) => {
    const toDosString = JSON.stringify(toDos);
    await AsyncStorage.setItem(STORAGE_KEY, toDosString);
  };
  const addToDo = () => {
    if (text === "") {
      return;
    }
    const newToDo = { [Date.now().toString()]: { text, working } };
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
      <Header work={work} travel={travel} working={working} />
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
  },
});
