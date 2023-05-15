import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { Platform } from "react-native";

const config = {
	apiKey: "AIzaSyBXRzUJhSjMocoKTXL5VLZfheqZyST7cko",
  authDomain: "final-project-5d60e.firebaseapp.com",
  projectId: "final-project-5d60e",
  storageBucket: "final-project-5d60e.appspot.com",
  messagingSenderId: "1056418164863",
  appId: "1:1056418164863:web:02be48699c145df1c28f4a"
}

function initAuthNonWeb() {
  const persistence = getReactNativePersistence({
    getItem: AsyncStorage.getItem,
    removeItem: AsyncStorage.removeItem,
    setItem: AsyncStorage.setItem,
  });

  return initializeAuth(app, { persistence });
}

export const app = initializeApp(config);
export const auth = Platform.OS === "web" ? getAuth(app) : initAuthNonWeb();