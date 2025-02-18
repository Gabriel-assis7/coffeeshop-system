declare global {
    interface CustomJWtSession {
        dbId?: string;
        role?: UseRole
    }
}

export {}