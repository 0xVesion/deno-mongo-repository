import {ObjectId, MongoCollection, MongoDatabase} from '../deps.ts';
import {Repository} from './repository.ts';

export class MongoRepository<ENTITY extends { _id: ObjectId | undefined }> implements Repository<ENTITY, ObjectId> {
    private readonly collection: MongoCollection;
    private readonly name: string;

    constructor(db: MongoDatabase, clazz: new (...a: any[]) => ENTITY) {
        this.name = clazz.name;
        this.collection = db.collection(this.name);
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

    async save(entity: ENTITY): Promise<ObjectId> {
        if(entity._id) {
            const result = await this.collection.updateOne({_id: entity._id}, entity);

            if(result.modifiedCount !== 1) {
                throw new Error(`Error whilst updating ${this.entityToString(entity)}`);
            }

            return entity._id;
        } else {
            return this.collection.insertOne(entity);
        }
    }

    saveAll(...entities: ENTITY[]): Promise<ObjectId[]> {
        return Promise.all(entities.map((e) => this.save(e)));
    }

    private entityToString(entity: ENTITY): string {
        return `${this.name}(${entity._id?.$oid})`;
    }
}
