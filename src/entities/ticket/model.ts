import { normalizeTickets } from './normalize';
import { createStore, guard, sample } from 'effector';
import { loadTicketsFx } from '../../api';
import { Ticket } from '../../types/entities';
import type { NormalizeTickets } from './types/ticket-normalize';

export const $tickets = createStore<Ticket[] | null>(null);

export const $normalizeTickets = createStore<NormalizeTickets[]>([]);

export const $visibleTickets = $normalizeTickets.map((tickets) =>
  tickets.slice(0, 5)
);

sample({
  source: guard({
    clock: loadTicketsFx.doneData,
    filter: Boolean,
  }),
  fn: ({ tickets }) => tickets.map(normalizeTickets),
  target: $normalizeTickets,
});
