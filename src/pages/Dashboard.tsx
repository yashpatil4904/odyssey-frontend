import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHome from './DashboardHome';

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 transition-all duration-300 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
} 