import bcrypt from "bcrypt";
import { route } from "plumier";

import { db } from "../../../model/db";
import { User } from "../../../model/domain";

export class UsersController {

    // pOST /api/v1/users
    @route.post("")
    async save(data: User) {
        const password = await bcrypt.hash(data.password, 10);
        return db("User").insert({ ...data, password, role: "User" });
    }

    // gET /api/v1/users?offset=<number>&limit=<number>
    @route.get("")
    list(offset: number, limit: number) {
        return db("User").where({ deleted: 0 })
            .offset(offset).limit(limit)
            .orderBy("createdAt", "desc");
    }

    // gET /api/v1/users/:id
    @route.get(":id")
    get(id: number) {
        return db("User").where({ id }).first();
    }

    // pUT /api/v1/users/:id
    @route.put(":id")
    async modify(id: number, data: User) {
        const password = await bcrypt.hash(data.password, 10);
        return db("User").update({ ...data, password }).where({ id });
    }

    // dELETE /api/v1/users/:id
    @route.delete(":id")
    delete(id: number) {
        return db("User").update({ deleted: 1 }).where({ id });
    }
}