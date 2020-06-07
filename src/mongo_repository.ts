import {ObjectId, MongoCollection, MongoDatabase} from '../deps.ts';
import {Repository} from './repository.ts';

export class MongoRepository<ENTITY extends { _id: ObjectId | undefined }> implements Repository<ENTITY, ObjectId> {
    private readonly collection: MongoCollection;

    constructor(db: MongoDatabase, clazz: new (...a: any[]) => ENTITY) {
        this.collection = db.collection(clazz.name);
    }

    async deleteById(id: ObjectId): Promise<void> {
        await this.collection.deleteOne(({"_id": id}));
    }

    findAll(query?: Object): Promise<ENTITY[]> {
        return this.collection.find(query);
    }

    findOne(query?: Object): Promise<ENTITY> {
        return this.collection.findOne(query);
    }

    findById(id: ObjectId): Promise<ENTITY> {
        return this.collection.findOne({"_id": id});
    }

    save(entity: ENTITY): Promise<ObjectId> {
        return this.collection.insertOne(entity);
    }

    saveAll(...entities: ENTITY[]): Promise<ObjectId[]> {
        return this.collection.insertMany(entities);
    }
}
