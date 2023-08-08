// Importacion de node_modules
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Credenciales de firebase
/*
    ATENCIÓN: Se deben colocar las siguientes reglas en firebase:
    >>> allow read, write: if true;
    Si se desea realizar tareas de edición y eliminación.
*/
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROYECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGESENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID
};

// Inicializar Firebase App
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);