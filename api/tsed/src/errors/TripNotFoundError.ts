import { NotFound } from '@tsed/exceptions';

export class TripNotFoundError extends NotFound {
  constructor(id: string) {
    super(`Trip ${id} not found`);
  }
}
