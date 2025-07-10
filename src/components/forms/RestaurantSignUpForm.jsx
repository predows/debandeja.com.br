import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const restaurantSchema = z.object({
  name: z.string().min(2, "Nome do restaurante é obrigatório."),
  email: z.string().email("Email inválido."),
  location: z.string().min(3, "Localização é obrigatória."),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
});

export const RestaurantSignUpForm = ({ onSignUp }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(restaurantSchema),
  });
  const { toast } = useToast();

  const onSubmit = (data) => {
    const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    const newUser = { id: restaurants.length + 1, ...data, type: 'restaurant' };
    restaurants.push(newUser);
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
    
    toast({
      title: "✅ Cadastro realizado com sucesso!",
      description: `Bem-vindo, ${data.name}!`,
    });
    onSignUp(newUser);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Restaurante</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>
       <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Localização</Label>
        <Input id="location" {...register("location")} />
        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full">Cadastrar</Button>
    </form>
  );
};