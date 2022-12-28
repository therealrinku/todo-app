import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { Homepage } from "../pages/homepage";
import { Auth } from "../pages/auth";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientConfig, QueryClientProvider } from "react-query";
import { RootContext } from "../context/RootContext";
import axios, { AxiosError } from "axios";
import { getUserInfoEndpoint } from "../queryHooks/auth";
import { ChangePassword } from "../pages/change-password";
import { PrivateRoute } from "../components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const queryClientConfig: QueryClientConfig = {
    defaultOptions: {
      queries: { staleTime: Infinity, retry: false, refetchOnWindowFocus: false },
    },
  };

  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  const [userEmail, setUserEmail] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios
        .get(getUserInfoEndpoint)
        .then((res) => {
          setLoading(false);
          setUserEmail(res.data?.userEmail);
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const HomeComponent = loading ? (
    <p className="text-center mx-auto mt-10">Loading...</p>
  ) : userEmail ? (
    <Dashboard />
  ) : (
    <Homepage />
  );

  return (
    <BrowserRouter>
      <RootContext.Provider value={{ userEmail, setUserEmail }}>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="dark"
        />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="" element={HomeComponent} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/change-password"
              element={
                <PrivateRoute>
                  <ChangePassword />
                </PrivateRoute>
              }
            />
          </Routes>
        </QueryClientProvider>
      </RootContext.Provider>
    </BrowserRouter>
  );
}

export default App;
