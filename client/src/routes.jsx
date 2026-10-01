import { LayoutDashboard, FileText, CalendarDays, Zap, Users, BarChart3, Repeat, History } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ResumeManagement from './pages/ResumeManagement';
import InterviewManagement from './pages/InterviewManagement';
import ActionCenter from './pages/ActionCenter';
import HRWorkspace from './pages/HRWorkspace';
import ManagerOverview from './pages/ManagerOverview';
import HRHandover from './pages/HRHandover';
import ActivityLog from './pages/ActivityLog';

// Single source of truth for sidebar + router
export const ROUTES = [
  { path: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, element: <Dashboard /> },
  { path: 'resumes', label: 'Resumes', icon: FileText, element: <ResumeManagement /> },
  { path: 'interviews', label: 'Interviews', icon: CalendarDays, element: <InterviewManagement /> },
  { path: 'actions', label: 'Action Center', icon: Zap, element: <ActionCenter /> },
  { path: 'workspace', label: 'HR Workspace', icon: Users, element: <HRWorkspace /> },
  { path: 'manager', label: 'Manager Overview', icon: BarChart3, element: <ManagerOverview /> },
  { path: 'handover', label: 'HR Handover', icon: Repeat, element: <HRHandover /> },
  { path: 'log', label: 'Activity Log', icon: History, element: <ActivityLog /> },
];
