import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import getIpAddress from '@/utils/ip-address';
import { CreateChatMessageDto } from '@/api/chat/dto/chat.dto';

@WebSocketGateway({ cors: true }) // 启用跨域
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  private onlineNumber: number = 0; // 在线人数
  // 处理用户连接
  handleConnection(client: Socket) {
    console.log(`用户连接---: ${client.id}`);
    this.onlineNumber++;
    setInterval(() => {
      client.emit('sendOnline', {
        onlineNumber: this.onlineNumber,
      });
    }, 2000);
  }
  // 处理用户断开连接
  handleDisconnect(client: Socket) {
    console.log(`用户断开---: ${client.id}`);
    this.onlineNumber--;
  }

  // 处理发送消息事件
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: CreateChatMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { username, message, avatar } = data;
    if (!username || !message || !avatar) {
      return;
    }
    const { ip } = await getIpAddress(client.handshake.address);
    const chatMessage = await this.chatService.saveMessage({
      username,
      message,
      avatar,
      ip,
    });

    // 广播消息给所有连接的客户端
    this.server.emit('receiveMessage', chatMessage);
    return chatMessage;
  }

  // 处理获取历史消息事件
  @SubscribeMessage('getHistory')
  async handleGetHistory(@ConnectedSocket() client: Socket) {
    const messageList = await this.chatService.getChatHistory();
    client.emit('chatHistory', messageList);
  }
}
