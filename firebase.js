// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Put you credentials here
  apiKey: "AIzaSyDk8njHexuuR5-vZpJg8ILbBcH_1WRpkyc",
    authDomain: "fir-crud-cd735.firebaseapp.com",
    projectId: "fir-crud-cd735",
    storageBucket: "fir-crud-cd735.appspot.com",
    messagingSenderId: "166457141550",
    appId: "1:166457141550:web:7059792fb089088cfd72bf",
    measurementId: "G-Y3TJ5P4RNJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} nome the nome of the Task
 * @param {string} sobrenome the sobrenome of the Task
 */
export const saveTask = (nome,sexo,email,cpf,rg,telefone,endereco,numero,cep,complemento) =>
  addDoc(collection(db, "tasks"), { nome,sexo,email,cpf,rg,telefone,endereco,numero,cep,complemento });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));