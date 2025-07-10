import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, MapPin, Clock, Star, Calendar, DollarSign, Search, User as UserIcon, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/shared/Header';
import { mockWaiters as initialWaiters, mockJobs as initialJobs } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PostJobForm } from '@/components/forms/PostJobForm';

const RestaurantDashboard = ({ onLogout, navigateTo }) => {
  const { toast } = useToast();
  const [waiters, setWaiters] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ search: '', availability: 'all', rating: 'all' });
  const [selectedWaiter, setSelectedWaiter] = useState(null);

  useEffect(() => {
    const storedWaiters = JSON.parse(localStorage.getItem('waiters')) || initialWaiters;
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || initialJobs;
    setWaiters(storedWaiters);
    setJobs(storedJobs);
  }, []);

  const handleJobPosted = (newJob) => {
    const updatedJobs = [...jobs, { ...newJob, id: jobs.length + 1 }];
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    toast({
      title: "🎉 Vaga postada com sucesso!",
      description: "Sua vaga agora está visível para os garçons.",
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredWaiters = waiters.filter(waiter => {
    const searchMatch = waiter.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                        waiter.location.toLowerCase().includes(filters.search.toLowerCase()) ||
                        waiter.specialties.some(s => s.toLowerCase().includes(filters.search.toLowerCase()));
    const availabilityMatch = filters.availability === 'all' || waiter.availability.toLowerCase().replace(' ', '') === filters.availability;
    const ratingMatch = filters.rating === 'all' || waiter.rating >= parseFloat(filters.rating);
    return searchMatch && availabilityMatch && ratingMatch;
  });

  const hireWaiter = () => {
    if (!selectedWaiter) return;
    toast({
      title: `✅ Contratação iniciada para ${selectedWaiter.name}!`,
      description: "Uma notificação foi enviada para o garçom.",
    });
    
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.unshift({ id: Date.now(), message: `Você foi contratado pelo ${selectedWaiter.name}!`, read: false });
    localStorage.setItem('notifications', JSON.stringify(notifications));

    setSelectedWaiter(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Dashboard Restaurante - GarçomConnect</title>
        <meta name="description" content="Dashboard para restaurantes encontrarem garçons profissionais sob demanda." />
      </Helmet>
      
      <Header userType="restaurant" onLogout={onLogout} onJobPosted={handleJobPosted} navigateTo={navigateTo} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Painel do Restaurante</h1>
            <p className="text-muted-foreground">Encontre e gerencie garçons qualificados para suas necessidades</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Briefcase className="w-5 h-5 mr-2" />
                Postar Nova Vaga
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar uma nova vaga</DialogTitle>
              </DialogHeader>
              <PostJobForm onJobPosted={handleJobPosted} />
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-secondary rounded-2xl p-6 text-foreground border border-border"><div className="flex items-center justify-between"><div><p className="text-muted-foreground">Garçons Ativos</p><p className="text-2xl font-bold">8</p></div><Users className="w-8 h-8 text-primary" /></div></div>
          <div className="bg-secondary rounded-2xl p-6 text-foreground border border-border"><div className="flex items-center justify-between"><div><p className="text-muted-foreground">Serviços do Mês</p><p className="text-2xl font-bold">23</p></div><Calendar className="w-8 h-8 text-primary" /></div></div>
          <div className="bg-secondary rounded-2xl p-6 text-foreground border border-border"><div className="flex items-center justify-between"><div><p className="text-muted-foreground">Vagas Abertas</p><p className="text-2xl font-bold">{jobs.length}</p></div><Briefcase className="w-8 h-8 text-primary" /></div></div>
          <div className="bg-secondary rounded-2xl p-6 text-foreground border border-border"><div className="flex items-center justify-between"><div><p className="text-muted-foreground">Avaliação Média</p><p className="text-2xl font-bold">4.8</p></div><Star className="w-8 h-8 text-primary" /></div></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-secondary/50 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-border">
          <h3 className="text-xl font-bold text-foreground mb-4">Encontrar Garçons</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input type="text" placeholder="Buscar por nome, local ou especialidade..." className="w-full pl-10" value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} />
              </div>
            </div>
            <div>
              <Select value={filters.availability} onValueChange={(value) => handleFilterChange('availability', value)}>
                <SelectTrigger><SelectValue placeholder="Disponibilidade" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Qualquer Disponibilidade</SelectItem>
                  <SelectItem value="disponívelhoje">Disponível Hoje</SelectItem>
                  <SelectItem value="disponívelamanhã">Disponível Amanhã</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.rating} onValueChange={(value) => handleFilterChange('rating', value)}>
                <SelectTrigger><SelectValue placeholder="Avaliação Mínima" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Qualquer Avaliação</SelectItem>
                  <SelectItem value="4.5">4.5 estrelas ou mais</SelectItem>
                  <SelectItem value="4">4 estrelas ou mais</SelectItem>
                  <SelectItem value="3">3 estrelas ou mais</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-bold text-foreground mb-6">Garçons Disponíveis ({filteredWaiters.length})</h2>
          <div className="grid gap-6">
            {filteredWaiters.length > 0 ? filteredWaiters.map((waiter, index) => (
              <motion.div key={waiter.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index }} className="bg-secondary/50 backdrop-blur-lg rounded-2xl p-6 border border-border hover:bg-accent transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mr-4"><UserIcon className="w-6 h-6 text-white" /></div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{waiter.name}</h3>
                        <div className="flex items-center"><Star className="w-4 h-4 text-amber-400 mr-1" /><span className="text-amber-400 text-sm font-medium mr-3">{waiter.rating}</span><span className="text-muted-foreground text-sm">{waiter.experience} de experiência</span></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground my-3"><span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{waiter.location}</span><span className="flex items-center text-green-400"><Clock className="w-4 h-4 mr-1" />{waiter.availability}</span></div>
                    <div className="flex flex-wrap gap-2">{waiter.specialties.map((specialty, idx) => (<span key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">{specialty}</span>))}</div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2" onClick={() => setSelectedWaiter(waiter)}>Contratar</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirmar Contratação</DialogTitle>
                          <DialogDescription>Você está prestes a contratar {selectedWaiter?.name} para um serviço. Por favor, confirme os detalhes.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p><strong>Garçom:</strong> {selectedWaiter?.name}</p>
                          <p><strong>Avaliação:</strong> {selectedWaiter?.rating} ★</p>
                          <p><strong>Localização:</strong> {selectedWaiter?.location}</p>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSelectedWaiter(null)}>Cancelar</Button>
                          <Button onClick={hireWaiter}>Confirmar e Contratar</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="border-border text-foreground hover:bg-accent px-6 py-2" onClick={() => toast({ title: "🚧 Visualização de perfil em breve!" })}>Ver Perfil</Button>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-12 bg-secondary/30 rounded-lg">
                <p className="text-muted-foreground text-lg">Nenhum garçom encontrado com os filtros atuais.</p>
                <p className="text-muted-foreground">Tente ajustar sua busca.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;