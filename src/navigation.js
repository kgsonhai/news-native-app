// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// import { Feed } from "./screens/feed";
// import { NewsDetails } from "./screens/newsDetail";

// const Stack = createNativeStackNavigator();

// export const RootNavigation = () => {
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="home"
//           screenOptions={{ headerShown: false }}
//         >
//           <Stack.Screen name="Feed" component={Feed} />

//           <Stack.Screen
//             name="NewsDetails"
//             component={NewsDetails}
//             options={{
//               cardStyleInterpolator: ({ current: { progress } }) => {
//                 return {
//                   cardStyle: {
//                     opacity: progress,
//                   },
//                 };
//               },
//             }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };
