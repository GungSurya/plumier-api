import { route } from "plumier";

import { db } from "../../../model/db";
import { Todo } from "../../../model/domain";


export class TodosController {

    // pOST /api/v1/todos
    @route.post("")
    save(data: Todo) {
        return db("Todo").insert(data);
    }

    // gET /api/v1/todos?offset=<number>&limit=<number>
    @route.get("")
    list(offset: number, limit: number) {
        return db("Todo").where({ deleted: 0 })
            .offset(offset).limit(limit)
            .orderBy("createdAt", "desc");
    }

    // gET /api/v1/todos/:id
    @route.get(":id")
    get(id: number) {
        return db("Todo").where({ id }).first();
    }

    // pUT /api/v1/todos/:id
    @route.put(":id")
    modify(id: number, data: Todo) {
        return db("Todo").update(data).where({ id });
    }

    // dELETE /api/v1/todos/:id
    @route.delete(":id")
    delete(id: number) {
        return db("Todo").update({ deleted: true }).where({ id });
    }
}