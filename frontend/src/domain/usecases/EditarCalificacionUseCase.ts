import type { CalificacionesRepository } from '../repositories/CalificacionesRepository';

export class EditarCalificacionUseCase {
  private repository: CalificacionesRepository;

  constructor(repository: CalificacionesRepository) {
    this.repository = repository;
  }

  async execute(
    calificacionId: number,
    calificacion: number,
    observaciones?: string
  ): Promise<void> {
    // Validación de negocio (Igual que el registro)
    if (calificacion < 0 || calificacion > 10) {
      throw new Error('La calificación debe estar entre 0 y 10');
    }

    await this.repository.actualizarCalificacion(
      calificacionId,
      calificacion,
      observaciones
    );
  }
}