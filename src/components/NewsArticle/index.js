import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useMemo } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";

export const NewsArticle = ({ post, index }) => {
  const navigation = useNavigation();
  const { language } = useSelector((state) => state.localeReducer);

  const titleWithLocale = useMemo(() => {
    return language === "vi" ? post.title : post.title_english;
  }, [language]);

  const handleNavigate = useCallback(() => {
    navigation.navigate("NewsDetails", { article: post, articleIndex: index });
  }, [index, navigation, post]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={handleNavigate}
    >
      <SharedElement
        style={styles.imageContainer}
        id={`article#${index}-Image`}
      >
        <Image
          source={{
            uri:
              post?.img_urls ??
              `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
            cache: "force-cache",
          }}
          resizeMode={"cover"}
          style={styles.image}
        />
      </SharedElement>
      <LinearGradient
        colors={["#0000", "#000A", "#000"]}
        style={styles.titleContainer}
      >
        <Text style={styles.text}>{titleWithLocale}</Text>
        <Text style={styles.timestamp}>
          {moment(post?.time).format("HH:MM DD, MMMM")}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
