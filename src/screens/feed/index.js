import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";

import styles from "./styles";
import { getNewsFeed } from "../../redux/action/feedAction";
import { NewsArticle } from "../../components/NewsArticle";
import { CATEGORIES } from "../../components/Category/category.constant";
import { Categories } from "../../components/Category";
import { SearchInput } from "../../components/SearchIput";
import SkeletonArticle from "../../components/skeleton/article-skeleton";
import ButtonTranslate from "../../components/Button/ButtonTranslate";

export const Feed = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const { newsFeed, searchResults, isLoading } = useSelector(
    (state) => state.feedReducer
  );

  useEffect(() => {
    dispatch(getNewsFeed(selectedCategory));
  }, [dispatch, selectedCategory]);

  const handleRefresh = useCallback(() => {
    dispatch(getNewsFeed(selectedCategory));
  }, [dispatch, selectedCategory]);

  const backgroundColor = useColorScheme() === "dark" ? "#000" : "#fff";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.searchHeader, { flexDirection: "row" }]}>
        <SearchInput
          searchText={searchText}
          setSearchText={setSearchText}
          setIsLoading={() => console.log("xx")}
          style={{ flexGrow: 1 }}
        />
        <ButtonTranslate style={{ flexShrink: 1 }} />
      </View>
      {!searchText?.trim() && (
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <FlatList
        keyExtractor={() => uuid.v4()?.toString()}
        showsVerticalScrollIndicator={false}
        data={searchText?.trim() ? searchResults : newsFeed}
        renderItem={({ item, index }) =>
          isLoading ? <SkeletonArticle /> : <NewsArticle post={item} />
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        style={styles.list}
      />
    </View>
  );
};
