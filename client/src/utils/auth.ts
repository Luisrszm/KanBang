import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: comment the functionality of the next line
    // This method decodes the JWT token stored in localStorage and returns the payload.
    // It uses the jwtDecode function to parse the token and extract user information.
    // The returned payload will include user details such as username, email, and user ID.
    // If the token is invalid or expired, it may throw an error.
    return jwtDecode<JwtPayload>(this.getToken());
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  getToken(): string {
    // TODO: return the token
    const logToken = localStorage.getItem('id_token') || '';
    return logToken;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token',idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();
