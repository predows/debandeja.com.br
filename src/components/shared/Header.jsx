import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bell, User, Menu, X, Utensils, ChefHat, PlusCircle, Home } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostJobForm } from '@/components/forms/PostJobForm';

const Header = ({ userType, onLogout, onJobPosted, navigateTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);
    setUnreadCount(storedNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = () => {
    const updatedNotifications = notifications.map(n => ({...n, read: true}));
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };

  const Icon = userType === 'waiter' ? Utensils : ChefHat;

  return (
    <header className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigateTo('dashboard')}>
            <Icon className="w-8 h-8 text-primary mr-3" />
            <span className="text-xl font-bold text-foreground">GarçomConnect</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {userType === 'restaurant' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-foreground hover:bg-accent">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Postar Vaga
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Criar uma nova vaga</DialogTitle></DialogHeader>
                  <PostJobForm onJobPosted={onJobPosted} />
                </DialogContent>
              </Dialog>
            )}
             <Button variant="ghost" className="text-foreground hover:bg-accent" onClick={() => navigateTo('dashboard')}>
              <Home className="w-5 h-5 mr-2" />
              Dashboard
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:bg-accent relative" onClick={markAsRead}>
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary ring-2 ring-background" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? notifications.map(n => (
                  <DropdownMenuItem key={n.id} className={`${!n.read ? 'font-bold' : ''}`}>
                    {n.message}
                  </DropdownMenuItem>
                )) : <DropdownMenuItem>Nenhuma notificação</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="text-foreground hover:bg-accent" onClick={() => navigateTo('profile')}>
              <User className="w-5 h-5 mr-2" />
              Perfil
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={onLogout}>
              Sair
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-background/90 backdrop-blur-lg border-b border-border">
          <div className="px-4 py-2 space-y-2">
            <Button variant="ghost" className="w-full text-foreground hover:bg-accent justify-start" onClick={() => { navigateTo('dashboard'); setIsMenuOpen(false); }}>
              <Home className="w-5 h-5 mr-2" />Dashboard
            </Button>
            {userType === 'restaurant' && (
              <Dialog onOpenChange={() => setIsMenuOpen(false)}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full text-foreground hover:bg-accent justify-start">
                    <PlusCircle className="w-5 h-5 mr-2" />Postar Vaga
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Criar uma nova vaga</DialogTitle></DialogHeader>
                  <PostJobForm onJobPosted={onJobPosted} />
                </DialogContent>
              </Dialog>
            )}
            <Button variant="ghost" className="w-full text-foreground hover:bg-accent justify-start" onClick={() => { markAsRead(); setIsMenuOpen(false); }}>
              <Bell className="w-5 h-5 mr-2" />Notificações
            </Button>
            <Button variant="ghost" className="w-full text-foreground hover:bg-accent justify-start" onClick={() => { navigateTo('profile'); setIsMenuOpen(false); }}>
              <User className="w-5 h-5 mr-2" />Perfil
            </Button>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground justify-start" onClick={onLogout}>
              Sair
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;