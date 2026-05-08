'use client';

import { createContext, useContext, useMemo } from 'react';
import { useAllPermissions } from '@/hooks/(roles)/useRoleManagement';
import { useSession } from 'next-auth/react';

const PermissionsContext = createContext(null);

export function PermissionsProvider({ children }) {
  const { data, isLoading, error } = useAllPermissions();
  const { data: session } = useSession();
  const user = session?.user;

  const permissionSet = useMemo(() => {
    if (!data) return new Set();
    return new Set(data.map(p => p.codename));
  }, [data]);

  const hasPermission = useMemo(() => {
  return (codename) => {
    if (isLoading) return false;
    if (user?.is_superuser || user?.is_supplier || user?.is_contractor) return true;
    return permissionSet.has(codename);
  };
}, [permissionSet, user, isLoading]);

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
