import { Dashboard } from "@/views/dashboardView";


export function AdminDashboardPage(){
    return <Dashboard user="admin"/>
}

export function UserDashboardPage(){
    return <Dashboard user="user" />
}