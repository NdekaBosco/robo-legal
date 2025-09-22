// components/Billing.tsx
import React, { useState } from 'react';
import { User } from '../types/user';

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  items: InvoiceItem[];
}

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface BillingProps {
  user: User;
}

const Billing: React.FC<BillingProps> = ({ user }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2023-001',
      client: 'Johnson Enterprises',
      date: '2023-07-01',
      dueDate: '2023-07-15',
      amount: 5250,
      status: 'paid',
      items: [
        { description: 'Legal consultation - Contract review', quantity: 3, rate: 250, amount: 750 },
        { description: 'Document drafting and preparation', quantity: 18, rate: 250, amount: 4500 },
      ]
    },
    {
      id: '2',
      invoiceNumber: 'INV-2023-002',
      client: 'Smith & Associates',
      date: '2023-07-05',
      dueDate: '2023-07-20',
      amount: 3750,
      status: 'sent',
      items: [
        { description: 'Property acquisition legal services', quantity: 15, rate: 250, amount: 3750 },
      ]
    },
    {
      id: '3',
      invoiceNumber: 'INV-2023-003',
      client: 'Thompson Manufacturing',
      date: '2023-07-10',
      dueDate: '2023-07-25',
      amount: 1250,
      status: 'overdue',
      items: [
        { description: 'Employment agreement review', quantity: 5, rate: 250, amount: 1250 },
      ]
    },
    {
      id: '4',
      invoiceNumber: 'INV-2023-004',
      client: 'Williams Properties',
      date: '2023-07-15',
      dueDate: '2023-07-30',
      amount: 3000,
      status: 'draft',
      items: [
        { description: 'Trademark filing preparation', quantity: 12, rate: 250, amount: 3000 },
      ]
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalOutstanding = invoices
    .filter(invoice => invoice.status !== 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const totalPaid = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Billing & Invoices</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Invoices</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{invoices.length}</div>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Paid</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{formatCurrency(totalPaid)}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Outstanding</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">{formatCurrency(totalOutstanding)}</div>
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
            <h3 className="text-lg leading-6 font-medium text-gray-900">Invoices</h3>
            <div className="flex space-x-3">
              <div className="relative rounded-md shadow-sm">
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>All Statuses</option>
                  <option>Draft</option>
                  <option>Sent</option>
                  <option>Paid</option>
                  <option>Overdue</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice #
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
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
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(invoice.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
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

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="border rounded-md p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-800 font-medium">M</span>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">M-Pesa</div>
                <div className="text-sm text-gray-500">Mobile money payments</div>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm text-indigo-600 hover:text-indigo-900">Set as default</button>
            </div>
          </div>
          <div className="border rounded-md p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-medium">B</span>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">Bank Transfer</div>
                <div className="text-sm text-gray-500">Direct bank transfers</div>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm text-indigo-600 hover:text-indigo-900">Set as default</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;