import React, { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase"; // Správná inicializace Firestore
import { doc, getDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // Uložíme roli uživatele
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        console.log(user)

        // Načtení role uživatele z Firestore
        try {
          const userRef = doc(db, "users", user.uid); // Odkaz na dokument uživatele
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserRole(docSnap.data().role); // Získání role z dokumentu
            console.log("User role: ", docSnap.data().role); // Vypíšeme roli uživatele
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user role: ", error);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole, // Zpřístupníme roli uživatele
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
