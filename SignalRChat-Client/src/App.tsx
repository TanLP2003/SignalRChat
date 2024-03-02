import Chat from "./pages/Chat"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from "./redux";
import { useSelector } from "react-redux";
import Loading from "./components/common/Loading";
import Home from "./pages/Home";
import RootLayout from "./components/layout/RootLayout";
import NotFound from "./pages/NotFound";


function App() {
  const isLoading = useSelector((state: RootState) => state.loading.loading);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        style={{ zIndex: 99999999999999 }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/chat" element={<ProtectedRoute component={<Chat />} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      {isLoading && <Loading />}
    </>
  )
}

export default App
