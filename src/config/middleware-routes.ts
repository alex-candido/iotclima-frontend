// src/config/middleware-routes.ts
// ESTE ARQUIVO DEVE CONTER UMA ARRAY ESTÁTICA E PRÉ-CALCULADA
// SEM LÓGICA DE GERAÇÃO DINÂMICA OU RECURSIVA AO SER AVALIADO.
// O CÓDIGO ABAIXO É UM ESQUELETO. VOCÊ DEVE POPULÁ-LO.

import { UserGroup } from '@/types/next-auth.d';

// Interface para um objeto de rota que o middleware consumirá.
interface MiddlewareRouteConfig {
  pathRegex: RegExp; // A Regex JÁ CRIADA
  authRequired: boolean;
  roles: UserGroup[]; // Roles permitidos para este path
  isGuest?: boolean; // Verdadeiro se for uma rota apenas para convidados
  isPublic?: boolean; // Verdadeiro se for uma rota pública
}

export const middlewareRoutes: MiddlewareRouteConfig[] = [
  // --- ROTAS PÚBLICAS E DE CONVIDADO (EXEMPLOS INICIAIS) ---
  {
    pathRegex: /^\/$/i, // Regex para a rota HOME '/'
    authRequired: false,
    roles: [],
    isPublic: true,
  },
  {
    pathRegex: /^\/docs\/?$/i, // Regex para a rota '/docs'
    authRequired: false,
    roles: [],
    isPublic: true,
  },
  {
    pathRegex: /^\/auth\/sign-in\/?$/i, // Regex para '/auth/sign-in'
    authRequired: false, // Não exige autenticação para acessar
    roles: [],
    isGuest: true, // É uma rota de convidado
  },
  {
    pathRegex: /^\/auth\/sign-up\/?$/i, // Regex para '/auth/sign-up'
    authRequired: false,
    roles: [],
    isGuest: true,
  },
  {
    pathRegex: /^\/auth\/forgot-password\/?$/i, // Regex para '/auth/forgot-password'
    authRequired: false,
    roles: [],
    isGuest: true,
  },
  {
    pathRegex: /^\/auth\/reset-password\/?$/i, // Regex para '/auth/reset-password'
    authRequired: false,
    roles: [],
    isGuest: true,
  },

  // --- ROTAS DA ÁREA PRINCIPAL DA APLICAÇÃO '/app' (EXEMPLOS) ---
  {
    pathRegex: /^\/app\/?$/i, // Regex para a rota base '/app'
    authRequired: true,
    roles: [UserGroup.CUSTOMER, UserGroup.ADMIN, UserGroup.EMPLOYEE, UserGroup.MANAGER, UserGroup.OPERATOR, UserGroup.OWNER, UserGroup.VIEWER],
    isPublic: false,
    isGuest: false,
  },
  // Adicione outras rotas específicas de /app aqui, se tiver regras diferentes
  // Ex: { pathRegex: /^\/app\/dashboard\/?$/i, authRequired: true, roles: [UserGroup.CUSTOMER, ...], isPublic: false, isGuest: false },

  // --- ROTAS DA ÁREA ADMINISTRATIVA '/admin' (EXEMPLOS) ---
  {
    pathRegex: /^\/admin\/?$/i, // Regex para a rota base '/admin'
    authRequired: true,
    roles: [UserGroup.ADMIN, UserGroup.EMPLOYEE, UserGroup.MANAGER, UserGroup.OPERATOR, UserGroup.OWNER, UserGroup.VIEWER], // SEM CUSTOMER
    isPublic: false,
    isGuest: false,
  },
  {
    pathRegex: /^\/admin\/dashboard\/?$/i, // Regex para '/admin/dashboard'
    authRequired: true,
    roles: [UserGroup.ADMIN, UserGroup.EMPLOYEE, UserGroup.MANAGER, UserGroup.OPERATOR, UserGroup.OWNER, UserGroup.VIEWER], // SEM CUSTOMER
    isPublic: false,
    isGuest: false,
  },
  {
    pathRegex: /^\/admin\/users\/?$/i, // Regex para /admin/users
    authRequired: true,
    roles: [UserGroup.ADMIN, UserGroup.MANAGER], // SEM CUSTOMER
    isPublic: false,
    isGuest: false,
  },
  {
    pathRegex: /^\/admin\/users\/new\/?$/i, // Regex para /admin/users/new
    authRequired: true,
    roles: [UserGroup.ADMIN, UserGroup.MANAGER], // SEM CUSTOMER
    isPublic: false,
    isGuest: false,
  },
  {
    pathRegex: /^\/admin\/users\/[^/]+\/?$/i, // Regex para /admin/users/[id]
    authRequired: true,
    roles: [UserGroup.ADMIN, UserGroup.MANAGER], // SEM CUSTOMER
    isPublic: false,
    isGuest: false,
  },
  {
    pathRegex: /^\/admin\/users\/[^/]+\/edit\/?$/i, // Regex para /admin/users/[id]/edit
    authRequired: true,
    roles: [UserGroup.ADMIN, UserGroup.MANAGER], // SEM CUSTOMER
    isPublic: false,
    isGuest: false,
  },
  // Repita a estrutura para PLACES, STATIONS, SENSORS, RECORDS, EVENTS, LOGS
  // Lembre-se de adaptar os roles para cada um conforme sua necessidade (ver data/routes.ts)
  // E criar regex para LIST, NEW, DETAIL, EDIT (se aplicável)
];
