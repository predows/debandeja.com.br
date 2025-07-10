import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChefHat, Utensils, ArrowLeft } from 'lucide-react';
import { WaiterSignUpForm } from '@/components/forms/WaiterSignUpForm';
import { RestaurantSignUpForm } from '@/components/forms/RestaurantSignUpForm';
import { Button } from '@/components/ui/button';

const SignUpPage = ({ userType, onSignUp, onBack }) => {
  const isWaiter = userType === 'waiter';
  const title = isWaiter ? 'Cadastro de Garçom' : 'Cadastro de Restaurante';
  const description = isWaiter ? 'Crie seu perfil para encontrar as melhores oportunidades.' : 'Cadastre seu estabelecimento para encontrar os melhores profissionais.';
  const Icon = isWaiter ? Utensils : ChefHat;

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative">
      <Helmet>
        <title>{title} - GarçomConnect</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <Button variant="ghost" onClick={onBack} className="absolute top-6 left-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-secondary/50 backdrop-blur-lg rounded-2xl p-8 border border-border"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-4 shadow-glow">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>

        {isWaiter ? (
          <WaiterSignUpForm onSignUp={onSignUp} />
        ) : (
          <RestaurantSignUpForm onSignUp={onSignUp} />
        )}
      </motion.div>
    </div>
  );
};

export default SignUpPage;