// components/Calendar.tsx
import React, { useState } from 'react';
import { User } from '../types/user';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'hearing' | 'meeting' | 'deadline' | 'other';
  date: string;
  time: string;
  duration: number;
  participants: string[];
  case?: string;
  location: string;
  description?: string;
}

interface CalendarProps {
  user: User;
}

const Calendar: React.FC<CalendarProps> = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');

  const events: CalendarEvent[] = [
    { id: '1', title: 'Client Meeting - Johnson Case', type: 'meeting', date: '2023-07-20', time: '10:00', duration: 60, participants: ['Sarah Johnson', 'Robert Johnson'], case: 'Johnson vs. Thompson Contract Dispute', location: 'Conference Room A', description: 'Review contract terms and negotiation strategy' },
    { id: '2', title: 'Court Hearing - Smith Property', type: 'hearing', date: '2023-07-20', time: '14:30', duration: 120, participants: ['Michael Chen', 'Court Clerk'], case: 'Smith Property Acquisition', location: 'Courtroom 5B', description: 'Preliminary hearing for property dispute' },
    { id: '3', title: 'Document Review Deadline', type: 'deadline', date: '2023-07-20', time: '17:00', duration: 0, participants: ['David Wilson'], case: 'Thompson Employment Agreement', location: 'Office', description: 'Final review of employment agreements' },
    { id: '4', title: 'Team Strategy Session', type: 'meeting', date: '2023-07-21', time: '09:00', duration: 90, participants: ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez'], location: 'Conference Room B', description: 'Quarterly case review and strategy planning' },
    { id: '5', title: 'Deposition - Williams Case', type: 'hearing', date: '2023-07-21', time: '13:00', duration: 180, participants: ['Emily Rodriguez', 'Court Reporter'], case: 'Williams Intellectual Property', location: 'Deposition Room 3', description: 'Expert witness deposition' },
  ];

  const todayEvents = events.filter(event => event.date === '2023-07-20');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
        <div className="flex space-x-2">
          <div className="relative rounded-md shadow-sm">
            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option>Day View</option>
              <option>Week View</option>
              <option>Month View</option>
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Event
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Today's Schedule - July 20, 2023</h2>
        </div>
        <div className="px-6 py-5">
          {todayEvents.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {todayEvents.map((event) => (
                <li key={event.id} className="py-4">
                  <div className="flex space-x-3">
                    <div className={`flex-shrink-0 w-2 ${ 
                      event.type === 'hearing' ? 'bg-red-500' : 
                      event.type === 'meeting' ? 'bg-blue-500' : 
                      event.type === 'deadline' ? 'bg-yellow-500' : 'bg-gray-500'
                    } rounded-full`}></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {event.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {event.time} • {event.location} • {event.duration} min
                      </p>
                      {event.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {event.description}
                        </p>
                      )}
                      {event.participants && (
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          <span>{event.participants.join(', ')}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button className="text-gray-600 hover:text-gray-900">Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No events scheduled</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Event
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
        </div>
        <div className="px-6 py-5">
          <ul className="divide-y divide-gray-200">
            {events.filter(event => event.date !== '2023-07-20').slice(0, 3).map((event) => (
              <li key={event.id} className="py-4">
                <div className="flex space-x-3">
                  <div className={`flex-shrink-0 w-2 ${ 
                    event.type === 'hearing' ? 'bg-red-500' : 
                    event.type === 'meeting' ? 'bg-blue-500' : 
                    event.type === 'deadline' ? 'bg-yellow-500' : 'bg-gray-500'
                  } rounded-full`}></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {event.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {event.date} • {event.time} • {event.location}
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">View</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Calendar;