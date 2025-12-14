export const parseCodename = (codename) => {
  const parts = codename?.split('_');
  if (parts.length >= 3 && parts[0] === 'can') {
    const action = parts[1];
    const entity = parts.slice(2).join('_');
    return { action, entity };
  }
  return { action: codename, entity: '' };
};

export const groupPermissions = (permissions) => {
  return permissions?.reduce((acc, permission) => {
    const { action,entity } = parseCodename(permission.codename);
    if (!acc[entity]) {
      acc[entity] = {};
    }
    acc[entity][action] = permission;
    return acc;
  }, {});
};