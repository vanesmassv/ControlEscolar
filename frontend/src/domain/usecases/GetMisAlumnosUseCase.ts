// src/domain/usecases/GetMisAlumnosUseCase.ts
import type { AlumnosRepository } from '../repositories/AlumnosRepository';
import type { AlumnosDataStructure } from '../../types';

export class GetMisAlumnosUseCase {
  private alumnosRepository: AlumnosRepository;

  constructor(alumnosRepository: AlumnosRepository) {
    this.alumnosRepository = alumnosRepository;
  }

  async execute(): Promise<AlumnosDataStructure> {
    return await this.alumnosRepository.getMisAlumnos();
  }
}