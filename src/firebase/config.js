import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCzEAgBGBxjRg6teNwngi1pcjMqtujkuow",
  authDomain: "reservation-app-d4ab1.firebaseapp.com",
  projectId: "reservation-app-d4ab1",
  storageBucket: "reservation-app-d4ab1.firebasestorage.app",
  messagingSenderId: "18542921909",
  appId: "1:18542921909:web:a4a0aab162f964df75d6fc",
  measurementId: "G-NRLF9EHWJ7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);