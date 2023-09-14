import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Shine,
} from "rn-placeholder";

const boxShadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  android: { elevation: 6 },
});

const styles = StyleSheet.create({
  container: {
    height: 240,
    marginBottom: 18,
    backgroundColor: "#fff",
    borderRadius: 24,
    marginHorizontal: 16,
  },
  shadowContainer: {
    ...boxShadow,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    height: 300,
  },
  titleContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: 240,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
    color: "#fff",
    paddingBottom: 24,
  },
});

const SkeletonArticle = ({}) => (
  <Placeholder
    Animation={(props) => (
      <Shine
        {...props}
        style={{ backgroundColor: "#ffffff" }}
        duration={1000}
      />
    )}
  >
    <TouchableOpacity activeOpacity={1} style={styles.container}>
      <PlaceholderMedia
        style={{ height: "100%", width: "100%", borderRadius: 24 }}
      />
      <LinearGradient
        colors={["#0000", "#000A", "#000"]}
        style={styles.titleContainer}
      >
        <PlaceholderLine
          width={80}
          height={20}
          style={{ backgroundColor: "#e3e6e4", opacity: 1 }}
        />
        <PlaceholderLine
          width={50}
          height={15}
          style={{ backgroundColor: "#e3e6e4", opacity: 1 }}
        />
      </LinearGradient>
    </TouchableOpacity>
  </Placeholder>
);

export default SkeletonArticle;
