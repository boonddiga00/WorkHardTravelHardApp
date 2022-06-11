import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../color";
import { styles } from "../styles";

interface IHeaderProps {
  work: () => void;
  travel: () => void;
  working: boolean;
}

function Header({ work, travel, working }: IHeaderProps) {
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
