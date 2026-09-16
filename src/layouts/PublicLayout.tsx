import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { VillageChatbot } from '../components/ai/VillageChatbot';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <VillageChatbot />
    </div>
  );
};
