import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import ButtonPlayDetail from "../../components/Audio/ButtonPlayPausePageDetail";
import styles from "./styles";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";

export const NewsDetails = ({ route, handlePauseAudioWhenNavigate }) => {
  const { article, articleIndex } = route?.params;
  const navigation = useNavigation();
  const { language } = useSelector((state) => state.localeReducer);
  const [isShowTranslate, setShowTranslate] = useState(false);

  const titleWithLocale = useMemo(() => {
    return language === "vi" ? article.title : article.title_english;
  }, [language]);

  const contentWithLocale = useMemo(() => {
    return language === "vi" ? article.content : article.content_english;
  }, [language]);

  const goBack = () => {
    navigation.goBack();
  };

  const backgroundColor = useColorScheme() === "dark" ? "#000" : "#fff";
  const color = useColorScheme() === "dark" ? "#fff" : "#000";
  const contentColor = useColorScheme() === "dark" ? "#bbb" : "#444";
  const readMoreBgColor = useColorScheme() === "dark" ? "#222" : "#ddd";

  const handleURLPress = () => {
    Linking.openURL(article?.url);
  };

  useLayoutEffect(() => {
    if (route.name === "NewsDetails") {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });
    }
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "flex" },
      });
    };
  }, []);

  useEffect(() => {
    handlePauseAudioWhenNavigate();
  }, []);

  return (
    <>
      <TouchableOpacity style={styles.crossContainer} onPress={goBack}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={[styles.container, { backgroundColor }]}
        contentContainerStyle={styles.contentContainer}
      >
        <SharedElement id={`article#${articleIndex}-Image`}>
          <Image
            style={styles.image}
            source={{
              uri: article?.img_urls ?? "https://picsum.photos/1000",
            }}
            resizeMode={"cover"}
          />
          <ButtonPlayDetail article={article} />
        </SharedElement>
        <Text style={[styles.title, { color }]}>{titleWithLocale}</Text>
        <Text style={[styles.content, { color: contentColor }]}>
          {contentWithLocale}
        </Text>
        <Button
          icon="google-translate"
          mode="text"
          onPress={() => setShowTranslate(!isShowTranslate)}
          style={{ fontSize: 50 }}
        />
        {isShowTranslate && (
          <Text
            style={[
              styles.content,
              styles.content_english,
              { color: contentColor },
            ]}
          >
            {language === "vi" ? article.content_english : article.content}
          </Text>
        )}
      </ScrollView>
      <View
        style={[styles.readMoreContainer, { backgroundColor: readMoreBgColor }]}
      >
        <Text style={[styles.readMoreText, { color }]} numberOfLines={2}>
          Read more at{" "}
          <Text style={styles.link} onPress={handleURLPress}>
            {article?.url}
          </Text>
        </Text>
      </View>
    </>
  );
};

NewsDetails.sharedElements = (route) => {
  const { articleIndex } = route.params;
  return [`article#${articleIndex}-Image`];
};
