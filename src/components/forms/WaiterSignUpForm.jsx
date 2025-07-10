import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const waiterSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório."),
  email: z.string().email("Email inválido."),
  experience: z.string().min(1, "Experiência é obrigatória."),
  specialties: z.string().min(3, "Especialidades são obrigatórias."),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
});

export const WaiterSignUpForm = ({ onSignUp }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(waiterSchema),
  });
  const { toast } = useToast();

  const onSubmit = (data) => {
    const waiters = JSON.parse(localStorage.getItem('waiters')) || [];
    const newUser = { 
      id: waiters.length + 1, 
      ...data,
      specialties: data.specialties.split(',').map(s => s.trim()),
      rating: (Math.random() * (5 - 4.5) + 4.5).toFixed(1),
      availability: 'Disponível hoje',
      location: 'Centro, São Paulo', // Mock location
      type: 'waiter'
    };
    waiters.push(newUser);
    localStorage.setItem('waiters', JSON.stringify(waiters));

    toast({
      title: "✅ Cadastro realizado com sucesso!",
      description: `Bem-vindo, ${data.name}!`,
    });
    onSignUp(newUser);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome Completo</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">Anos de Experiência</Label>
         <Select onValueChange={(value) => setValue('experience', value)} value={watch('experience')}>
          <SelectTrigger id="experience">
            <SelectValue placeholder="Selecione seus anos de experiência" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1 ano">1 ano</SelectItem>
            <SelectItem value="2 anos">2 anos</SelectItem>
            <SelectItem value="3 anos">3 anos</SelectItem>
            <SelectItem value="4 anos">4 anos</SelectItem>
            <SelectItem value="5+ anos">5+ anos</SelectItem>
          </SelectContent>
        </Select>
        {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="specialties">Especialidades (separadas por vírgula)</Label>
        <Textarea id="specialties" placeholder="Ex: Vinhos, Eventos, Cozinha Italiana" {...register("specialties")} />
        {errors.specialties && <p className="text-red-500 text-xs mt-1">{errors.specialties.message}</p>}
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