import {VoteType} from "../enum/VoteType.ts";

export interface IComment{
    content: string;
    voteCount: number;
    created: string;
    id: number;
    voteStatus: VoteType;
}