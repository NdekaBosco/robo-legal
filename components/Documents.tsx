// components/Documents.tsx
import React, { useState } from 'react';
import { User } from '../types/user';

interface Document {
  id: string;
  name: string;
  type: string;
  client: string;
  case: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  category: string;
}

interface DocumentsProps {
  user: User;
}

const Documents: React.FC<DocumentsProps> = ({ user }) => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Contract Agreement - Johnson.pdf', type: 'PDF', client: 'Johnson Enterprises', case: 'Johnson vs. Thompson Contract Dispute', uploadedBy: 'Sarah Johnson', uploadDate: '2023-07-15', size: '2.4 MB', category: 'Contracts' },
    { id: '2', name: 'Property Deed - Smith.docx', type: 'DOCX', client: 'Smith & Associates', case: 'Smith Property Acquisition', uploadedBy: 'Michael Chen', uploadDate: '2023-07-14', size: '1.8 MB', category: 'Deeds' },
    { id: '3', name: 'Tax Exemption Application.pdf', type: 'PDF', client: 'Davis Foundation', case: 'Davis Foundation Tax Exemption', uploadedBy: 'Emily Rodriguez', uploadDate: '2023-07-10', size: '3.2 MB', category: 'Tax Documents' },
    { id: '4', name: 'Employment Agreement Template.docx', type: 'DOCX', client: 'Thompson Manufacturing', case: 'Thompson Employment Agreement', uploadedBy: 'David Wilson', uploadDate: '2023-07-08', size: '1.5 MB', category: 'Templates' },
    { id: '5', name: 'Trademark Filing - Williams.pdf', type: 'PDF', client: 'Williams Properties', case: 'Williams Intellectual Property', uploadedBy: 'Sarah Johnson', uploadDate: '2023-07-05', size: '4.1 MB', category: 'Intellectual Property' },
    { id: '6', name: 'Court Motion - Johnson Case.docx', type: 'DOCX', client: 'Johnson Enterprises', case: 'Johnson vs. Thompson Contract Dispute', uploadedBy: 'Sarah Johnson', uploadDate: '2023-07-03', size: '2.7 MB', category: 'Court Documents' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Contracts', 'Deeds', 'Tax Documents', 'Templates', 'Intellectual Property', 'Court Documents'];

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return '📄';
      case 'DOCX': return '📝';
      case 'XLSX': return '📊';
      case 'PPTX': return '📊';
      default: return '📁';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            New Folder
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Upload File
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
            <div className="flex space-x-4">
              <div className="relative rounded-md shadow-sm">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client/Case
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded By
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDocuments.map((document) => (
              <tr key={document.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-xl mr-3">{getFileIcon(document.type)}</div>
                    <div className="text-sm font-medium text-gray-900">{document.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{document.client}</div>
                  <div className="text-sm text-gray-500">{document.case}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {document.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {document.uploadedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {document.uploadDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {document.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                  <button className="text-gray-600 hover:text-gray-900">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Document Templates</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['Contract Agreement', 'Non-Disclosure Agreement', 'Employment Contract', 'Lease Agreement', 'Purchase Agreement', 'Will and Testament'].map((template) => (
            <div key={template} className="border rounded-md p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-xl mr-3">📄</div>
                <div className="text-sm font-medium text-gray-900">{template}</div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;