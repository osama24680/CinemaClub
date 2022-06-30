import { Outlet, Navigate } from 'react-router-dom'
const ProtectedRoute = () => {
    return (
        <div>
            {localStorage.getItem("cinemaClubToken") ? <Outlet /> : <Navigate to="/signin" />}
        </div>
    )
}
export default ProtectedRoute
