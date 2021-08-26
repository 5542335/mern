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
      const user =  await this.userService.getUser(commentsDto.token)
      const authorName = user.firstName + ' ' + user.lastName
      const createdComments = new this.commentModel({...commentsDto, authorName});
      createdComments.save();
      this.server.to(commentsDto.repoId).emit('receiveComment', createdComments);
    }

    @SubscribeMessage('sendLike')
    async receiveLike(@ConnectedSocket() client: Socket) {
      
    }

    async handleConnection(socket: any) {
      const repoId = socket.handshake.query.repoId;
      const commentData = await this.commentModel.find({repoId: repoId}).exec();

      socket.join(repoId);
      socket.emit('getComments', commentData);
    }
  }
