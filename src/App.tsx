import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { LandingLayout } from "./layouts/LandingLayout";
import { DocsLayout } from "./layouts/DocsLayout";
import { LandingPage } from "./pages/LandingPage";
import { NotFound } from "./pages/NotFound";
import { GettingStarted } from "./pages/docs/GettingStarted";
import { Configuration } from "./pages/docs/Configuration";
import { Routing } from "./pages/docs/Routing";
import { Proxy } from "./pages/docs/Proxy";
import { Sharing } from "./pages/docs/Sharing";
import { Docker } from "./pages/docs/Docker";
import { CommandsReference } from "./pages/docs/CommandsReference";
import { Mcp } from "./pages/docs/Mcp";
import { Operations } from "./pages/docs/Operations";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <LandingLayout />,
        children: [
          { index: true, element: <LandingPage /> },
          { path: "*", element: <NotFound /> },
        ],
      },
      {
        path: "docs",
        element: <DocsLayout />,
        children: [
          { index: true, element: <GettingStarted /> },
          { path: "configuration", element: <Configuration /> },
          { path: "routing", element: <Routing /> },
          { path: "proxy", element: <Proxy /> },
          { path: "sharing", element: <Sharing /> },
          { path: "docker", element: <Docker /> },
          { path: "commands", element: <CommandsReference /> },
          { path: "mcp", element: <Mcp /> },
          { path: "operations", element: <Operations /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
