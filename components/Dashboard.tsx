// components/Dashboard.tsx
import React from 'react';
import { User, UserRole } from '../types/user';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  // Dummy data for the dashboard
  const caseStats = [
    { name: 'Total Cases', value: 42, change: '+4%', changeType: 'positive' },
    { name: 'Active Cases', value: 28, change: '+12%', changeType: 'positive' },
    { name: 'Closed Cases', value: 14, change: '-2%', changeType: 'negative' },
    { name: 'Billable Hours', value: '1,240', change: '+8%', changeType: 'positive' },
  ];

  const upcomingEvents = [
    { id: 1, name: 'Client Meeting - Johnson Case', time: '10:00 AM', datetime: '2023-07-20T10:00', type: 'meeting' },
    { id: 2, name: 'Court Hearing - Smith vs. Jones', time: '2:30 PM', datetime: '2023-07-20T14:30', type: 'hearing' },
    { id: 3, name: 'Document Review Deadline', time: '5:00 PM', datetime: '2023-07-20T17:00', type: 'deadline' },
  ];

  const recentActivities = [
    { id: 1, person: 'John Doe', action: 'filed a motion', target: 'Smith Case', date: '1h ago', dateTime: '2023-07-20T09:32' },
    { id: 2, person: 'Jane Smith', action: 'added a document', target: 'Johnson Contract', date: '2h ago', dateTime: '2023-07-20T08:43' },
    { id: 3, person: 'Robert Brown', action: 'completed time entry', target: '5.2 hours', date: '3h ago', dateTime: '2023-07-20T07:31' },
    { id: 4, person: 'Emily Davis', action: 'created a new case', target: 'Davis LLC Formation', date: '1d ago', dateTime: '2023-07-19T14:56' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add New Case
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            View Reports
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {caseStats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  {/* Icon would go here */}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className={`mt-1 text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming events */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200">
              {upcomingEvents.map((event) => (
                <li key={event.id} className="py-4">
                  <div className="flex space-x-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{event.name}</p>
                      <p className="text-sm text-gray-500 truncate">{event.time}</p>
                    </div>
                    <div className="inline-flex items-center text-xs font-medium text-gray-500">
                      View
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                View all events<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="py-4">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        {activity.person.charAt(0)}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.person}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.action} for {activity.target}
                      </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime={activity.dateTime}>{activity.date}</time>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                View all activity<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;