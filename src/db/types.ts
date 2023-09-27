import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Clip = {
    id: Generated<string>;
    kill: number;
};
export type History = {
    id: Generated<string>;
    userId: string;
    clipId: string;
    vote: number;
};
export type User = {
    id: Generated<string> | string;
    userName: string;
    email: string;
    points: number;
};
export type DB = {
    Clip: Clip;
    History: History;
    User: User;
};
