import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux"
import { Navigate } from "react-router-dom"

interface ProtectedProps {
    component: ReactNode
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ component }) => {
    const user = useSelector((state: RootState) => state.users.user);
    // console.log(user);
    if (!user) {
        return <Navigate to="/" />
    }
    return component;
}

export default ProtectedRoute;