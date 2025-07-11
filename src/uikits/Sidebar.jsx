import React, { useState, useEffect } from 'react';
import {
  FaBars,
  FaTimes,
  FaThLarge,
  FaShoppingBag,
  FaChevronDown,
  FaChevronUp,
  FaCar,
 FaParking 
} from 'react-icons/fa';
import { FaRoute } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoIosPerson } from "react-icons/io";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MobileHeader from './MobileHeader';

export const sidebarData = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <FaThLarge />,
    link: '/dashboard',
    hasSubmenu: false,
    roles: ['admin','gestionnaire',],
  },
  {
    id: 'Parcs',
    label: 'Parcs',
    icon: <FaParking  />,
    link: '/parcs',
    hasSubmenu: true,
    roles: ['admin', 'gestionnaire'],
    submenu: [
      { id: 'liste des Parcs', label: 'Listes des Parcs', link: '/parcs', roles: ['gestionnaire'] },
      { id: 'Parcs Table', label: 'Parcs Table', link: '/allParcs', roles: ['admin'] },
    ],
  },
  {
    id: 'Vehicules',
    label: 'Vehicules',
    icon: <FaCar />,
    link: '/vehicules',
    hasSubmenu: true,
    roles: ['admin', 'chauffeur', 'gestionnaire'],
    submenu: [

      { id: 'liste des Vehicules', label: 'Listes des Vehicules', link: '/vehicules', roles: ['gestionnaire', 'chauffeur'] },
      { id: 'Vehicules Table', label: 'Vehicules Table', link: '/allVehicules', roles: ['admin'] },
    ],
  },
  {
    id: 'Trajets',
    label: 'Trajets',
    icon: <FaRoute />,
    link: '/trajets',
    hasSubmenu: true,
    roles: ['admin', 'gestionnaire'],
    submenu: [
      { id: 'liste des trajets', label: 'Listes des trajets', link: '/trajets', roles: ['gestionnaire'] },
    ],
  },
  {
    id: 'voyages',
    label: 'Voyages',
    icon: <FaShoppingBag />,
    link: '/voyages',
    hasSubmenu: true,
    roles: ['admin', 'chauffeur', 'voyageur', 'gestionnaire'],
    submenu: [
      { id: 'liste des voyages', label: 'Listes des voyages', link: '/voyages', roles: ['gestionnaire', 'chauffeur'] },
      { id: 'Les voyages', label: 'Les voyages', link: '/allVoyages', roles: ['voyageur'] },
      { id: 'Voyages Table', label: 'Voyages Table', link: '/allVoyagesTable', roles: ['admin'] },
    ],
  },
  {
    id: 'Reservations',
    label: 'Reservations',
    icon: <FaShoppingBag />,
    link: '/mes-reservations',
    hasSubmenu: true,
    roles: ['voyageur', 'gestionnaire', 'admin'],
    submenu: [
      { id: 'Mes Reservations', label: 'Mes Reservations', link: '/mes-reservations', roles: ['voyageur'] },
    ],
  },
  {
    id: 'separator-1',
    separator: true,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <IoIosPerson />,
    link: '/profile',
    hasSubmenu: false,
    roles: ['admin', 'voyageur', 'chauffeur', 'gestionnaire'],
  },
  {
    id: 'Creer un utilisateur',
    label: 'Utilisateur',
    icon: <IoIosPerson />,
    link: '/registerUser',
    hasSubmenu: false,
    roles: ['gestionnaire', 'admin'],
  }
];

const SidebarItem = ({ item,activeItemId, setActiveItemId, isExpanded, toggleMenu }) => {
  const handleClick = (e) => {
    if (item.hasSubmenu) {
      e.preventDefault();
      toggleMenu(item.id);
      (item.label);
    }
    setActiveItemId(item.id);
  };

  const handleSubmenuClick = (id) => {
    setActiveItemId(id);
  };

  const isActive = activeItemId === item.id;
  const isSubmenuItemActive = item.submenu?.some(subItem => activeItemId === subItem.id);

  return (
    <>
      {!item.separator ? (
        <li className={`menu-item ${isActive || isSubmenuItemActive ? 'active' : ''}`}>
          <a
            href={item.link}
            className={`menu-link ${item.hasSubmenu ? 'has-submenu' : ''}`}
            onClick={handleClick}
          >
            <div>{item.icon && <span className="menu-icon">{item.icon}</span>}
            <span>{item.label}</span></div>
            {item.hasSubmenu && (
              <span className="dropdown-icon">
                {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            )}
          </a>
          {item.hasSubmenu && (
            <ul className={`submenu ${isExpanded ? 'expanded' : ''}`}>
              {item.submenu.map((subItem) => (
                <li
                  key={subItem.id}
                  className={`submenu-item ${activeItemId === subItem.id ? 'active' : ''}`}
                >
                  <a
                    href={subItem.link}
                    className="submenu-link"
                    onClick={() => handleSubmenuClick(subItem.id)}
                  >
                    {subItem.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ) : (
        <li className="menu-item separator"></li>
      )}
    </>
  );
};

const Sidebar = () => {
  const [activeItemId, setActiveItemId] = useState(null);
  const initialMenus = {
  Parcs: false,
  Vehicules: false,
  voyages: false,
  Reservations: false,
};
  const [expandedMenus, setExpandedMenus] = useState(initialMenus);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    localStorage.setItem('expandedMenus', JSON.stringify(expandedMenus));
  }, [expandedMenus]);

  const filteredSidebarData = sidebarData
    .filter((item) => {
      if (item.separator) return true;
      if (!item.roles) return true;
      return item.roles.includes(user?.role);
    })
    .map((item) => {
      if (item.hasSubmenu) {
        const filteredSubmenu = item.submenu.filter((sub) =>
          sub.roles ? sub.roles.includes(user?.role) : true
        );
        if (filteredSubmenu.length === 0) return null;
        return { ...item, submenu: filteredSubmenu };
      }
      return item;
    })
    .filter(Boolean);

  return (
    <>
       <MobileHeader toggleSidebar={toggleSidebar} />
      <div className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="logo-icon">
            <img src="/logo.png" alt="Logo" />
          </span>
          <span className="logo-text">Auto-Track</span>

          <span className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </span>
        </div>

        <ul className="menu">
          {filteredSidebarData.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              activeItemId={activeItemId}
              setActiveItemId={setActiveItemId}
              isExpanded={expandedMenus[item.id] || false}
              toggleMenu={toggleMenu}
            />
          ))}
        </ul>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <span>Deconnexion</span><span className="logout-icon"><CiLogout /></span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

