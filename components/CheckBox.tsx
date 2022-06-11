import { TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { theme } from "../styles/color";
import { IToDos } from "./App";

interface ICompleteToDoProps {
  id: string;
  toDos: IToDos;
  setToDos: React.Dispatch<React.SetStateAction<IToDos>>;
  saveToDo: (toDos: IToDos) => void;
}

function CheckBox({ id, toDos, setToDos, saveToDo }: ICompleteToDoProps) {
  const completeToDo = () => {
    const newToDos = { ...toDos };
    if (toDos[id].completed) {
      newToDos[id].completed = false;
    } else {
      newToDos[id].completed = true;
    }
    setToDos(newToDos);
    saveToDo(newToDos);
  };
  return (
    <TouchableOpacity onPress={completeToDo}>
      {toDos[id].completed ? (
        <Fontisto name="checkbox-active" size={18} color={theme.grey} />
      ) : (
        <Fontisto name="checkbox-passive" size={18} color={theme.white} />
      )}
    </TouchableOpacity>
  );
}

export default CheckBox;
