import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { Alert, View } from "react-native";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, Text } from "react-native-paper";

import styles from "./App.module.css";
import ButtonAudio from "./src/components/Audio/ButtonPlayPausePageList";
import { Feed } from "./src/screens/feed";
import { NewsDetails } from "./src/screens/newsDetail";
import { CATEGORIES } from "./src/components/Category/category.constant";
import "./src/i18n";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackScreens() {
  const { handlePauseAudioWhenNavigate } = React.useContext(AppContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="NewsDetails">
        {(props) => (
          <NewsDetails
            {...props}
            handlePauseAudioWhenNavigate={handlePauseAudioWhenNavigate}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const AppContext = React.createContext({});

export default function RootNavigation() {
  const [isPlay, setPlay] = useState(false);
  const [categoryPrevious, setCategoryPrevious] = useState(CATEGORIES[0]);
  const currentSoundIndex = useRef(0);
  const soundObjectRef = useRef(null);
  const { newsFeed } = useSelector((state) => state.feedReducer);
  const { currentCategory } = useSelector((state) => state.categoryReducer);
  const { language } = useSelector((state) => state.localeReducer);

  const audios = useMemo(
    () =>
      language === "vi"
        ? newsFeed.map((item) => item?.audio_path)
        : newsFeed.map((item) => item?.audio_path_en),
    [newsFeed, language]
  );

  // const audios = [
  //   "https://graduation-project-api.s3.ap-southeast-2.amazonaws.com/test.mp3",
  //   "https://graduation-project-api.s3.ap-southeast-2.amazonaws.com/test.mp3",
  //   "https://graduation-project-api.s3.ap-southeast-2.amazonaws.com/test.mp3",
  // ];

  const enableAudio = useCallback(async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: false,
    });
  }, []);

  const loadAudio = useCallback(
    async (indexAudio) => {
      enableAudio();
      try {
        if (categoryPrevious !== currentCategory) {
          console.log("1");
          if (soundObjectRef.current) {
            await soundObjectRef.current.unloadAsync();
          }
          setPlay(false);
          const { sound } = await Audio.Sound.createAsync({
            uri: audios[currentSoundIndex.current],
          });
          soundObjectRef.current = sound;
          setCategoryPrevious(currentCategory);
        }

        if (!soundObjectRef.current) {
          console.log("2");
          setPlay(false);
          const { sound } = await Audio.Sound.createAsync({
            uri: audios[currentSoundIndex.current],
          });
          soundObjectRef.current = sound;
        }

        if (indexAudio || indexAudio === 0) {
          console.log("3");
          if (soundObjectRef.current) {
            await soundObjectRef.current.unloadAsync();
          }
          setPlay(false);
          const { sound } = await Audio.Sound.createAsync({
            uri: audios[indexAudio],
          });
          soundObjectRef.current = sound;
          currentSoundIndex.current = indexAudio;
          playPause(parseInt(indexAudio));
        }
      } catch (error) {
        console.log({ error });
      }
    },
    [audios, currentSoundIndex, currentCategory, language]
  );

  const playPause = useCallback(
    async (nextIndexAudio) => {
      try {
        const status = await soundObjectRef.current.getStatusAsync();
        if (!status.isLoaded) return;

        if (status.isPlaying) {
          soundObjectRef.current.pauseAsync();
        } else {
          soundObjectRef.current.playAsync();
        }

        let currentIndex =
          typeof nextIndexAudio === "number"
            ? nextIndexAudio
            : currentSoundIndex.current;

        soundObjectRef.current.setOnPlaybackStatusUpdate(async (status) => {
          if (status.didJustFinish) {
            // Neu ket thuc het tat ca audio trong category nay
            if (currentIndex === audios.length - 1) {
              soundObjectRef.current = null;
              currentSoundIndex.current = 0;
              loadAudio();
            }
            if (currentIndex < audios.length - 1) {
              // Neu key thuc audio va next sang audio tiep
              const nextIndex = currentIndex + 1;
              currentSoundIndex.current = nextIndex;
              loadAudio(nextIndex);
            }
          }
        });

        setPlay(!status.isPlaying);
      } catch (error) {
        console.log({ error });
      }
    },
    [audios, currentSoundIndex, language]
  );

  const handleClickPrev = () => {
    if (
      currentSoundIndex.current > 0 &&
      currentSoundIndex.current <= audios.length - 1
    ) {
      const prevIndex = currentSoundIndex.current - 1;
      loadAudio(prevIndex);
    } else {
      Alert.alert("Đây là bài báo đầu!!");
    }
  };

  const handleClickNext = () => {
    if (
      currentSoundIndex.current >= 0 &&
      currentSoundIndex.current < audios.length - 1
    ) {
      const nextIndex = currentSoundIndex.current + 1;
      loadAudio(nextIndex);
    } else {
      Alert.alert("Đây là bài báo cuối!!");
    }
  };

  const handlePauseAudioWhenNavigate = () => {
    if (soundObjectRef.current) {
      soundObjectRef.current.pauseAsync();
    }
    setPlay(false);
  };

  useEffect(() => {
    loadAudio();
  }, [audios, currentCategory]);

  useEffect(() => {
    if (soundObjectRef.current) {
      soundObjectRef.current.pauseAsync();
      soundObjectRef.current = null;
    }
    currentSoundIndex.current = 0;
    loadAudio();
  }, [language]);

  return (
    <AppContext.Provider value={{ handlePauseAudioWhenNavigate }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: [
              {
                display: "flex",
              },
            ],
          }}
        >
          <Tab.Screen
            name="Pre"
            component={StackScreens}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.itemBar}>
                  <View style={styles.iconButton}>
                    <IconButton
                      style={styles.icon}
                      icon="skip-previous"
                      size={50}
                      iconColor="#FF8800"
                      onPress={handleClickPrev}
                    />
                  </View>
                  <Text style={styles.textIcon}></Text>
                </View>
              ),
              tabBarVisible: false,
            }}
          />
          <Tab.Screen
            name="PlayPause"
            component={StackScreens}
            options={{
              tabBarButton: (props) => (
                <ButtonAudio {...props} isPlay={isPlay} playPause={playPause} />
              ),
            }}
          />
          <Tab.Screen
            name="Next"
            component={StackScreens}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.itemBar}>
                  <View style={styles.iconButton}>
                    <IconButton
                      style={styles.icon}
                      icon="skip-next"
                      size={50}
                      iconColor="#FF8800"
                      onPress={handleClickNext}
                    />
                  </View>
                  <Text style={styles.textIcon}></Text>
                </View>
              ),
              tabBarVisible: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
