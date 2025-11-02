import { useState } from "react";
import { authService } from "../../services/authService";
import "./Register.css";

export default function Register() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await authService.signUp(
        fullName,
        email,
        password
      );
      if (error) {
        setError(error.message || "Błąd tworzenia konta");
      } else {
        setFullName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError("Coś poszło nie tak");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const { error } = await authService.authenticateWithGoogle();
      if (error) {
        setError(error.message || "Błąd logowania przez Google");
      }
    } catch (err) {
      setError("Coś poszło nie tak");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">Utwórz konto</h1>
          <p className="register-subtitle">Dołącz do nas i rozpocznij swoją naukę</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="fullName">Imię i nazwisko</label>
            <input
              id="fullName"
              type="text"
              placeholder="Wprowadź swoje imię i nazwisko"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Wprowadź swój email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Hasło</label>
            <input
              id="password"
              type="password"
              placeholder="Utwórz hasło (minimum 6 znaków)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading || googleLoading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Tworzenie konta...</span>
              </>
            ) : (
              "Utwórz konto"
            )}
          </button>

          <div className="divider">
            <span>LUB</span>
          </div>

          <button 
            type="button"
            className="google-button"
            onClick={handleGoogleSignUp}
            disabled={loading || googleLoading}
          >
            {googleLoading ? (
              <>
                <span className="spinner"></span>
                <span>Łączenie...</span>
              </>
            ) : (
              <>
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Zaloguj przez Google</span>
              </>
            )}
          </button>

          <div className="register-footer">
            <p>
              Masz już konto?{" "}
              <a href="/login" className="login-link">Zaloguj się</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
