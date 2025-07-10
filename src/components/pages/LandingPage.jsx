import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, MapPin, Clock, DollarSign, ChefHat, Utensils, User as UserIcon, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

const LandingPage = ({ onSelectUserType }) => {
  const { toast } = useToast();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Login em desenvolvimento!",
      description: "Por enquanto, você pode se cadastrar para acessar o dashboard.",
    });
    setIsLoginOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>GarçomConnect - Conectando Garçons e Restaurantes</title>
        <meta name="description" content="Plataforma que conecta garçons profissionais com restaurantes que precisam de serviços sob demanda." />
      </Helmet>
      
      <header className="absolute top-0 left-0 right-0 p-4 z-10">
        <div className="max-w-7xl mx-auto flex justify-end">
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-primary-foreground border-primary hover:bg-primary/10">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Acessar sua conta</DialogTitle>
                <DialogDescription>
                  Funcionalidade de login em breve. Por favor, cadastre-se para testar.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="email-login" className="block text-sm font-medium text-muted-foreground">Email</label>
                    <input id="email-login" type="email" className="w-full mt-1 p-2 rounded-md bg-input border border-border" disabled/>
                  </div>
                   <div>
                    <label htmlFor="password-login" className="block text-sm font-medium text-muted-foreground">Senha</label>
                    <input id="password-login" type="password" className="w-full mt-1 p-2 rounded-md bg-input border border-border" disabled/>
                  </div>
                  <Button type="submit" className="w-full">Entrar</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-6 shadow-glow"><Utensils className="w-10 h-10 text-white" /></div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 gradient-text">GarçomConnect</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">Conectando garçons profissionais com restaurantes sob demanda</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="bg-secondary/50 backdrop-blur-lg rounded-2xl p-8 border border-border cursor-pointer card-hover" onClick={() => onSelectUserType('waiter')}>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4"><UserIcon className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Sou Garçom</h3>
              <p className="text-muted-foreground mb-4">Encontre oportunidades de trabalho flexíveis em restaurantes próximos</p>
              <Button>Cadastre-se Agora</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="bg-secondary/50 backdrop-blur-lg rounded-2xl p-8 border border-border cursor-pointer card-hover" onClick={() => onSelectUserType('restaurant')}>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4"><ChefHat className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Sou Restaurante</h3>
              <p className="text-muted-foreground mb-4">Encontre garçons qualificados para cobrir suas necessidades</p>
              <Button>Cadastre-se Agora</Button>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="text-foreground"><div className="text-3xl font-bold text-primary">500+</div><div className="text-muted-foreground">Garçons Cadastrados</div></div>
            <div className="text-foreground"><div className="text-3xl font-bold text-primary">200+</div><div className="text-muted-foreground">Restaurantes Parceiros</div></div>
            <div className="text-foreground"><div className="text-3xl font-bold text-primary">1000+</div><div className="text-muted-foreground">Trabalhos Realizados</div></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;