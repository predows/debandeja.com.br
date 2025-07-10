import React from 'react';

export const mockJobs = [
    {
      id: 1,
      restaurant: "Restaurante Sabor Intenso",
      location: "Centro, São Paulo",
      date: "Hoje",
      time: "18:00 - 23:00",
      hourlyRate: "R$ 25/hora",
      rating: 4.8,
      description: "Evento especial - Jantar corporativo para 50 pessoas"
    },
    {
      id: 2,
      restaurant: "Pizzaria Forno a Lenha",
      location: "Vila Madalena, São Paulo",
      date: "Amanhã",
      time: "19:00 - 01:00",
      hourlyRate: "R$ 22/hora",
      rating: 4.6,
      description: "Fim de semana movimentado - Experiência necessária"
    },
    {
      id: 3,
      restaurant: "Café Aromas da Manhã",
      location: "Jardins, São Paulo",
      date: "15/01",
      time: "07:00 - 15:00",
      hourlyRate: "R$ 20/hora",
      rating: 4.9,
      description: "Turno matutino - Café da manhã e almoço"
    }
];

export const mockWaiters = [
    {
      id: 1,
      name: "Carlos Silva",
      experience: "3 anos",
      rating: 4.9,
      location: "Centro, São Paulo",
      availability: "Disponível hoje",
      specialties: ["Eventos", "Fine Dining"]
    },
    {
      id: 2,
      name: "Ana Santos",
      experience: "5 anos",
      rating: 4.8,
      location: "Vila Madalena, São Paulo",
      availability: "Disponível amanhã",
      specialties: ["Pizzaria", "Atendimento Rápido"]
    },
    {
      id: 3,
      name: "Roberto Lima",
      experience: "2 anos",
      rating: 4.7,
      location: "Jardins, São Paulo",
      availability: "Disponível hoje",
      specialties: ["Café", "Brunch"]
    }
];
