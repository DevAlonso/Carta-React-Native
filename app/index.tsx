import { View, StyleSheet } from "react-native";
import App from './App/App';

export default function Index() {
  return (
    <View style={styles.container}>
      <App />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});