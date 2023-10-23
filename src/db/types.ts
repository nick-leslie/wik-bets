import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { kill_state } from "./enums";

export type Clip = {
    id: Generated<string> | string;
    kill: kill_state;
};
export type History = {
    id: Generated<string> | string;
    userId: string;
    clipId: string;
    vote: number;
};
export type User = {
    id: Generated<string> | string;
    userName: string;
    email: string;
    points: number;
    isAdmin: Generated<number> | number;
};
export type DB = {
    Clip: Clip;
    History: History;
    User: User;
};
