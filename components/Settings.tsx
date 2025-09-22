// components/Settings.tsx
import React, { useState } from 'react';
import { User, UserRole } from '../types/user';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [users, setUsers] = useState<SystemUser[]>([
    { id: '1', name: 'Sarah Johnson', email: 'sarah@robolegal.com', role: UserRole.ADMIN, status: 'active', lastLogin: '2023-07-20 09:45' },
    { id: '2', name: 'Michael Chen', email: 'michael@robolegal.com', role: UserRole.LAWYER, status: 'active', lastLogin: '2023-07-20 08:30' },
    { id: '3', name: 'Emily Rodriguez', email: 'emily@robolegal.com', role: UserRole.LAWYER, status: 'active', lastLogin: '2023-07-19 14:20' },
    { id: '4', name: 'David Wilson', email: 'david@robolegal.com', role: UserRole.PARALEGAL, status: 'active', lastLogin: '2023-07-20 10:15' },
    { id: '5', name: 'Jennifer Lee', email: 'jennifer@robolegal.com', role: UserRole.PARALEGAL, status: 'inactive', lastLogin: '2023-06-15 16:40' },
    { id: '6', name: 'Robert Kim', email: 'robert@robolegal.com', role: UserRole.INTERN, status: 'active', lastLogin: '2023-07-19 11:05' },
  ]);

  const [activeTab, setActiveTab] = useState<'users' | 'firm' | 'billing' | 'notifications'>('users');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'users'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('firm')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'firm'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Firm Information
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'billing'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Billing Settings
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'notifications'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notifications
            </button>
          </nav>
        </div>

        <div className="px-6 py-5">
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">User Management</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add User
                </button>
              </div>
              
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((systemUser) => (
                    <tr key={systemUser.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-800 font-medium">{systemUser.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{systemUser.name}</div>
                            <div className="text-sm text-gray-500">{systemUser.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {systemUser.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${systemUser.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {systemUser.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {systemUser.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button className="text-gray-600 hover:text-gray-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'firm' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Firm Information</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firm-name" className="block text-sm font-medium text-gray-700">
                    Firm Name
                  </label>
                  <input
                    type="text"
                    name="firm-name"
                    id="firm-name"
                    defaultValue="RoboLegal Law Firm"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="firm-address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="firm-address"
                    id="firm-address"
                    defaultValue="123 Legal Avenue, Nairobi, Kenya"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="firm-phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="firm-phone"
                    id="firm-phone"
                    defaultValue="+254 700 123 456"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="firm-email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="firm-email"
                    id="firm-email"
                    defaultValue="info@robolegal.com"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="firm-website" className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="text"
                    name="firm-website"
                    id="firm-website"
                    defaultValue="www.robolegal.com"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Billing Settings</h2>
              
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-2">Default Billing Rates</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rate-lawyer" className="block text-sm font-medium text-gray-700">
                      Lawyer Hourly Rate
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        name="rate-lawyer"
                        id="rate-lawyer"
                        defaultValue="250"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">/ hour</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rate-paralegal" className="block text-sm font-medium text-gray-700">
                      Paralegal Hourly Rate
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        name="rate-paralegal"
                        id="rate-paralegal"
                        defaultValue="120"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">/ hour</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-900 mb-2">Payment Methods</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-800 font-medium">M</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">M-Pesa</div>
                        <div className="text-sm text-gray-500">Mobile money payments</div>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Default
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="case-updates"
                      name="case-updates"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="case-updates" className="font-medium text-gray-700">Case Updates</label>
                    <p className="text-gray-500">Get notified when there are updates to your cases</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="calendar-reminders"
                      name="calendar-reminders"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="calendar-reminders" className="font-medium text-gray-700">Calendar Reminders</label>
                    <p className="text-gray-500">Receive reminders for upcoming events and deadlines</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="billing-notifications"
                      name="billing-notifications"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="billing-notifications" className="font-medium text-gray-700">Billing Notifications</label>
                    <p className="text-gray-500">Get notified about invoice payments and overdue accounts</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="new-messages"
                      name="new-messages"
                      type="checkbox"
                      defaultChecked
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="new-messages" className="font-medium text-gray-700">New Messages</label>
                    <p className="text-gray-500">Receive notifications when you get new messages from clients or team members</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;