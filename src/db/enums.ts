export const kill_state = {
    UNDESIDED: "UNDESIDED",
    KILL: "KILL",
    NO_KILL: "NO_KILL"
} as const;
export type kill_state = (typeof kill_state)[keyof typeof kill_state];
