import { domain, val } from "plumier";

export type UserRole = "User" | "Admin";

@domain()
export class Domain {
    constructor(
        public id: number = 0,
        public createdAt: Date = new Date(),
        public deleted: boolean = false
    ) { }
}

@domain()
export class User extends Domain {
    constructor(
        // @val.required()
        // @val.email()
        public email: string,
        public password: string,
        // @val.required()
        public name: string,
        public role: UserRole
    ) { super(); }
}

@domain()
export class Todo extends Domain {
    constructor(
        // @val.required()
        public todo: string,
        public userId: number,
        public completed: boolean = false
    ) { super(); }
}

@domain()
export class Payments extends Domain {
    constructor(
        // @val.required()
        public amount: number,
        public tokenId: string,
        public name: string,
        public email: string,
        public cardNumber: string,
        public expMonth: number,
        public expYear: number,
        public cvc: string
    ) { super(); }
}

@domain()
export class Customer extends Domain {
    constructor(
        public name: string,
        public email: string,
        public customerStripeId: string,
        public clientSecret: string,
    ) { super(); }
}