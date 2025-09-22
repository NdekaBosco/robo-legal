// pages/index.tsx (updated)
"use client";
import { useState } from 'react';
import Head from 'next/head';
import TopNav from '../components/TopNav';
import Dashboard from '../components/Dashboard';
import Clients from '../components/Clients';
import Cases from '../components/Cases';

import TimeTracking from '../components/TimeTracking';
import Billing from '../components/Billing';
import Documents from '../components/Documents';
import Reports from '../components/Reports';
import Settings from '../components/Settings';
import { User, UserRole } from '../types/user';
import Calendar from '@/components/Calender';
import Sidebar from '@/components/SideBar';
import MobileSidebar from '@/components/MobileSidebar';

const mockUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@robolegal.com',
  role: UserRole.ADMIN,
  avatar: '/avatars/sarah.jpg'
};

export default function Home() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<User>(mockUser);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'clients':
        return <Clients user={user} />;
      case 'cases':
        return <Cases user={user} />;
      case 'calendar':
        return <Calendar user={user} />;
      case 'time':
        return <TimeTracking user={user} />;
      case 'billing':
        return <Billing user={user} />;
      case 'documents':
        return <Documents user={user} />;
      case 'reports':
        return <Reports user={user} />;
      case 'settings':
        return <Settings user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Head>
        <title>RoboLegal - Law Firm Management System</title>
        <meta name="description" content="Law firm management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MobileSidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        userRole={user.role} 
        isOpen={mobileSidebarOpen}
        setIsOpen={setMobileSidebarOpen}
      />
      
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} userRole={user.role} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav user={user} onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}