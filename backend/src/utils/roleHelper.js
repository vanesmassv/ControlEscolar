export const ROLES = {
  ADMIN: 'ADMIN',
  CONTROL_ESCOLAR: 'CONTROL_ESCOLAR',
  MAESTRO: 'MAESTRO'
};

export const esAdmin = (rol) => {
  return ['ADMIN', 'CONTROL_ESCOLAR'].includes(rol);
};

export const esMaestro = (rol) => {
  return rol === 'MAESTRO';
};