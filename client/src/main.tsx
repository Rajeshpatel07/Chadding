import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Home,
  Profile,
  Stream,
  Layout,
  VideoElement,
  Call,
  Join,
} from "./components/index.ts";
import App from "./App.tsx";
import Loading from "./components/Extra/Loading.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/:username/l/:streamId"
        element={
          <Suspense fallback={<Loading />}>
            <Stream />
          </Suspense>
        }
      />
      <Route
        path="/:username/w/:videoId"
        element={
          <Suspense fallback={<Loading />}>
            <VideoElement />
          </Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path="video"
        element={
          <Suspense fallback={<Loading />}>
            <Layout />
          </Suspense>
        }
      />

      <Route
        path="call"
        element={
          <Suspense fallback={<Loading />}>
            <Call />
          </Suspense>
        }
      />
      <Route
        path="join/:callId"
        element={
          <Suspense fallback={<Loading />}>
            <Join />
          </Suspense>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
