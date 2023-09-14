import React, { useCallback } from "react";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import { useTranslation } from "react-i18next";

import styles from "./styles";
import { CATEGORIES_NAME } from "../Category/category.constant";
import { useDispatch } from "react-redux";
import { setCurrentCategory } from "../../redux/action/categoryAction";

export const Tag = ({ category, selectedCategory, setSelectedCategory }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const textColor = useColorScheme() === "dark" ? "#fff" : "#000";

  const handlePress = useCallback(() => {
    dispatch(setCurrentCategory(category));
    setSelectedCategory(category);
  }, [category, setSelectedCategory]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selectedCategory === category && styles.selected,
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.text, { color: textColor }]}>{t(category)}</Text>
    </TouchableOpacity>
  );
};
