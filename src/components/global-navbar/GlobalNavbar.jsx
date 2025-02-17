import logo from 'assests/logos/stay_booker_logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from 'components/hamburger-menu/HamburgerMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NavbarItems from 'components/navbar-items/NavbarItems';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
const GlobalNavbar = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const isAuthenticated = useSelector((state) => {
    return state.auth.authCheck;
  });
  const onHamburgerMenuToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-10 flex flex-wrap justify-between items-center px-4 md:px-12 global-navbar__container bg-brand brand-divider-bottom shadow-md">
      <div className="flex" style={{ backgroundColor: 'gray' }}>
        <Link to="/">
          <img src={logo} alt="site logo" className="site-logo__img" />
        </Link>
      </div>
      <ul className="list-none hidden md:flex">
        <NavbarItems isAuthenticated={isAuthenticated} />
      </ul>
      <FontAwesomeIcon
        data-testid="menu-toggle__button"
        icon={faBars}
        size="2x"
        color="#fff"
        className="block md:hidden"
        onClick={onHamburgerMenuToggle}
      />
      <HamburgerMenu
        isVisible={isVisible}
        onHamburgerMenuToggle={onHamburgerMenuToggle}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};
const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStatetoProps)(GlobalNavbar);
