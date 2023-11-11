export type MongoPlainObject<T> = { [P in keyof T]: T[P] };

export type MongoPlainObjectCreate<T> = Omit<Partial<MongoPlainObject<T>>, 'id' | '_id' | 'createdAt' | 'updatedAt'>;
export type MongoPlainObjectUpdate<T> = Omit<Partial<MongoPlainObject<T>>, 'id' | '_id' | 'createdAt' | 'updatedAt'>;
