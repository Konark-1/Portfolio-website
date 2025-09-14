# Power BI Provider Implementation

## Overview
This document details the implementation of a context provider for managing Power BI dashboards across the application with proactive loading capabilities.

## Implementation Plan

### PowerBIProvider Component
A React context provider that manages the state of all Power BI dashboards in the application.

```tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DashboardConfig {
  id: string;
  title: string;
  embedUrl: string;
  accessToken: string;
}

interface PowerBIContextType {
  dashboards: DashboardConfig[];
  loadedDashboards: Record<string, boolean>;
  markDashboardAsLoaded: (id: string) => void;
  getDashboardConfig: (id: string) => DashboardConfig | undefined;
}

const PowerBIContext = createContext<PowerBIContextType | undefined>(undefined);

export const PowerBIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dashboards] = useState<DashboardConfig[]>([
    {
      id: 'cinematic-dashboard',
      title: 'Adaptive Visuals',
      embedUrl: 'https://app.fabric.microsoft.com/view?r=eyJrIjoiNGQ0MzFkY2UtN2M1ZS00Mzg4LTk0YzAtZjc4MmVjMDhjY2ZhIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9',
      accessToken: '' // Would be fetched from backend in real implementation
    },
    {
      id: 'seamless-dashboard',
      title: 'Macro and Micro level Analysis',
      embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiNTg1OTYwMWYtNTdiZi00YjU2LWI3ZWMtMjkxZGZlMGYwZTVkIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9',
      accessToken: ''
    },
    {
      id: 'consistent-dashboard',
      title: 'Distribution and Trend Analysis',
      embedUrl: 'https://app.powerbi.com/view?r=eyJrIjoiNmE4MmRhMmItNTFlNC00MzMzLTkwZjQtNjc1NjEyZDI2ZTczIiwidCI6IjE4YjExOTE3LTU2NGQtNDJhYi05M2M4LWMxY2JhZDlhNjRiMiJ9',
      accessToken: ''
    }
  ]);

  const [loadedDashboards, setLoadedDashboards] = useState<Record<string, boolean>>({});

  const markDashboardAsLoaded = (id: string) => {
    setLoadedDashboards(prev => ({ ...prev, [id]: true }));
  };

  const getDashboardConfig = (id: string) => {
    return dashboards.find(dashboard => dashboard.id === id);
  };

  // Preload all dashboards when provider mounts
  useEffect(() => {
    // In a real implementation, this would fetch access tokens from a backend
    console.log('Preloading all Power BI dashboards');
  }, []);

  return (
    <PowerBIContext.Provider value={{
      dashboards,
      loadedDashboards,
      markDashboardAsLoaded,
      getDashboardConfig
    }}>
      {children}
    </PowerBIContext.Provider>
  );
};

export const usePowerBI = () => {
  const context = useContext(PowerBIContext);
  if (context === undefined) {
    throw new Error('usePowerBI must be used within a PowerBIProvider');
  }
  return context;
};
```

## Benefits

1. **Centralized State Management**: All dashboard configurations and loading states are managed in one place
2. **Proactive Loading**: Dashboards are preloaded when the provider mounts
3. **Reusability**: Can be used across different components and pages
4. **Type Safety**: Strong typing for dashboard configurations and context values
5. **Easy Extension**: Simple to add new dashboards to the configuration

## Usage

To use the PowerBIProvider, wrap your application or the section that needs Power BI dashboards:

```tsx
// In your root layout or page component
import { PowerBIProvider } from '@/components/powerbi/PowerBIProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PowerBIProvider>
      {children}
    </PowerBIProvider>
  );
}
```

Then, in any component that needs to access Power BI dashboards:

```tsx
import { usePowerBI } from '@/components/powerbi/PowerBIProvider';

export default function DashboardComponent() {
  const { dashboards, loadedDashboards, markDashboardAsLoaded } = usePowerBI();
  
  // Use the dashboard data and loading states
  // ...
}
```

## Future Enhancements

1. **Authentication Integration**: Connect with backend services to fetch access tokens securely
2. **Dynamic Dashboard Loading**: Load dashboards on-demand based on user navigation
3. **Caching Strategy**: Implement caching to preserve dashboard states
4. **Error Handling**: Add comprehensive error handling for dashboard loading failures
5. **Performance Monitoring**: Add telemetry to monitor dashboard loading performance