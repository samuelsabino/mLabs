export type Result<Data, E = Error> = { success: true; data: Data } | { success: false; error: E };
