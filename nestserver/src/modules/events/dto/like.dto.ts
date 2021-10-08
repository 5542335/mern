export class LikeDto {
    readonly token: string;
    readonly repoId: string;
    readonly commentId: string;
    readonly isLike: boolean;
    readonly isDislike: boolean;
  }

  export class DislikeDto {
    readonly token: string;
    readonly repoId: string;
    readonly commentId: string;
    readonly isLike: boolean;
    readonly isDislike: boolean;
  }