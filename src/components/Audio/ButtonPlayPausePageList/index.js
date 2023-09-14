import { TouchableOpacity, View } from "react-native";

import IconButtonCustom from "../icon";
import styles from "./audio.module.css";

const ButtonAudio = (props) => {
  const { isPlay, playPause } = props;

  return (
    <View
      style={{
        width: 85,
        height: 85,
        borderRadius: 45,
        backgroundColor: "#fff",
        top: -35,
      }}
    >
      <TouchableOpacity
        style={{
          top: -8,
          justifyContent: "center",
          alignContent: "center",
          marginRight: 64,
        }}
        onPress={playPause}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            marginright: 50,
            alignSelf: "center",
          }}
        >
          <View style={styles.playButton}>
            {isPlay ? (
              <IconButtonCustom
                icon={"pause-circle-outline"}
                onPress={playPause}
              />
            ) : (
              <IconButtonCustom
                icon={"play-circle-outline"}
                onPress={playPause}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAudio;
