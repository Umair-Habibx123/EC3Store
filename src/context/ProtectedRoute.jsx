import React from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Forbidden from "../components/AdminDashboard/Forbidden";

const ProtectedRoute = ({ children, requiredRole }) => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [role, setRole] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setRole(userData.role);
                }
            }
            setIsLoading(false);
        };

        fetchUserRole();
    }, [user]);

    if (isLoading) return <div>Loading...</div>;

    if (!user || role !== requiredRole) {
        return <Forbidden />;
    }

    return children;
};

export default ProtectedRoute;
