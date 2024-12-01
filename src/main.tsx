import "./index.css";

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router";
import { IndexPage } from "./routes/index.tsx";
import { DetailPage } from "./routes/detail.tsx";
import { NuqsAdapter } from "nuqs/adapters/react-router";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: ":id",
        element: <DetailPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  </QueryClientProvider>,
);
