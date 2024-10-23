import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaCalendar,  FaFileAlt , FaUser, FaCog, FaArrowLeft, FaEnvelope, FaComment } from 'react-icons/fa';
import { MdContactPhone } from "react-icons/md";
import { HiMiniTrophy } from "react-icons/hi2";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";
import Cookies from 'js-cookie';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // Manage dropdown state for activities
  const [isActivitiesOpen, setActivitiesOpen] = useState(false);
  const [token, setToken] = useState<string | null>(Cookies.get('userToken'));
  const loginType = Cookies.get('loginType'); // Fetch loginType from cookies

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const handleMenuClick = () => {
    setSidebarOpen(false);
  };



  let usertype_name =  Cookies.get("loginType");
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          {/* Add your icon here if needed */}
        </button>
        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="block lg:hidden absolute top-5 left-5 z-50 text-black bg-transparent border-0"
          >
            <FaArrowLeft size={24} />
          </button>
        )}
      </div>
      {/* SIDEBAR HEADER */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* Menu Group */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-black dark:text-white ">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* Menu Item Dashboard */}
              <NavLink
                to="/dashboard"
                onClick={handleMenuClick}
                className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                  pathname.includes('dashboard') && ''
                }`}
              >
                <FaHome className="text-lg text-red-500" />
                Dashboard 
              </NavLink>

              {/* Menu Item Calendar */}
              <li>
  { usertype_name == 'team_lead' && <NavLink
    to="/dashboard/statics"
    onClick={handleMenuClick}
    className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark  dark:hover:bg-meta-4 ${
      pathname.includes('calendar') && ''
    }`}
  >
    <FaCalendar className="text-lg text-green-400" />
    Statics
  </NavLink>}

 { usertype_name === 'team_lead' && <NavLink
    to="/dashboard/create-lead"
    onClick={handleMenuClick}
    className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark  dark:hover:bg-meta-4 ${
      pathname.includes('calendar') && ''
    }`}
  >
    <FaCalendar className="text-lg text-green-400" />
    create-lead
  </NavLink>}

  <NavLink
    to="/dashboard/calendar"
    onClick={handleMenuClick}
    className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark  dark:hover:bg-meta-4 ${
      pathname.includes('calendar') && ''
    }`}
  >
    <FaCalendar className="text-lg text-green-400" />
    Calendar
  </NavLink>

</li>


              {/* Menu Item Counsellor */}
              
              {/* Menu Item Profile */}
              <li>
                <NavLink
                  to="/dashboard/profile"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black hover:text-white duration-300 ease-in-out dark:text-white hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <FaUser className="text-lg text-yellow-400" />
                  Profile
                </NavLink>
              </li>

              {/* <li>
                <NavLink
                  to="/dashboard/contact"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black hover:text-white duration-300 ease-in-out dark:text-white hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('calender') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  < MdContactPhone className="text-xl text-purple-400" />
                 Contacts
                </NavLink>
              </li> */}

              {/* <li>
                <NavLink
                  to="/dashboard/call"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('documents') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  < FaPhoneVolume  className="text-lg text-blue-500 " />
                 Call
                </NavLink>
              </li> */}

              <li>
                <NavLink
                  to="/dashboard/meeting"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('documents') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  < MdGroups2 className="text-xl text-green-400" />
                 Meeting
                </NavLink>
              </li>

              
             

              <li>
                <NavLink
                  to="/dashboard/performance"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('settings') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                 <HiMiniTrophy className="text-lg text-orange-400" />
                  Performance
                </NavLink>
              </li>

              {/* Activities Section */}
              <li>
                <div
                  onClick={() => setActivitiesOpen(!isActivitiesOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    isActivitiesOpen ? 'bg-graydark dark:bg-meta-4' : ''
                  }`}
                >
                  <FaFileAlt className="text-lg text-purple-400" />
                  Activities
                  <span className={`ml-auto ${isActivitiesOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </div>
                {isActivitiesOpen && (
                  <ul className="pl-4 mt-2 space-y-1">
                    <li>
                      <NavLink
                        to="/dashboard/send-message"
                        onClick={handleMenuClick}
                        className={`group flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('send-message') && 'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <FaComment className="text-lg text-blue-500" />
                        Send Message
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/send-email"
                        onClick={handleMenuClick}
                        className={`group flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black dark:text-white hover:text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('send-email') && 'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <FaEnvelope className="text-lg text-blue-500" />
                        Send Email
                      </NavLink>
                    </li>
                    
                  </ul>
                )}
              </li>
              <li>
  
              </li>
              {loginType === 'sales_person' || loginType === 'counselor' ? (
                   
              <li>
                <NavLink
                  to="/dashboard/sales"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-black hover:text-white duration-300 ease-in-out hover:bg-graydark dark:text-white dark:hover:bg-meta-4 ${
                    pathname.includes('documents') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  < MdGroups2 className="text-xl" />
                 Sales
                </NavLink>
              </li>
              ) : null}

            </ul>
           
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
