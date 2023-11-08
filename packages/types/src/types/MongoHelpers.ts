export type MongoCreate<MODEL> = Omit<MODEL, '_id' | 'id' | 'createdAt' | 'updatedAt'>;
