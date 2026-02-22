'use client';

import { createContext, useContext, useMemo } from 'react';
import { useAllPermissions } from '@/hooks/(roles)/useRoleManagement';

const PermissionsContext = createContext(null);

export function PermissionsProvider({ children }) {
  const { data, isLoading, error } = useAllPermissions();

  const permissionSet = useMemo(() => {
    if (!data) return new Set();
    return new Set(data.map(p => p.codename));
  }, [data]);

  const hasPermission = (codename) => {
    return permissionSet.has(codename);
  };

  const value = {
    permissions:permissionSet,
    hasPermission,
    isLoading,
    error,
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const ctx = useContext(PermissionsContext);
  if (!ctx) {
    throw new Error('usePermissions must be used inside PermissionsProvider');
  }
  return ctx;
}
