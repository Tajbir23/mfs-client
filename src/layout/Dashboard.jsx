import { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';


// import useProtect from '../hooks/useProtect';

const DashboardLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user, logOut} = useContext(AuthContext)

  // const {refetch} = useProtect()
  const navigate = useNavigate()


  const handleLogout = () => {
    logOut()
    
    navigate('/login')
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`w-64 bg-white shadow-md ${isMenuOpen ? 'block fixed top-14 h-full md:static' : 'hidden'} md:block`}>
        <nav className="mt-5">
          <ul>
            <li className="mb-2 hidden md:block">
              <h1 className="flex font-bold text-xl items-center p-2 hover:bg-gray-200 rounded-md">
                Balance {user?.balance} tk
              </h1>
            </li>
            <li className="mb-2">
              <h1 className="flex text-xl font-bold items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md">
                {user?.name} {`(${user?.role})`}
              </h1>
            </li>
            <li className="mb-2">
              <NavLink to='/dashboard' className=" w-full flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md">
                Transaction History
              </NavLink>
            </li>
            <li className="mb-2">
              <button className=" w-full flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md">
                Send money
              </button>
            </li>
            <li className="mb-2">
              <button className=" w-full flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md">
                Cash In
              </button>
            </li>
            <li className="mb-2">
              <button className=" w-full flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md">
                Cash Out
              </button>
            </li>

            
            {user?.role === "admin" && <li className="mb-2">
              <NavLink to='/dashboard/manage_user' className=" w-full flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md">
                User management
              </NavLink>
            </li>}


            <li className="mb-2">
              <button onClick={handleLogout} className=" w-full flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded-md">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white p-4 shadow-md md:hidden z-30">
          <button
            className="text-gray-500 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <h1 className="text-xl font-semibold">{user?.balance}Tk</h1>
        </header>
        <main className="flex-1 p-4">
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
