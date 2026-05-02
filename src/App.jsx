import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "./components/shared/AppShell";
import { CarbonProvider } from "./hooks/useCarbonContext";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Integrations from "./pages/Integrations";
import Scheduler from "./pages/Scheduler";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "scheduler", element: <Scheduler /> },
      { path: "analytics", element: <Analytics /> },
      { path: "integrations", element: <Integrations /> }
    ]
  }
]);

export default function App() {
  return (
    <CarbonProvider>
      <RouterProvider router={router} />
    </CarbonProvider>
  );
}
