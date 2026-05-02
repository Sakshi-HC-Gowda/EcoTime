import { Outlet, useLocation } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

const placeholders = {
  "/": "Search insights...",
  "/scheduler": "Search tasks or data nodes...",
  "/analytics": "Search analytics...",
  "/integrations": "Search integrations..."
};

export function AppShell() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Sidebar />
      <Navbar placeholder={placeholders[pathname] ?? "Search EcoTime..."} />
      <main className="ml-64 min-h-screen pt-16">
        <Outlet />
      </main>
      <button className="fixed bottom-lg right-lg z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-on-primary shadow-xl shadow-primary-container/20 transition-transform hover:scale-110">
        <Icon name="bolt" />
      </button>
    </div>
  );
}
