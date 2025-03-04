import { ROLE_TYPE } from "@/const";

export type IRollType = typeof ROLE_TYPE[keyof typeof ROLE_TYPE];
