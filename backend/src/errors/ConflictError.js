// ConflictError.js

/**
 * Clase de error personalizada para manejar conflictos de recursos.
 * Por ejemplo, cuando se intenta crear un registro (como un usuario) 
 * que ya existe en la base de datos (por un campo único como el email).
 */
import AppError from './AppError.js';

export class ConflictError extends AppError {
  constructor(message = 'Conflict', details = null) {
    super(message, 409, 'CONFLICT', details);
  }
}

export default ConflictError;