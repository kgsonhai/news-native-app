import { TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

import styles from "./index.module.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";

export default ButtonPlayDetail = ({ article }) => {
  const { audio_path, audio_path_en } = article;
  const { language } = useSelector((state) => state.localeReducer);

  const [isPlay, setPlay] = useState(false);
  const [isDisablePlay, setDisablePlay] = useState(false);
  const soundObjectRef = useRef(null);

  const audioWithLocale = useMemo(() => {
    return language === "vi" ? audio_path : audio_path_en;
  }, [language]);

  const enableAudio = useCallback(async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: false,
    });
  }, []);

  const loadAudio = useCallback(async () => {
    try {
      enableAudio();
      setPlay(false);
      setDisablePlay(true);
      const { sound } = await Audio.Sound.createAsync({
        uri: audioWithLocale,
      });
      soundObjectRef.current = sound;
      setDisablePlay(false);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const playPause = useCallback(async () => {
    if (isDisablePlay) return;
    try {
      const status = await soundObjectRef.current.getStatusAsync();

      if (status.isPlaying) {
        await soundObjectRef.current.pauseAsync();
      } else {
        await soundObjectRef.current.playAsync();
      }
      setPlay(!status.isPlaying);
    } catch (error) {
      console.log({ error });
    }
  }, [isPlay, isDisablePlay]);

  useEffect(() => {
    loadAudio();

    return () => {
      soundObjectRef.current.unloadAsync();
      soundObjectRef.current = null;
    };
  }, []);

  return (
    <TouchableOpacity style={styles.buttonPlay} onPress={playPause}>
      <IconButton
        style={styles.iconPlay}
        icon={isPlay ? "pause" : "play"}
        iconColor="#ffffff"
        size={100}
      />
    </TouchableOpacity>
  );
};
