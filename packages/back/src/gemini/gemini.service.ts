// src/gemini/gemini.service.ts

import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { Message } from 'common';
import { Server } from 'socket.io';
@Injectable()
export class GeminiService {
  private readonly googleGenAI: GoogleGenAI;

  constructor() {
    this.googleGenAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }
  private formatHistory(history: Message[]) {
    return history.map((m) => ({
      role: m.author === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));
  }
  async generateContent(
    history: Message[],
    systemInstruction: string,
  ): Promise<string> {
    const contents = this.formatHistory(history);

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

  async generateStreamContent(
    history: Message[],
    systemInstruction: string,
    server: Server,
    message: string,
  ) {
    const contents = this.formatHistory(history);

    const chat = this.googleGenAI.chats.create({
      model: 'gemini-2.5-flash',
      history: contents,
      config: {
        systemInstruction,
      },
    });

    let fullResponseText = '';

    try {
      const stream = await chat.sendMessageStream({
        message,
      });
      for await (const chunk of stream) {
        if (chunk) {
          fullResponseText += chunk.text; // 2. 청크를 변수에 누적
          server.emit('ai-stream', { text: chunk.text }); // 3. 청크 전송
        }
      }
      server.emit('ai-stream-done', {
        fullText: fullResponseText,
      });
      return fullResponseText;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Gemini API 호출 중 오류가 발생했습니다.');
    }
  }
}
