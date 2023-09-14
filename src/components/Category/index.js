import React from "react";
import { FlatList } from "react-native";
import styles from "./styles";
import { Tag } from "../Tag";
import { CATEGORIES_NAME } from "./category.constant";

export const Categories = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={Object.keys(CATEGORIES_NAME)}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <Tag
          category={item}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
    />
  );
};
