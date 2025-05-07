import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { type MouseEvent} from 'react';
import Auth from '../../utils/auth';
import { GET_ME } from "../../utils/queries.js";
const Header = () => {
  const location = useLocation();
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Logs the user out by calling the logout method from Auth
    Auth.logout();
   
  };
  if (Auth.loggedIn()) {
    const { data } = useQuery(GET_ME);
    const user = data?.me || {};
    if (user.isContractor === false) {
      if (location.pathname === '/me') {
        return (
          <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
            <div className="container flex-row justify-space-between-lg justify-center align-center">
              <div>
                <Link className="text-light" to="/">
                  <h1 className="m-0">Pocket Mechanic</h1>
                </Link>
                <p className="m-0">affordable mechanics you can trust</p>
                <Link className="btn btn-lg btn-light m-2" to={`/`}>
                  Home
                </Link>
                <Link
                  className="btn btn-lg btn-light m-2"
                  to={`/addCarForm/${user._id}`}
                >
                  Add Car
                </Link>
                <Link
                  className="btn btn-lg btn-light m-2"
                  to={`/addCustomerPost/${user._id}`}
                >
                  Add Post
                </Link>
                <Link
                  className="btn btn-lg btn-light m-2"
                  to="/editCustomerProfile">
                      Edit Profile
                  </Link>
                <button className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </header>
        );
      } else {
         return (
        <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
          <div className="container flex-row justify-space-between-lg justify-center align-center">
            <div>
              <Link className="text-light" to="/">
                <h1 className="m-0">Pocket Mechanic</h1>
              </Link>
              <p className="m-0">affordable mechanics you can trust</p>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Retrieving the logged-in user's profile to display the username */}
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
                 </button>
            </div>
          </div>
        </header>
      );
      }
    } else {
      if (location.pathname === "/me") {
        return (
          <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
            <div className="container flex-row justify-space-between-lg justify-center align-center">
              <div>
                <Link className="text-light" to="/">
                  <h1 className="m-0">Pocket Mechanic</h1>
                </Link>
                <p className="m-0">affordable mechanics you can trust</p>
                <Link className="btn btn-lg btn-light m-2" to={`/`}>
                  Home
                </Link>
                <Link
                  className="btn btn-lg btn-info m-2"
                  to={`/addContractorPost/${user._id}`}
                >
                  Add Post
                </Link>
                <Link
                  className="btn btn-lg btn-light m-2"
                  to={`/addEmployee/${user._id}`}
                >
                  Add Employee
                </Link>
                <Link
                  className="btn btn-lg btn-light m-2"
                  to="/editContractorProfile"
                >
                  Edit Profile
                </Link>

                <button className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </header>
        );
      } else {
        return (
          <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
            <div className="container flex-row justify-space-between-lg justify-center align-center">
              <div>
                <Link className="text-light" to="/">
                  <h1 className="m-0">Pocket Mechanic</h1>
                </Link>
                <p className="m-0">affordable mechanics you can trust</p>
                <Link className="btn btn-lg btn-info m-2" to="/me">
                  {/* Retrieving the logged-in user's profile to display the username */}
                  {Auth.getProfile().data.username}'s profile
                </Link>
               
                <button className="btn btn-lg btn-light m-2" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </header>
        );
      }
    }
  } else {
    return (<header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Pocket Mechanic</h1>
          </Link>
          <p className="m-0">affordable mechanics you can trust</p>
          <Link className="btn btn-lg btn-info m-2" to="/login">
            Login
          </Link>
          <Link className="btn btn-lg btn-light m-2" to="/signup">
            Signup
          </Link>
        </div>
      </div>
    </header>);
  }
};

export default Header;
