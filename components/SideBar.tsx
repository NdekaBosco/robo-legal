// components/Sidebar.tsx
import React from 'react';
import { UserRole } from '../types/user';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, userRole }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.PARALEGAL, UserRole.INTERN] },
    { id: 'clients', label: 'Clients', icon: '👤', roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.PARALEGAL] },
    { id: 'cases', label: 'Cases', icon: '📂', roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.PARALEGAL] },
    { id: 'calendar', label: 'Calendar', icon: '📅', roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.PARALEGAL, UserRole.INTERN] },
    { id: 'time', label: 'Time Tracking', icon: '⏱️', roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.PARALEGAL] },
    { id: 'billing', label: 'Billing', icon: '💰', roles: [UserRole.ADMIN, UserRole.LAWYER] },
    { id: 'documents', label: 'Documents', icon: '📄', roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.PARALEGAL] },
    { id: 'reports', label: 'Reports', icon: '📊', roles: [UserRole.ADMIN] },
    { id: 'settings', label: 'Settings', icon: '⚙️', roles: [UserRole.ADMIN] },
  ];

  const filteredItems = navigationItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-indigo-900 border-r">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-2xl font-bold text-white">RoboLegal</h1>
        </div>
        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-4 pb-4 space-y-2">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-colors ${
                  currentView === item.id
                    ? 'text-indigo-900 bg-white'
                    : 'text-white hover:bg-indigo-800'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;