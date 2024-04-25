/**
 * Ici se trouvent une liste de routes publiques
 * Ces routes ne nécessitent pas de connexion
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * Ici se trouvent une liste(tableau) de routes pour l'authentification
 * Ces routes vont rediriger les utilisateurs vers le home
 * @type {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/register"];

export const apiAuthPrefix = "/api/auth";

/**
 * la route par defaut de redirection quand un utilisateur est déjà connecté.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_URL = "/dashboard";
