import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Power } from 'lucide-react';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
      };

    // Get page title based on current route
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                // return 'Home';
                return 'Admin Dashboard';
            case '/auditors':
                return 'Auditors';
            case '/customer':
                return 'Customers';
            case '/documents':
                return 'Documents';
            default:
                return 'Dashboard';
        }
    };

    return (
        <div className="bg-white shadow-sm border-b-2 border-gray-100 h-14 flex justify-between items-center p-4">

            <div>
                <p className="label-large">{getPageTitle()}</p>

            </div>

            <div className="flex items-center space-x-4">



                <div className="flex items-center space-x-2">
                    <img
                        src={`https://ui-avatars.com/api/?name=Super Admin`}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="label-small">Super Admin</span>
                </div>
                <button onClick={handleLogout}>
                  <Power  className='text-red-500' />
                </button>
            </div>

        </div>
    );
}

export default Header;