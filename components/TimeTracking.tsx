// components/TimeTracking.tsx
import React, { useState } from 'react';
import { User } from '../types/user';

interface TimeEntry {
  id: string;
  date: string;
  client: string;
  case: string;
  activity: string;
  duration: number;
  billable: boolean;
  rate: number;
  description?: string;
  status: 'draft' | 'submitted' | 'billed';
}

interface TimeTrackingProps {
  user: User;
}

const TimeTracking: React.FC<TimeTrackingProps> = ({ user }) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    { id: '1', date: '2023-07-20', client: 'Johnson Enterprises', case: 'Johnson vs. Thompson Contract Dispute', activity: 'Case Research', duration: 2.5, billable: true, rate: 250, description: 'Reviewed contract documents and case law', status: 'draft' },
    { id: '2', date: '2023-07-20', client: 'Smith & Associates', case: 'Smith Property Acquisition', activity: 'Client Meeting', duration: 1.0, billable: true, rate: 250, description: 'Initial consultation regarding property acquisition', status: 'submitted' },
    { id: '3', date: '2023-07-19', client: 'Thompson Manufacturing', case: 'Thompson Employment Agreement', activity: 'Document Drafting', duration: 3.5, billable: true, rate: 250, description: 'Drafted employment agreement templates', status: 'billed' },
    { id: '4', date: '2023-07-19', client: 'Internal', case: 'Administrative', activity: 'Training', duration: 2.0, billable: false, rate: 0, description: 'New software training session', status: 'draft' },
    { id: '5', date: '2023-07-18', client: 'Williams Properties', case: 'Williams Intellectual Property', activity: 'Filing Preparation', duration: 4.0, billable: true, rate: 250, description: 'Prepared trademark filing documents', status: 'submitted' },
  ]);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const totalBillable = timeEntries
    .filter(entry => entry.billable)
    .reduce((sum, entry) => sum + (entry.duration * entry.rate), 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDuration = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Time Tracking</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add Manual Entry
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Billable Hours</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatDuration(timeEntries.filter(e => e.billable).reduce((sum, e) => sum + e.duration, 0))}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Billable Amount</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(totalBillable)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Unbilled Time</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(timeEntries
                        .filter(e => e.billable && e.status !== 'billed')
                        .reduce((sum, e) => sum + (e.duration * e.rate), 0))}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Time Entries</h3>
            <div className="flex space-x-3">
              <div className="relative rounded-md shadow-sm">
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>All Statuses</option>
                  <option>Draft</option>
                  <option>Submitted</option>
                  <option>Billed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client/Case
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeEntries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{entry.client}</div>
                  <div className="text-sm text-gray-500">{entry.case}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{entry.activity}</div>
                  {entry.description && (
                    <div className="text-sm text-gray-500 truncate max-w-xs">{entry.description}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDuration(entry.duration)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.billable ? formatCurrency(entry.duration * entry.rate) : 'Non-billable'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    entry.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    entry.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {entry.status}
                  </span>
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

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Timer</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-3xl font-mono font-bold">
              {Math.floor(currentTime / 3600).toString().padStart(2, '0')}:
              {Math.floor((currentTime % 3600) / 60).toString().padStart(2, '0')}:
              {(currentTime % 60).toString().padStart(2, '0')}
            </div>
          </div>
          <div className="flex space-x-3">
            {isTimerRunning ? (
              <button 
                onClick={() => setIsTimerRunning(false)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Stop Timer
              </button>
            ) : (
              <button 
                onClick={() => setIsTimerRunning(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Start Timer
              </button>
            )}
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;