import {VoteType} from "../enum/VoteType.ts";

export interface IPost {
    id: number;
    content: string;
    created: string;
    voteCount: number;
    commentCount: number;
    voteStatus: VoteType
}