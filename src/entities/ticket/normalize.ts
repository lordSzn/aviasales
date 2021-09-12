import { createStore, sample } from 'effector';
import { NormalizeTickets } from './types/ticket-normalize';
import { Ticket } from '../../types/entities';
import { $cacheTickets } from './model';

export const $normalizeTickets = createStore<NormalizeTickets[]>([]);

sample({
  source: $cacheTickets,
  fn: (tickets) => tickets.map(normalizeTickets),
  target: $normalizeTickets,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const normalizeSegments = (segments: Ticket['segments']) => {
  const normalize = segments.map((segment) => ({
    onTheWay: segment.duration,
    transplants: segment.stops,
    route: {
      origin: segment.origin,
      destination: segment.destination,
      date: segment.date,
    },
  }));

  return normalize;
};

export const normalizeTickets = ({
  price,
  carrier,
  segments,
}: Ticket): NormalizeTickets => {
  const photoUrl = `https://pics.avs.io/99/36/${carrier}.png`;
  const [there, back] = normalizeSegments(segments);

  return {
    price,
    photoUrl,
    there,
    back,
  };
};
