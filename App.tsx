import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./color";

const STORAGE_KEY = "@toDos";

interface IToDos {
  [key: string]: IToDo;
}

interface IToDo {
  text: string;
  work: boolean;
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
    const newToDos = Object.assign({}, toDos, {
      [Date.now()]: { text, work: working },
    });
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
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.white : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? theme.white : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
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
          toDos[key].work === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
          ) : null
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  toDoText: {
    color: theme.white,
    fontSize: 18,
  },
});
