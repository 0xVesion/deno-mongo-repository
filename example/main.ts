import { MongoRepository } from "https://deno.land/x/mongo_repository@v0.7.0/mod.ts";
export { MongoClient, Database, ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const client = new MongoClient();
client.connectWithUri(Deno.env.get("MONGO_URL") || "");
const db = client.database(Deno.env.get("MONGO_NAME") || "");

const userRepository = new UserRepository(db);
const all = await userRepository.findAll();
console.log(all);

class User {
    readonly _id: ObjectId | undefined;
    readonly name: string;


    constructor(name: string) {
        this.name = name;
    }
}

class UserRepository extends MongoRepository<User> {
    constructor(db: Database) {
        super(db, User);
    }
}
