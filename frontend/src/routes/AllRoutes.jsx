import { Routes, Route } from 'react-router-dom';

import Jobs from '../pages/Jobs';
import Admin from '../pages/Admin';


import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import AdminRoute from './AdminRoutes';
import PrivateRoute from './PrivateRoute';
import AppliedJobs from '../pages/AppliedJob';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/applied-jobs" element={<AppliedJobs />} />
      
      {/* Private route for authenticated users */}
      <Route
        path="/"
        element={
          <PrivateRoute component={Jobs}/>
           
        }
      />

      {/* Admin route for admin users */}
      <Route
        path="/admin"
        element={
          <AdminRoute component={Admin}/>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
