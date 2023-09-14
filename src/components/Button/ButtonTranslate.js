import React from "react";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { dispatchChangeLanguage } from "../../redux/action/localeAction";

const ButtonTranslate = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.localeReducer);

  const handleChangeLanguage = () => {
    const lang = language === "vi" ? "en" : "vi";
    i18n.changeLanguage(lang);
    dispatch(dispatchChangeLanguage(lang));
  };

  return (
    <TouchableOpacity
      style={styles.FacebookStyle}
      activeOpacity={0.5}
      onPress={handleChangeLanguage}
    >
      <Image
        source={
          language == "vi"
            ? require("../.././../assets/uk.png")
            : require("../.././../assets/vietnam.png")
        }
        style={styles.ImageIconStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonFacebookStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#485a96",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 10,
    width: 10,
    resizeMode: "stretch",
  },
});

export default ButtonTranslate;
