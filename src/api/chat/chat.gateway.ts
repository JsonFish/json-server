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

  // 处理用户连接
  handleConnection(client: Socket) {
    console.log(`用户端连接---: ${client.id}`);
    // console.log(client.handshake); // 打印连接信息
    // console.log(client.handshake.address);
    // console.log(client.handshake.headers);
  }

  // 处理用户断开连接
  handleDisconnect(client: Socket) {
    console.log(`用户端开链接---: ${client.id}`);
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
    const createTime = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const ipStr = client.handshake.address;
    // const { ip } = await getIpAddress(ipStr);
    const ip = ipStr;
    const chatMessage = await this.chatService.saveMessage({
      username,
      message,
      avatar,
      createTime,
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
