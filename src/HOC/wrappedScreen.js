import React from "react";

const wrappedScreen = (Component) => {
  return (props) => {
    return <Component {...props} />;
  };
};
