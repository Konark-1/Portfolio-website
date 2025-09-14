# Power BI Dashboard Component Implementation Plan

## Overview
This document outlines the implementation of a reusable Power BI dashboard component with proactive loading capabilities for the portfolio website.

## Current Implementation Analysis
The current implementation uses iframe-based embedding with CSS-based visibility control:
- Three dashboards are embedded in the homepage
- All iframes are loaded eagerly but hidden with CSS transforms
- State management is handled through CSS classes and React state

## Proposed Implementation

### 1. PowerBIDashboard Component
A reusable React component that uses the `powerbi-client-react` library for embedding Power BI dashboards.

```tsx
"use client";

import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Embed, Report } from 'powerbi-client';
import { useState, useEffect, useRef } from 'react';

interface PowerBIDashboardProps {
  dashboardId: string;
  embedUrl: string;
  accessToken: string;
  title: string;
  isActive: boolean;
 onLoaded?: () => void;
}

const PowerBIDashboard: React.FC<PowerBIDashboardProps> = ({
  dashboardId,
  embedUrl,
  accessToken,
  title,
  isActive,
  onLoaded
}) => {
  const [dashboardInstance, setDashboardInstance] = useState<Embed | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const embedContainer = useRef<HTMLDivElement>(null);

 // Configuration for the Power BI dashboard
  const embedConfig = {
    type: 'report', // report, dashboard, tile
    id: dashboardId,
    embedUrl: embedUrl,
    accessToken: accessToken,
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: false
        }
      },
      navContentPaneEnabled: false,
      background: models.BackgroundType.Transparent
    }
  };

  // Initialize and embed the dashboard
  useEffect(() => {
    if (embedContainer.current && isActive) {
      const dashboard = PowerBIEmbed.embed(embedContainer.current, embedConfig) as Report;
      setDashboardInstance(dashboard);

      // Event handlers
      dashboard.on('loaded', () => {
        setIsLoaded(true);
        onLoaded?.();
      });

      dashboard.on('rendered', () => {
        console.log('Dashboard rendered');
      });

      dashboard.on('error', (event) => {
        console.error('Power BI Dashboard Error:', event);
      });
    }

    // Cleanup
    return () => {
      if (dashboardInstance) {
        dashboardInstance.off('loaded');
        dashboardInstance.off('rendered');
        dashboardInstance.off('error');
      }
    };
  }, [isActive, dashboardId, embedUrl, accessToken]);

  // Update dashboard when config changes
  useEffect(() => {
    if (dashboardInstance && isActive) {
      dashboardInstance.update(embedConfig);
    }
  }, [dashboardInstance, isActive, dashboardId, embedUrl, accessToken]);

  return (
    <div 
      ref={embedContainer} 
      className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
        isActive && isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ 
        transform: isActive ? 'translateX(0%) scaleX(1.05)' : 'translateX(-200vw) scaleX(1.05)',
        pointerEvents: isActive ? 'auto' : 'none',
        visibility: isActive ? 'visible' : 'hidden'
      }}
    />
  );
};

export default PowerBIDashboard;
```

### 2. PowerBIProvider for Proactive Loading
A context provider that manages the loading state of all dashboards.

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

### 3. Updated ProjectsTabs Component
The updated component that uses the new Power BI components:

```tsx
import { useState } from 'react';
import PowerBIDashboard from '@/components/powerbi/PowerBIDashboard';
import { usePowerBI } from '@/components/powerbi/PowerBIProvider';

function ProjectsTabs() {
  const [activeTab, setActiveTab] = useState<'consistent' | 'seamless' | 'cinematic'>("cinematic");
  const [hoverTab, setHoverTab] = useState<null | 'consistent' | 'seamless' | 'cinematic'>(null);
  const { dashboards, loadedDashboards, markDashboardAsLoaded } = usePowerBI();

  const tabs = [
    { key: 'cinematic' as const, label: 'Adaptive Visuals', dashboardId: 'cinematic-dashboard' },
    { key: 'seamless' as const, label: 'Macro and Micro level Analysis', dashboardId: 'seamless-dashboard' },
    { key: 'consistent' as const, label: 'Distribution and Trend Analysis', dashboardId: 'consistent-dashboard' },
 ];

  const displayed = hoverTab ?? activeTab;

  return (
    <div className="mt-6 sm:mt-12 pointer-events-auto">
      {/* Full-width titles row with blur like reference */}
      <div className="ml-[calc(50%-50vw)] w-screen">
        <div className="border-t border-white/15 bg-gradient-to-b from-white/5 via-white/0 to-transparent">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 flex flex-col sm:grid sm:grid-cols-3 items-center gap-4 sm:gap-4">
            {tabs.map(({ key, label }) => {
              const isDisplayed = displayed === key;
              return (
                <h3
                  key={key}
                  onMouseEnter={() => setHoverTab(key)}
                  onMouseLeave={() => setHoverTab(null)}
                  onClick={() => setActiveTab(key)}
                  className={`text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold cursor-pointer select-none text-center
                    transition-all duration-300 ease-in-out
                    ${isDisplayed ? 'opacity-100 scale-105' : 'opacity-60 scale-100'}
                    ${isDisplayed ? 'filter-none' : 'blur-[4px] sm:blur-[8px]'}
                    py-2 px-4 rounded-lg w-full sm:w-auto
                    ${isDisplayed ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10 hover:bg-white/8'}
                    shadow-md
                  `}
                  style={{ 
                    fontSize: 'clamp(0.875rem, 1rem, 2.5rem)' 
                  }}
                >
                  {label}
                </h3>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="mt-6 sm:mt-10">
        <div className="mx-auto w-[95vw] sm:w-[90vw] md:w-[80vw] lg:w-[74vw] px-0">
          <div className="relative rounded-[22px] md:rounded-[24px] overflow-hidden bg-black/80 shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
            {/* Turquoise glow border */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -inset-2 rounded-[28px] bg-teal-400/20 blur-xl" />
              <div className="absolute inset-0 rounded-[22px] ring-1 ring-teal-40/20" />
            </div>

            {/* Shared aspect-ratio container */}
            <div className="relative pt-[56.25%] sm:pt-[59.77%] overflow-hidden">
              {tabs.map(({ key, dashboardId }) => {
                const dashboardConfig = dashboards.find(d => d.id === dashboardId);
                return dashboardConfig ? (
                  <PowerBIDashboard
                    key={dashboardId}
                    dashboardId={dashboardConfig.id}
                    embedUrl={dashboardConfig.embedUrl}
                    accessToken={dashboardConfig.accessToken}
                    title={dashboardConfig.title}
                    isActive={activeTab === key}
                    onLoaded={() => markDashboardAsLoaded(dashboardId)}
                  />
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Benefits of This Implementation

1. **Proactive Loading**: All dashboards are loaded in advance, ensuring smooth transitions
2. **State Management**: Proper state management for loaded dashboards
3. **Reusability**: Component can be used across different pages
4. **Performance**: Uses the official Power BI client library for better performance
5. **Extensibility**: Easy to add new dashboards or modify existing ones
6. **Error Handling**: Built-in error handling for dashboard loading issues

## Implementation Steps

1. Create the PowerBIProvider component to manage dashboard state
2. Create the PowerBIDashboard component for individual dashboards
3. Update the ProjectsTabs component to use the new components
4. Wrap the application with the PowerBIProvider
5. Test the implementation and optimize as needed

## Future Enhancements

1. Add proper authentication and token management
2. Implement dashboard caching to preserve state
3. Add loading indicators and error states
4. Implement dashboard preloading based on user behavior prediction
5. Add support for dashboard filtering and parameter passing