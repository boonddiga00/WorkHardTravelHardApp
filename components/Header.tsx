import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../styles/color";
import { styles } from "../styles/styles";

interface IHeaderProps {
  setWorking: React.Dispatch<React.SetStateAction<boolean>>;
  working: boolean;
}

function Header({ setWorking, working }: IHeaderProps) {
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
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
