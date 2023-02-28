import logo from '../public/Logo.png'

import { NavLink as RouterNavLink } from "react-router-dom";


import { useAuth0 } from "@auth0/auth0-react";

const AnotherBar = () => {

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();


  const logoutWithRedirect = () =>
    logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
    });

  return (
    <div className="Navbar">
      <RouterNavLink to="/" exact> <img src={logo} alt='logo' /> </RouterNavLink>

                <RouterNavLink
                  // tag={RouterNavLink}
                  to="/"
                  exact
                  className="Magnet"
                >
                  Recipes
                </RouterNavLink>
                {/* <RouterNavLink to="/recipes" className='Magnet'>Recipes</RouterNavLink> */}

              
              
            {!isAuthenticated && (
             
                  <button
                  className="Magnet"
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </button>

         
            )}
            {isAuthenticated && (
              <div className="logProfile">
                <RouterNavLink  className="Magnet"  to="/add" >

                    Add page

                </RouterNavLink>


                <RouterNavLink  className="Magnet" to="/favorites" >

                  Favourites

                  </RouterNavLink>

              <div> 
                <button    className="Magnet"
                    onClick={() => logoutWithRedirect()}>
                    Log out
                </button>
                </div>
                <div>
                    <img
                      src={user.picture}
                      alt="Profile"
                      width="50"
                      />
                      </div>
              </div>

            )}
    </div>
  );
};

export default AnotherBar;