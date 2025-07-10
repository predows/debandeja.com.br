
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DialogClose } from '@/components/ui/dialog';

const jobSchema = z.object({
  restaurant: z.string().min(2, { message: "Nome do restaurante é obrigatório." }),
  location: z.string().min(2, { message: "Localização é obrigatória." }),
  date: z.string().min(1, { message: "Data é obrigatória." }),
  time: z.string().min(1, { message: "Horário é obrigatório." }),
  hourlyRate: z.string().min(1, { message: "Valor por hora é obrigatório." }),
  description: z.string().min(10, { message: "Descrição deve ter pelo menos 10 caracteres." }),
});

export const PostJobForm = ({ onJobPosted }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit = (data) => {
    const newJob = {
      ...data,
      rating: (Math.random() * (5 - 4) + 4).toFixed(1), // Mock rating
    };
    onJobPosted(newJob);
    reset();
    // This is a trick to close the dialog from a child component
    document.getElementById('closeDialog')?.click();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="restaurant" className="text-right">Restaurante</Label>
        <div className="col-span-3">
          <Input id="restaurant" {...register("restaurant")} />
          {errors.restaurant && <p className="text-red-500 text-xs mt-1">{errors.restaurant.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="location" className="text-right">Localização</Label>
        <div className="col-span-3">
          <Input id="location" {...register("location")} />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">Data</Label>
        <div className="col-span-3">
          <Input id="date" placeholder="Ex: Hoje, Amanhã, 25/12" {...register("date")} />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="time" className="text-right">Horário</Label>
        <div className="col-span-3">
          <Input id="time" placeholder="Ex: 18:00 - 23:00" {...register("time")} />
          {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="hourlyRate" className="text-right">Valor/Hora</Label>
        <div className="col-span-3">
          <Input id="hourlyRate" placeholder="Ex: R$ 25/hora" {...register("hourlyRate")} />
          {errors.hourlyRate && <p className="text-red-500 text-xs mt-1">{errors.hourlyRate.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">Descrição</Label>
        <div className="col-span-3">
          <Textarea id="description" {...register("description")} />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button id="closeDialog" type="button" variant="outline">Cancelar</Button>
        </DialogClose>
        <Button type="submit">Postar Vaga</Button>
      </div>
    </form>
  );
};
