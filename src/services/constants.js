export const URL = {
  ADMIN: '/administrators',
  AUTH: '/login',
  SCHOOL_PROGRAM: '/schoolPrograms',
  SUBJECT: '/subjects',
  STUDENT: '/students',
  TEACHER: '/teachers',
  SCHOOL_PERIOD: '/schoolPeriods',
  INSCRIPTION: '/inscriptions',
  STUDENT_INSCRIPTION: '/studentInscription',
  TEACHER_INSCRIPTION: '/teacherInscription',
  CONSTANCE: '/constance',
  CHANGE_PASSWORD: '/changePassword',
};

export const COORDINATOR_ROL = {
  SECRETARIO: 'SECRETARY',
  COORDINADOR: 'COORDINATOR',
};

export const GENDER = {
  MASCULINO: 'M',
  FEMENINO: 'F',
};

export const LEVEL_INSTRUCTION = {
  TSU: 'TSU',
  'TEC MEDIO': 'TCM',
  DOCTOR: 'Dr',
  ESPECIALISTA: 'Esp',
  INGENIERO: 'Ing',
  'MAGISTER SCIENTIARUM': 'MSc',
  LICENCIADO: 'Lic',
};

export const TEACHER_ROL = {
  INSTRUCTOR: 'INS',
  INVITADO: 'INV',
  ASISTENTE: 'ASI',
  AGREGADO: 'AGR',
  TITULAR: 'TIT',
};

export const TEACHER_DEDICATION = {
  'MEDIO-TIEMPO': 'MT',
  CONVENCIONAL: 'CON',
  'TIEMPO-COMPLETO': 'TC',
  EXCLUSIVO: 'EXC',
};

export const NATIONALITY = { VENEZOLANO: 'V', EXTRANJERO: 'E' };

export const SUBJECT_TYPE = { REGULAR: 'REG', AMPLIACION: 'AMP' };

export const WEEK_DAYS = {
  LUNES: 1,
  MARTES: 2,
  MIERCOLES: 3,
  JUEVES: 4,
  VIERNES: 5,
  SABADO: 6,
  DOMINGO: 7,
};

export const SUBJECT_MODALITY = {
  OBLIGATORIA: 'OB',
  OPTATIVA: 'OP',
  ELECTIVA: 'EL',
};

export const SUBJECT_STATE = {
  CURSANDO: 'CUR',
  RETIRADO: 'RET',
  APROBADO: 'APR',
  REPROBADO: 'REP',
};

export const SUBJECT_PERIOD_MODALITY = {
  REGULAR: 'REG',
  INTENSIVO: 'INT',
  SUFICIENCIA: 'SUF',
};

export const FINANCING_TYPE = {
  EXONERADO: 'EXO',
  FUNDACION: 'FUN',
  'FINANCIAMIENTO PROPIO': 'SFI',
  'BECA ESCOLAR': 'ScS',
};

export const STUDENT_TYPE = {
  REGULAR: 'REG',
  EXTENSION: 'EXT',
  AMPLIACION: 'AMP',
  PERFECCIONAMIENTO: 'PER',
  'POST-DOCTORAL': 'PDO',
  ACTUALIZACION: 'ACT',
};

export const STUDENT_STATUS = {
  REGULAR: 'REG',
  'RETIRO TIPO A': 'RET-A',
  'RETIRO TIPO B': 'RET-B',
  'DESINCORPORADO TIPO A': 'DES-A',
  'DESINCORPORADO TIPO B': 'DES-B',
  'REINGRESO TIPO A': 'RIN-A',
  'REINGRESO TIPO B': 'RIN-B',
  'REINCORPORADO TIPO A': 'REI-A',
  'REINCORPORADO TIPO B': 'REI-B',
  GRADUADO: 'ENDED',
};
