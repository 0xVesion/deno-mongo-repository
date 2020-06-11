# Mongo Repository

This library makes integrating mongo db in your project easy.

## Guide

mongoDB is a database that allows you to save json documents and is highly scalable. To get more information about how to set up your own mongoDB environment you can visit: [mongoDB Website](https://www.mongodb.com/en)

## Example

You need to allow unstable, read, write, net and plugin for mongo to work as the mongo client library needs to download a native plugin for it to work. The env permission is used to read the mongo configuration url and database name from your local environment.
 
```shell
denon run --unstable --allow-read --allow-write --allow-env --allow-net --allow-plugin src/repository.ts
```

```ts
import { MongoRepository } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
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
```
