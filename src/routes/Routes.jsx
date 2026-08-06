
import { AuditorTab } from '../components/auditors/AuditorTab';
import { LoginForm } from '../components/auth/LoginForm';
import DocumentList from '../components/DocumentList';
import { DashboardLayout } from '../layout/DashboardLayout';

import AddAuditor from '../pages/AddAuditors';
import AddCustomer from '../pages/AddCustomert';
import AuditorDashboard from '../pages/auditorLogin/AuditorDashboard';
import AuditorDocuments from '../pages/auditorLogin/AuditorDocuments';
import DocumentPreview from '../pages/auditorLogin/DocumentPreview';
import DocumentView from '../pages/auditorLogin/DocumentView';
import DocumentViewDays from '../pages/auditorLogin/DocumentViewDays';
import DocumentViewMonth from '../pages/auditorLogin/DocumentViewMonth';
import Customer from '../pages/Customer';
import Home from '../pages/Home';
import Reports from '../pages/Reports';




export const publicRoutes = [
  {
    path: '/login',
    element: <LoginForm />,
  },
];

export const protectedRoutes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        // element: <AuditorDashboard />,
        element:<Home/>
      },
      {
        path:"maindhashboard",
        element:<Home/>
      },
      {
        path: 'auditors',
        element: <AuditorTab />,
      },
      {
        path: 'customer',
        element: <Customer />,
      },
      {
        path: 'documents',
        element: <AuditorDocuments />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'add-auditor/:auditorId?',
        element: <AddAuditor />,
      },
      {
        path: 'add-customer/:customerId?',
        element: <AddCustomer />,
      },
      {
        path: '/document-view',
        element: <DocumentView />,
      },
      {
        path: '/document-view-month',
        element: <DocumentViewMonth/>,
      },
      {
        path: '/document-view-days',
        element: <DocumentViewDays />,
      },
      {
        path: '/document-view-list',
        element: <DocumentList />,
      },
      {
        path: '/document-preview',
        element: <DocumentPreview />,
      }

      
    ],
  },
];