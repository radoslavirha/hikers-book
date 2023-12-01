export type EnumObject<TKey extends string | symbol | number, TType> = { [key in TKey]: TType };
