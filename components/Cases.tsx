// components/Cases.tsx
import React, { useState } from 'react';
import { User } from '../types/user';

interface Case {
  id: string;
  title: string;
  client: string;
  caseNumber: string;
  type: string;
  status: 'open' | 'active' | 'closed';
  assignedTo: string;
  openedDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface CasesProps {
  user: User;
}

const Cases: React.FC<CasesProps> = ({ user }) => {
  const [cases, setCases] = useState<Case[]>([
    { id: '1', title: 'Johnson vs. Thompson Contract Dispute', client: 'Johnson Enterprises', caseNumber: 'CL-2023-001', type: 'Contract Law', status: 'active', assignedTo: 'Sarah Johnson', openedDate: '2023-05-15', priority: 'high' },
    { id: '2', title: 'Smith Property Acquisition', client: 'Smith & Associates', caseNumber: 'CL-2023-002', type: 'Real Estate', status: 'active', assignedTo: 'Michael Chen', openedDate: '2023-06-02', priority: 'medium' },
    { id: '3', title: 'Davis Foundation Tax Exemption', client: 'Davis Foundation', caseNumber: 'CL-2023-003', type: 'Tax Law', status: 'closed', assignedTo: 'Emily Rodriguez', openedDate: '2023-03-10', priority: 'medium' },
    { id: '4', title: 'Thompson Employment Agreement Review', client: 'Thompson Manufacturing', caseNumber: 'CL-2023-004', type: 'Employment Law', status: 'active', assignedTo: 'David Wilson', openedDate: '2023-07-05', priority: 'low' },
    { id: '5', title: 'Williams Intellectual Property Protection', client: 'Williams Properties', caseNumber: 'CL-2023-005', type: 'Intellectual Property', status: 'open', assignedTo: 'Sarah Johnson', openedDate: '2023-07-18', priority: 'high' },
  ]);

  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'active' | 'closed'>('all');

  const filteredCases = statusFilter === 'all' 
    ? cases 
    : cases.filter(c => c.status === statusFilter);

  const statusCounts = {
    all: cases.length,
    open: cases.filter(c => c.status === 'open').length,
    active: cases.filter(c => c.status === 'active').length,
    closed: cases.filter(c => c.status === 'closed').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Cases</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add New Case
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {(['all', 'open', 'active', 'closed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  statusFilter === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} ({statusCounts[tab]})
              </button>
            ))}
          </nav>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Case Details
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opened
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCases.map((caseItem) => (
              <tr key={caseItem.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{caseItem.title}</div>
                  <div className="text-sm text-gray-500">{caseItem.caseNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {caseItem.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {caseItem.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {caseItem.assignedTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    caseItem.priority === 'high' ? 'bg-red-100 text-red-800' :
                    caseItem.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {caseItem.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {caseItem.openedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                  <button className="text-gray-600 hover:text-gray-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cases;