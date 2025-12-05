import type { AdminCalificacionesRepository } from '../repositories/AdminCalificacionesRepository';

export class EliminarCalificacionUseCase {
  private repository: AdminCalificacionesRepository;

  constructor(repository: AdminCalificacionesRepository) {
    this.repository = repository; 
  }

  async execute(calificacionId: number): Promise<void> {
    if (!calificacionId || isNaN(calificacionId)) {
        throw new Error('El ID de la calificación es requerido y debe ser un número.');
    }

    await this.repository.eliminarCalificacion(calificacionId); 
  }
}