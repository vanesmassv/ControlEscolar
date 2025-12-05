import type { CalificacionesRepository } from '../repositories/CalificacionesRepository';

export class RegistrarCalificacionUseCase {
  private repository: CalificacionesRepository;

  constructor(repository: CalificacionesRepository) {
    this.repository = repository;
  }

  async execute(
    alumnoId: number,
    materiaId: number,
    calificacion: number,
    observaciones?: string
  ): Promise<void> {
    // Validación de negocio
    if (calificacion < 0 || calificacion > 10) {
      throw new Error('La calificación debe estar entre 0 y 10');
    }

    await this.repository.asignarCalificacion(
      alumnoId,
      materiaId,
      calificacion,
      observaciones
    );
  }
}