import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { ReceiveCommentsDto } from './dto/comments.dto';
import { UserService } from '../user/user.service';
import { DislikeDto, LikeDto } from './dto/like.dto';
// import { JwtWsAuthGuard } from '../auth/guards/jwt-ws-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtWsStrategy } from '../auth/strategies/jwt.ws.strategy';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendComment')
  async recieveComment(@MessageBody() commentsDto: ReceiveCommentsDto) {
    const user = await this.userService.getUser(commentsDto.token);
    const authorName = user.firstName + ' ' + user.lastName;
    const createdComment = new this.commentModel({
      ...commentsDto,
      authorName,
    });
    createdComment.save();
    this.server.to(commentsDto.repoId).emit('receiveComment', createdComment);
  }

  @SubscribeMessage('loadComment')
  async loadComment(@MessageBody() data: any) {
    const { repoId, skipCount, limitCount, token } = data;
    const mappedCommetns = await this.getComments(
      token,
      repoId,
      skipCount,
      limitCount,
    );
    this.server.to(repoId).emit('returnLoadComment', mappedCommetns);
  }

  @UseGuards(JwtWsStrategy)
  @SubscribeMessage('sendLike')
  async receiveLike(@MessageBody() likeDto: LikeDto) {
    const user = await this.userService.getUser(likeDto.token);
    const operation = !likeDto.isLike ? '$addToSet' : '$pull';
    const userId = user.id;

    if (likeDto.isDislike) {
      await this.commentModel
        .findOneAndUpdate(
          { _id: likeDto.commentId },
          { $pull: { dislike: userId } },
          { new: true },
        )
        .exec();
    }
    const comment = await this.commentModel
      .findOneAndUpdate(
        { _id: likeDto.commentId },
        { [operation]: { like: userId } },
        { new: true },
      )
      .exec();

    await this.server.to(likeDto.repoId).emit('receiveLike', {
      _id: comment._id,
      authorName: comment.authorName,
      body: comment.body,
      timestamp: comment.timestamp,
      isLiked: comment.like.includes(userId),
      isDisliked: comment.dislike.includes(userId),
      numberOfLikes: comment.like.length,
      numberOfDislikes: comment.dislike.length,
    });
  }

  @SubscribeMessage('sendDislike')
  async receiveDislike(@MessageBody() dislikeDto: DislikeDto) {
    const user = await this.userService.getUser(dislikeDto.token);
    const operation = !dislikeDto.isDislike ? '$addToSet' : '$pull';
    const userId = user.id;

    if (dislikeDto.isLike) {
      await this.commentModel
        .findOneAndUpdate(
          { _id: dislikeDto.commentId },
          { $pull: { like: userId } },
          { new: true },
        )
        .exec();
    }
    const comment = await this.commentModel
      .findOneAndUpdate(
        { _id: dislikeDto.commentId },
        { [operation]: { dislike: userId } },
        { new: true },
      )
      .exec();

    await this.server.to(dislikeDto.repoId).emit('receiveDislike', {
      _id: comment._id,
      authorName: comment.authorName,
      body: comment.body,
      timestamp: comment.timestamp,
      isLiked: comment.like.includes(userId),
      isDisliked: comment.dislike.includes(userId),
      numberOfLikes: comment.like.length,
      numberOfDislikes: comment.dislike.length,
    });
  }

  async getComments(
    token: string,
    repoId: string,
    skip: number,
    limit: number,
  ) {
    const { _id: userId = null} = token ? await this.userService.getUser(token) : {};
    const commentData = await this.commentModel
      .find({ repoId: repoId })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return commentData.map(
      ({ like, dislike, _id, authorName, body, timestamp }) => ({
        _id,
        authorName,
        body,
        timestamp,
        isLiked: like.includes(userId),
        isDisliked: dislike.includes(userId),
        numberOfLikes: like.length,
        numberOfDislikes: dislike.length,
      }),
    );
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const { token, repoId } = client.handshake.query;
    const mappedCommetns = await this.getComments(token, repoId, 0, 5);

    client.join(repoId);
    client.emit('getComments', mappedCommetns);
  }
}
