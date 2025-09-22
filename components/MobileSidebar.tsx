// components/MobileSidebar.tsx
import React from 'react';
import { UserRole } from '../types/user';

interface MobileSidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  userRole: UserRole;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ 
  currentView, 
  setCurrentView, 
  userRole, 
  isOpen, 
  setIsOpen 
}) => {
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
    <>
      {isOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0">
            <div 
              className="absolute inset-0 bg-gray-600 opacity-75"
              onClick={() => setIsOpen(false)}
            ></div>
          </div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-900">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-2xl font-bold text-white">RoboLegal</h1>
              </div>
              <nav className="mt-8 px-4 space-y-2">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsOpen(false);
                    }}
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
          <div className="flex-shrink-0 w-14"></div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;