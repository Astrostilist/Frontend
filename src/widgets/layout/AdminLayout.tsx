import { Outlet } from "react-router-dom";
import { Sidebar } from "./ui/Sidebar/Sidebar";

export const AdminLayout = () => {
    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
            }}
        >
            <Sidebar
                user={{
                    name: "Ирина С.",
                    avatar: "",
                }}
            />

            <main
                style={{
                    flex: 1,
                    padding: "20px",
                    overflow: "auto",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <Outlet />
            </main>
        </div>
    )
}