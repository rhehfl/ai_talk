// src/gemini/gemini.service.ts

import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { Message } from 'common';

@Injectable()
export class GeminiService {
  private readonly googleGenAI: GoogleGenAI;

  constructor() {
    this.googleGenAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }

  async generateContent(
    history: Message[],
    systemInstruction: string,
  ): Promise<string> {
    const contents = history.map((m) => ({
      role: m.author === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    try {
      const response = await this.googleGenAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
        },
      });

      if (!response.text) {
        throw new Error('Gemini API 응답이 없습니다.');
      }
      return response.text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Gemini API 호출 중 오류가 발생했습니다.');
    }
  }

  // 💡 [참고] 스트리밍 세션 생성 메서드 (채팅 게이트웨이용)
  async createChatSession(personaConfig: any) {
    // 이전에 논의된 스트리밍 세션 생성 및 관리를 위한 메서드
    // return this.googleGenAI.chats.create({...});
  }
}
