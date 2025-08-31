import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RequestGemini } from '@/app/_types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  const { prompt, role } = (await req.json()) as RequestGemini;
  if (!prompt) {
    return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
  }

  try {
    let systemPrompt = '';
    if (role === 'devA') {
      systemPrompt = process.env.GEMINI_SYSTEM_PROMPT_DEVA || '';
    } else if (role === 'devB') {
      systemPrompt = process.env.GEMINI_SYSTEM_PROMPT_DEVB || '';
    }
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-flash',
      systemInstruction: {
        role: 'system',
        parts: [{ text: systemPrompt }],
      },
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return NextResponse.json({ text });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        { error: e.message || 'Gemini API error' },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ error: 'Gemini API error' }, { status: 500 });
    }
  }
}
