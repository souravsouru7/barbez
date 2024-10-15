import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, User, ShoppingBag, LogOut, List, Clock, Calendar, Scissors, PowerOff } from 'lucide-react';
import { fetchShopDetails, toggleWorkMode } from '../../redux/slices/shopSlice';
import { logout } from '../../redux/slices/shopkeeperSlice';

const NavigationCard = ({ icon, label, to }) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <div className={`
        p-4 rounded-xl transition-all duration-300
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' 
          : 'bg-white text-gray-600 hover:bg-gray-50'}
      `}>
        <div className="flex flex-col items-center space-y-2">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
      </div>
    )}
  </NavLink>
);

const WorkModeToggle = ({ isWorkModeOn, onToggle }) => (
  <div className="flex items-center space-x-3">
    <span className="text-sm font-medium text-gray-700">Work Mode:</span>
    <button
      onClick={onToggle}
      className={`
        relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
        transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${isWorkModeOn ? 'bg-indigo-600' : 'bg-gray-200'}
      `}
    >
      <span className="sr-only">Toggle work mode</span>
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
          transition duration-200 ease-in-out
          ${isWorkModeOn ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
    <PowerOff size={20} className={isWorkModeOn ? 'text-green-500' : 'text-red-500'} />
  </div>
);

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shopkeeper, token } = useSelector((state) => state.shopkeeper);
  const { shop } = useSelector((state) => state.shop);
  const [isWorkModeOn, setIsWorkModeOn] = useState(false);

  useEffect(() => {
    if (shopkeeper?.id && token) {
      dispatch(fetchShopDetails({ ownerId: shopkeeper.id, token }));
    }
  }, [dispatch, shopkeeper, token]);

  useEffect(() => {
    if (shop) {
      setIsWorkModeOn(shop.isWorkModeOn);
    }
  }, [shop]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/shopkeeper/login');
  };

  const handleToggleWorkMode = () => {
    if (shop) {
      dispatch(toggleWorkMode({ shopId: shop._id, token }))
        .then(() => {
          setIsWorkModeOn(!isWorkModeOn);
        })
        .catch((error) => {
          console.error('Failed to toggle work mode:', error);
        });
    }
  };

  const navigationItems = [
    { icon: <Home size={24} />, label: "Overview", to: "/dashboard" },
    { icon: <User size={24} />, label: "Profile", to: "/dashboard/profile" },
    ...(shop 
      ? [
          { icon: <ShoppingBag size={24} />, label: "Shop", to: "/dashboard/shopdetails" },
          { icon: <List size={24} />, label: "Services", to: "/dashboard/manageservices" },
          { icon: <Clock size={24} />, label: "Time Slots", to: "/dashboard/managetime" },
          { icon: <Calendar size={24} />, label: "Bookings", to: "/dashboard/viewbookings" }
        ]
      : [{ icon: <ShoppingBag size={24} />, label: "Add Shop", to: "/dashboard/addshop" }]
    )
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Scissors size={32} className="text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">BaRbberZ</h1>
        </div>
        <div className="flex items-center space-x-4">
          {shop && <WorkModeToggle isWorkModeOn={isWorkModeOn} onToggle={handleToggleWorkMode} />}
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-300"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {navigationItems.map((item, index) => (
          <NavigationCard key={index} {...item} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <Outlet context={{ shopId: shop?._id }} />
      </div>
    </div>
  );
}

export default Dashboard;