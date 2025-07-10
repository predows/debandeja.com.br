import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, MapPin, Clock, Star, Calendar, DollarSign, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/shared/Header';
import { mockJobs as initialJobs } from '@/data/mockData';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WaiterDashboard = ({ onLogout, navigateTo }) => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ search: '', location: 'all', minRate: '0' });

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || initialJobs;
    setJobs(storedJobs);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredJobs = jobs.filter(job => {
    const searchMatch = job.restaurant.toLowerCase().includes(filters.search.toLowerCase()) ||
                        job.description.toLowerCase().includes(filters.search.toLowerCase());
    const locationMatch = filters.location === 'all' || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const rateMatch = parseFloat(job.hourlyRate.replace('R$ ', '').replace('/hora', '')) >= parseFloat(filters.minRate);
    return searchMatch && locationMatch && rateMatch;
  });

  const applyForJob = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    toast({
      title: `✅ Candidatura enviada para ${job.restaurant}!`,
      description: "O restaurante foi notificado. Boa sorte!",
    });
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.unshift({ id: Date.now(), message: `Candidatura para ${job.restaurant} enviada.`, read: false });
    localStorage.setItem('notifications', JSON.stringify(notifications));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Dashboard Garçom - GarçomConnect</title>
        <meta name="description" content="Dashboard para garçons encontrarem oportunidades de trabalho em restaurantes." />
      </Helmet>
      
      <Header userType="waiter" onLogout={onLogout} navigateTo={navigateTo} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Bem-vindo, Garçom!</h1>
          <p className="text-muted-foreground">Encontre as melhores oportunidades de trabalho próximas a você</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-secondary/50 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-muted-foreground mb-2">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input id="search" type="text" placeholder="Restaurante ou palavra-chave..." className="w-full pl-10" value={filters.search} onChange={(e) => handleFilterChange('search', e.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-muted-foreground mb-2">Localização</label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                <SelectTrigger id="location"><SelectValue placeholder="Localização" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Localizações</SelectItem>
                  <SelectItem value="centro">Centro</SelectItem>
                  <SelectItem value="vila madalena">Vila Madalena</SelectItem>
                  <SelectItem value="jardins">Jardins</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="minRate" className="block text-sm font-medium text-muted-foreground mb-2">Valor Mínimo</label>
              <Select value={filters.minRate} onValueChange={(value) => handleFilterChange('minRate', value)}>
                <SelectTrigger id="minRate"><SelectValue placeholder="Valor/hora" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Qualquer Valor</SelectItem>
                  <SelectItem value="20">A partir de R$20/hora</SelectItem>
                  <SelectItem value="25">A partir de R$25/hora</SelectItem>
                  <SelectItem value="30">A partir de R$30/hora</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-secondary rounded-2xl p-6 text-foreground border border-border"><div className="flex items-center justify-between"><div><p className="text-muted-foreground">Trabalhos Hoje</p><p className="text-2xl font-bold">12</p></div><Calendar className="w-8 h-8 text-primary" /></div></div>
          <div className="bg-secondary rounded-2xl p-6 text-foreground border border-border"><div className="flex items-center justify-between"><div><p className="text-muted-foreground">Ganhos do Mês</p><p className="text-2xl font-bold">R$ 2.450</p></div><DollarSign className="w-8 h-8 text-primary" /></div></div>
          <div className="bg-secondary rounded-2xl p-6 text-foreground border border-border"><div className="flex items-center justify-between"><div><p className="text-muted-foreground">Avaliação</p><p className="text-2xl font-bold">4.9</p></div><Star className="w-8 h-8 text-primary" /></div></div>
          <div className="bg-secondary rounded-2xl p-6 text-foreground border border-border"><div className="flex items-center justify-between"><div><p className="text-muted-foreground">Trabalhos Feitos</p><p className="text-2xl font-bold">47</p></div><Users className="w-8 h-8 text-primary" /></div></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-bold text-foreground mb-6">Oportunidades Disponíveis ({filteredJobs.length})</h2>
          <div className="grid gap-6">
            {filteredJobs.length > 0 ? filteredJobs.map((job, index) => (
              <motion.div key={job.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index }} className="bg-secondary/50 backdrop-blur-lg rounded-2xl p-6 border border-border hover:bg-accent transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2"><h3 className="text-xl font-bold text-foreground mr-3">{job.restaurant}</h3><div className="flex items-center bg-amber-500/20 px-2 py-1 rounded-full"><Star className="w-4 h-4 text-amber-400 mr-1" /><span className="text-amber-400 text-sm font-medium">{job.rating}</span></div></div>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3"><span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{job.location}</span><span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{job.date}</span><span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{job.time}</span><span className="flex items-center font-semibold text-green-400"><DollarSign className="w-4 h-4 mr-1" />{job.hourlyRate}</span></div>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6"><Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2" onClick={() => applyForJob(job.id)}>Candidatar-se</Button></div>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-12 bg-secondary/30 rounded-lg">
                <p className="text-muted-foreground text-lg">Nenhuma vaga encontrada com os filtros atuais.</p>
                <p className="text-muted-foreground">Tente ajustar sua busca ou volte mais tarde.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WaiterDashboard;