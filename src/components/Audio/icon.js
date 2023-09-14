import { IconButton } from "react-native-paper";

export default IconButtonCustom = ({ icon, onPress }) => {
  return (
    <IconButton icon={icon} size={70} iconColor="#FF8800" onPress={onPress} />
  );
};
