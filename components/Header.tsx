import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../styles/color";
import { styles } from "../styles/styles";
export const WORKING_STORAGE_KEY = "@working";

interface IHeaderProps {
  setWorking: React.Dispatch<React.SetStateAction<boolean>>;
  working: boolean;
}

function Header({ setWorking, working }: IHeaderProps) {
  const saveWorking = (bool: boolean) => {
    const workingString = JSON.stringify(bool);
    AsyncStorage.setItem(WORKING_STORAGE_KEY, workingString);
  };
  const travel = () => {
    setWorking(false);
    saveWorking(false);
  };
  const work = () => {
    setWorking(true);
    saveWorking(true);
  };
  return (
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
  );
}

export default Header;
