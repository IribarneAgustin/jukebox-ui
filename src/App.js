import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MusicSearch from './Components/User/MusicSearch'
import TrackQueue from './Components/User/TrackQueue'
import LoginForm from './Components/Admin/LoginForm'
import authValidation from './Components/Utils/AuthValidation';
import AdminPanel from './Components/Admin/AdminPanel'
import PostPaymentError from './Components/Utils/PostPaymentError'

const ProtectedAdminPanel = authValidation(AdminPanel);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MusicSearch />} />
          <Route path="/track/queue" element={<TrackQueue />} />
          <Route path="/admin/login" element={<LoginForm />} />
          <Route path="/admin/dashboard" element={<ProtectedAdminPanel />} />
          <Route path="/error/postPayment" element={<PostPaymentError />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;