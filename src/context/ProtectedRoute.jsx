import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Forbidden from "../components/AdminDashboard/Forbidden";
import LoadingSpinner from "../utils/LoadingSpinner";

const ProtectedRoute = ({ children, requiredRole }) => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setRole(userData.role);
                }
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    if (isLoading) {
        return (

            <LoadingSpinner size="xl" />
        );
    }

    if (!user || role !== requiredRole) {
        return <Forbidden />;
    }

    return children;
};

export default ProtectedRoute;