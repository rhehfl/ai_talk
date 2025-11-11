// src/gemini/gemini.service.ts

import { Injectable } from '@nestjs/common';
import { GoogleGenAI, ToolListUnion } from '@google/genai';
import { Message } from 'common';
import { BroadcastOperator, DefaultEventsMap, Server, Socket } from 'socket.io';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Emitter = Server | Socket | BroadcastOperator<DefaultEventsMap, any>;

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
    const tools: ToolListUnion = [
      {
        functionDeclarations: [
          // 도구 1: 저장소의 파일 구조(트리) 가져오기
          {
            name: 'get_repository_tree',
            description:
              '특정 GitHub 저장소의 전체 파일 및 폴더 구조(트리)를 가져옵니다.',
            parameters: {
              properties: {
                repositoryName: {
                  description:
                    '파일 트리를 가져올 저장소 이름 (예: "DoranDoran")',
                },
              },
              required: ['repositoryName'],
            },
          },
          // 도구 2: package.json 파일 내용 가져오기 (기술 스택 파악용)
          {
            name: 'get_package_json',
            description:
              '저장소의 package.json 파일 내용을 읽어와 기술 스택을 파악합니다.',
            parameters: {
              properties: {
                repositoryName: {
                  description: 'package.json을 읽어올 저장소 이름',
                },
              },
              required: ['repositoryName'],
            },
          },
        ],
      },
    ];
    try {
      const response = await this.googleGenAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          tools,
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
    emitter: Emitter,
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
          fullResponseText += chunk.text;
          emitter.emit('ai-stream', { text: chunk.text });
        }
      }
      emitter.emit('ai-stream-done', {
        fullText: fullResponseText,
      });
      return fullResponseText;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Gemini API 호출 중 오류가 발생했습니다.');
    }
  }
}
