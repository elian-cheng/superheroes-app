import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';

interface INavigation {
  name: string;
  href: string;
}

const navigation: INavigation[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Form',
    href: '/form',
  },
];

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrapper">
          <Link to="/">
            <img className="header__logo" src={logo} alt="Elyte" />
          </Link>
          <nav className="header__nav nav">
            <ul className="nav__list">
              {navigation.map((link) => (
                <li key={link.name} className="nav__item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'nav__link nav__link_active' : 'nav__link'
                    }
                    to={link.href}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
