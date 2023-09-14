import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback } from "react";
import { TextInput, useColorScheme } from "react-native";
import { useTranslation } from "react-i18next";

import styles from "./styles";
import { resetSearchResults, searchNews } from "../../redux/action/feedAction";

export const SearchInput = ({ searchText, setSearchText, setIsLoading }) => {
  const backgroundColor = useColorScheme() === "dark" ? "#333" : "#ddd";
  const placeholderColor = useColorScheme() === "dark" ? "#eee" : "#111";
  const color = useColorScheme() === "dark" ? "#fff" : "#000";
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { language } = useSelector((state) => state.localeReducer);
  const { newsFeed } = useSelector((state) => state.feedReducer);

  const searchForText = useCallback(
    debounce((text) => {
      if (text?.trim().length > 0) {
        const results = newsFeed.filter((item) =>
          language === "vi"
            ? item.title.includes(text)
            : item.title_english.includes(text)
        );

        dispatch(searchNews(results));
      }
    }, 1000),
    [setSearchText, dispatch, setIsLoading]
  );
  return (
    <TextInput
      placeholder={t("search")}
      placeholderTextColor={placeholderColor}
      style={[styles.container, { backgroundColor, color }]}
      value={searchText}
      onChangeText={(text) => {
        setSearchText(text);
        searchForText(text);
      }}
      maxLength={40}
      returnKeyType={"search"}
    />
  );
};
