import { NavLink, useLocation, useParams } from "react-router-dom";
import { FaHome, FaUserFriends, FaRegFileAlt, FaUsers } from "react-icons/fa";
import homeIcon from "../assets/HomeHome.svg";
import { Building2, FileBarChart } from "lucide-react";
function Sidebar() {
  const companyName = localStorage.getItem("auditor_company");
  const address = localStorage.getItem("auditor_address");
  const location = useLocation();
  const { customerId,auditorId } = useParams();
 
  // Check if current path is add-auditor to highlight the home link
  const isHomeActive = location.pathname === "/" || location.pathname === "/add-auditor" || location.pathname === `/add-auditor/${auditorId}`;
  const isDocumentActive = location.pathname === "/documents" || location.pathname === "/document-view" || location.pathname === "/document-view-month" || location.pathname === "/document-view-days" || location.pathname === "/document-view-list" || location.pathname === "/document-preview";
  const isCustomerActive = location.pathname === "/customers" || location.pathname === "/add-customer" || location.pathname === `/add-customer/${customerId}`

  console.log(location.pathname);
  
  return (
    <div className="w-56 bg-white h-full border-r-2 border-gray-100">
      <div className="border-b-2 border-gray-100 p-4 h-14">
        <h1 className="text-2xl font-bold text-blue-600">Pimins.ai</h1>
      </div>
      <div className="mt-2 p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E0EFEE]">
            <Building2 />
          </div>
          <div>
            <p className="text-sm text-gray-600">{companyName}</p>
            <p className="text-xs text-gray-500">{address}</p>
          </div>
        </div>
      </div>

      <nav className="mt-4 p-4">
        <div className="py-2 ">
          <p className="subheading-x-small text-[#868C98] uppercase">Main</p>
        </div>

        {/* <NavLink
                    to="/maindhashboard"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-[#525866] label-small ${isActive || isHomeActive ? 'bg-[#368FFD] text-[#ffff] rounded-lg' : ''
                        }`
                    }
                >
                    <FaHome className="w-5 h-5 mr-3"/>
                    <span>Dashboard</span>
                </NavLink> */}
        {/* <img src={homeIcon} alt="" className="w-5 h-5 mr-3" /> */}

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-[#525866] label-small ${
              isActive || isHomeActive
                ? "bg-[#368FFD] text-[#ffff] rounded-lg"
                : ""
            }`
          }
        >
          {/* <img src={homeIcon} alt="" className="w-5 h-5 mr-3" /> */}
          <FaHome className="w-5 h-5 mr-3" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
                    to="/auditors"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-[#525866] label-small ${isActive ? 'bg-[#368FFD] text-[#ffff] rounded-lg' : ''
                        }`
                    }
                >
                    <FaUsers className="w-5 h-5 mr-3" />
                    <span>Auditor</span>
                </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-[#525866] label-small ${
              isActive ? "bg-[#368FFD] text-[#ffff] rounded-lg" : ""
            }`
          }
        >
          <FileBarChart className="w-5 h-5 mr-3" />
          <span>Report</span>
        </NavLink>

        {/* <NavLink
          to="/customer"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-[#525866] label-small ${
              isActive || isCustomerActive ? "bg-[#368FFD] text-[#ffff] rounded-lg" : ""
            }`
          }
        >
          <FaUserFriends className="w-5 h-5 mr-3" />
          <span>Customer</span>
        </NavLink>
        <NavLink
          to="/documents"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 text-[#525866] label-small ${
              isActive || isDocumentActive ? "bg-[#368FFD] text-[#ffff] rounded-lg" : ""
            }`
          }
        >
          <FaRegFileAlt className="w-5 h-5 mr-3" />
          <span>Documents</span>
        </NavLink> */}

      </nav>
    </div>
  );
}

export default Sidebar;
