export class ReceiveCommentsDto {
  readonly token: string;
  readonly body: string;
  readonly repoId: string;
  readonly timestamp: number
}

export class SendCommentsDto {
  readonly authorName: string;
  readonly body: string;
  readonly repoId: string;
  readonly timestamp: number;
  readonly numberOfLikeCount: number;
  readonly numberOfDislikeCount: number;
}