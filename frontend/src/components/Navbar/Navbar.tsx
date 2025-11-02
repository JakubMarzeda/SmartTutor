import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { supabase } from '../../lib/supabase/client';
import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.user_metadata.full_name || '');
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>SmartTutor</h1>
        </div>
        <div className="navbar-menu">
          <div className="navbar-user">
            <span className="user-email">{userEmail}</span>
            <button onClick={handleSignOut} className="sign-out-btn">
              Wyloguj
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

