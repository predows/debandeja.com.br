import React, { useState, useEffect } from 'react';
import LandingPage from '@/components/pages/LandingPage';
import WaiterDashboard from '@/components/pages/WaiterDashboard';
import RestaurantDashboard from '@/components/pages/RestaurantDashboard';
import SignUpPage from '@/components/pages/SignUpPage';
import ProfilePage from '@/components/pages/ProfilePage';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

function App() {
  const { user, loading, signOut } = useAuth();
  const [view, setView] = useState('landing');
  const [userType, setUserType] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        let { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // Profile might not exist yet, this is fine during signup
        } else if (error) {
          console.error('Error fetching profile:', error);
        } else if (profile) {
          setCurrentUserProfile(profile);
          setUserType(profile.user_type);
          setView('dashboard');
        }
      } else {
        setView('landing');
        setUserType(null);
        setCurrentUserProfile(null);
      }
    };

    if (!loading) {
      fetchUserProfile();
    }
  }, [user, loading]);

  const handleSelectUserType = (type) => {
    setUserType(type);
    setView('signup');
  };

  const handleSignUpSuccess = (profile) => {
    setCurrentUserProfile(profile);
    setUserType(profile.user_type);
    setView('dashboard');
  };

  const handleLogout = async () => {
    await signOut();
    setView('landing');
    setUserType(null);
    setCurrentUserProfile(null);
  };

  const navigateTo = (page) => {
    setView(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    );
  }

  const renderContent = () => {
    if (user) {
      switch (view) {
        case 'dashboard':
          if (userType === 'waiter') {
            return <WaiterDashboard onLogout={handleLogout} navigateTo={navigateTo} />;
          }
          return <RestaurantDashboard onLogout={handleLogout} navigateTo={navigateTo} />;
        case 'profile':
          return <ProfilePage userType={userType} currentUser={currentUserProfile} navigateTo={navigateTo} onLogout={handleLogout} />;
        default:
          // Fallback to dashboard if user is logged in but view is something else
          if (userType === 'waiter') {
            return <WaiterDashboard onLogout={handleLogout} navigateTo={navigateTo} />;
          }
          return <RestaurantDashboard onLogout={handleLogout} navigateTo={navigateTo} />;
      }
    } else {
      switch (view) {
        case 'signup':
          return <SignUpPage userType={userType} onSignUpSuccess={handleSignUpSuccess} onBack={() => setView('landing')} />;
        case 'landing':
        default:
          return <LandingPage onSelectUserType={handleSelectUserType} />;
      }
    }
  };

  return (
    <>
      {renderContent()}
    </>
  );
}

export default App;