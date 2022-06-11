import { TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";
import { theme } from "../styles/color";

interface IUtilitiesProps {
  id: string;
  deleteToDo: (key: string) => void;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function Utilities({ id, deleteToDo, setEditing }: IUtilitiesProps) {
  const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <View style={styles.utilities}>
      <TouchableOpacity onPress={toggleEditing}>
        <Octicons
          style={{ marginRight: 20 }}
          name="pencil"
          size={20}
          color={theme.grey}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteToDo(id)}>
        <Fontisto name="trash" size={20} color={theme.grey} />
      </TouchableOpacity>
    </View>
  );
}

export default Utilities;
