import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { type MouseEvent} from 'react';
import Auth from '../../utils/auth';
import { GET_ME } from "../../utils/queries.js";
const Header = () => {
  
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Logs the user out by calling the logout method from Auth
    Auth.logout();
   
  };
  if (Auth.loggedIn()) {
    const { username: userParam } = useParams();
    const { data } = useQuery(GET_ME, {
      variables: { username: userParam },
    });
    const user = data?.me || {};
    if (user.isContractor === false) {
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
              <Link className="btn btn-lg btn-light m-2" to={`/addCarForm/${user._id}`}>
                add car
              </Link>
              <Link className="btn btn-lg btn-light m-2" to={`/addCustomerPost/${user._id}`}>
                add Post
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
              <Link className="btn btn-lg btn-info m-2" to={`/addContractorPost/${user._id}`}>
                add Post
              </Link>
              <Link className="btn btn-lg btn-light m-2" to={`/addEmployee/${user._id}`}>
                add Employee
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
  /*return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Pocket Mechanic</h1>
          </Link>
          <p className="m-0">affordable mechanics you can trust</p>
        </div>
        <div>
          {/* Checking if the user is logged in to conditionally render profile link and logout button */
          /*{Auth.loggedIn() && user.isContractor === false ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Retrieving the logged-in user's profile to display the username */
               /* {Auth.getProfile().data.username}'s profile
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/addCarForm">
                add car
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
              
            </>
          )}
        </div>
      </div>
    </header>
  );*/
};

export default Header;
