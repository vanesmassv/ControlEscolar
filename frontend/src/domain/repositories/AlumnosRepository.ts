import type { AlumnosDataStructure } from '../../types';


export interface AlumnosRepository {
  getMisAlumnos(): Promise<AlumnosDataStructure>;
}