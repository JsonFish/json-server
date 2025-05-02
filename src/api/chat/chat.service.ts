import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './entities/chat.entity';
import { CreateChatMessageDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMesssageRepository: Repository<ChatMessage>,
  ) {}

  // 保存消息
  async saveMessage(chatMessage: CreateChatMessageDto) {
    await this.chatMesssageRepository.save(chatMessage);
    return chatMessage;
  }

  // 获取历史消息
  async getChatHistory() {
    const [messageList, total] = await this.chatMesssageRepository.findAndCount(
      {
        where: { status: 0 },
      },
    );
    return messageList;
  }
}
