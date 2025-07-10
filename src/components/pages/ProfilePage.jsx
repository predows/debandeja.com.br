import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChefHat, Utensils, User, Mail, MapPin, Star, Award, Briefcase } from 'lucide-react';
import Header from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProfilePage = ({ userType, currentUser, navigateTo, onLogout }) => {
  const { toast } = useToast();
  const isWaiter = userType === 'waiter';

  const showFeatureToast = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada.",
      duration: 3000,
    });
  };

  const user = currentUser || (isWaiter ? 
    { name: 'Carlos Silva', email: 'carlos.silva@email.com', experience: '3 anos', rating: 4.9, specialties: ['Eventos', 'Fine Dining'] } : 
    { name: 'Restaurante Sabor Intenso', email: 'contato@saborintenso.com', location: 'Centro, São Paulo' }
  );
  
  const Icon = isWaiter ? Utensils : ChefHat;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Meu Perfil - GarçomConnect</title>
        <meta name="description" content="Página de perfil do usuário." />
      </Helmet>

      <Header userType={userType} onLogout={onLogout} navigateTo={navigateTo} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-secondary/50 backdrop-blur-lg rounded-2xl p-8 border border-border shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-glow">
                  <Icon className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-foreground mb-2">{user.name}</h1>
                <div className="flex items-center justify-center md:justify-start text-muted-foreground mb-4">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{user.email}</span>
                </div>
                <Button onClick={showFeatureToast}>Editar Perfil</Button>
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary border-b border-primary pb-2">Detalhes</h2>
                {isWaiter ? (
                  <>
                    <div className="flex items-center gap-4"><Star className="w-6 h-6 text-amber-400" /><span className="text-lg">Avaliação: {user.rating} / 5.0</span></div>
                    <div className="flex items-center gap-4"><Award className="w-6 h-6 text-amber-400" /><span className="text-lg">Experiência: {user.experience}</span></div>
                    <div className="flex items-start gap-4">
                      <Briefcase className="w-6 h-6 text-amber-400 mt-1" />
                      <div>
                        <span className="text-lg">Especialidades:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {user.specialties.map(s => <span key={s} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">{s}</span>)}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4"><MapPin className="w-6 h-6 text-amber-400" /><span className="text-lg">Localização: {user.location}</span></div>
                    <div className="flex items-center gap-4"><Briefcase className="w-6 h-6 text-amber-400" /><span className="text-lg">Vagas Postadas: 5</span></div>
                  </>
                )}
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary border-b border-primary pb-2">Histórico</h2>
                <ul className="space-y-4">
                  <li className="p-4 bg-secondary rounded-lg">Trabalho no 'Jantar Corporativo' - Concluído</li>
                  <li className="p-4 bg-secondary rounded-lg">Candidatura para 'Pizzaria Forno a Lenha' - Aceita</li>
                  <li className="p-4 bg-secondary rounded-lg">Trabalho no 'Café da Manhã' - Concluído</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;