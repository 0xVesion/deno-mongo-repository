export interface Repository<ENTITY, ID> {
    deleteById(id: ID): Promise<void>;

    findAll(): Promise<ENTITY[]>;

    findById(id: ID): Promise<ENTITY>;

    save(entity: ENTITY): Promise<ID>;

    saveAll(...entities: ENTITY[]): Promise<ID[]>;
}
