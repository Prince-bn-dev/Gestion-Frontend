import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getParcById } from './api/parcApi';
import { AuthProvider, useAuth } from "./context/AuthContext";
  import { Bounce, ToastContainer } from 'react-toastify';
import "./slick-theme.min.css";
import "./slick.min.css";


import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./components/Auth/VerifyEmail";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Navbar from "./components/Navbar";
import ParcForm from "./components/parcs/ParcForm";
import Profile from "./pages/Profile";
import ParcList from "./components/parcs/ParcList";


import ParcDetail from "./components/parcs/ParcDetails";
import UpdatePassword from "./components/Auth/UpdatePassword";
import Home from "./pages/Home";
import VehiculesList from "./components/vehicules/VehiculeList";
import VehiculeForm from "./components/vehicules/VehiculeForm";
import VehiculeDetail from "./components/vehicules/VehiculeDetail";
import VoyageForm from "./components/voyages/VoyageForm";
import MyVoyages from "./components/voyages/MyVoyages";
import ReservationForm from "./components/Reservations/ReservationForm";
import MesReservations from "./components/Reservations/MesReservations";
import VoyageList from "./components/voyages/VoyageList";
import Dashboard from "./pages/Dashboard";
import ParcsTable from "./components/parcs/ParcsTable";
import VehiculesTable from "./components/vehicules/VehiculesTable";
import VoyagesTable from "./components/voyages/VoyagesTable";
import Contact from "./pages/Contact";
import About from "./pages/About";

const EditparcWrapper = () => {
  const { id } = useParams();
  const [parc, setParc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getParcById(id)
      .then((data) => setParc(data))
      .catch(() => alert('parc introuvable'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!parc) return <p>parc non trouvé</p>;

  return <ParcForm parc={parc} />;
};

function AppRoutes() {
  const { token, user } = useAuth();

  return (
    <div className="app">
      {token && user ? (
        <div className="layout-with-sidebar">
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        />
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/allparcs" element={<ParcsTable />} />
              <Route path="/parcs" element={<ParcList />} />
              <Route path="/parcs/create" element={<ParcForm />} />
              <Route path="/parcs/:id" element={<ParcDetail />} />
              <Route path="/parcs/edit/:id" element={<EditparcWrapper />}/>



              <Route path="/vehicules" element={<VehiculesList />} />
              <Route path="/vehicules/create" element={<VehiculeForm />} />
              <Route  path="/vehicules/edit/:id" element={<VehiculeForm />}/>
              <Route path="/vehicules/:id" element={<VehiculeDetail />} />
              <Route path="/allVehicules" element={<VehiculesTable />} />


              <Route path="/voyages" element={<MyVoyages />} />
              <Route path="/voyages/new" element={<VoyageForm />} />
              <Route path="/voyages/edit/:id" element={<VoyageForm />} />
              <Route path="/allVoyagesTable" element={<VoyagesTable />} />
              


              <Route path="/reservations/paiement/:reservationId" element={<ReservationForm />} />
              <Route path="/reservations/edit/:id" element={<ReservationForm />} />
              <Route path="/mes-reservations" element={<MesReservations />} />
              <Route path="/allVoyages" element={<VoyageList />} />


              <Route path="/profile" element={<Profile/>} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="layout-no-sidebar">
          <ToastContainer />
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home/>} />
               <Route path="/about" element={<About/>} />
                <Route path="/contact" element={<Contact/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/verifyEmail/:emailToken" element={<VerifyEmail />} />
              <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
              
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
          
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
