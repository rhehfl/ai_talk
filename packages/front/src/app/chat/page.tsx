"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "common";
const WEBSOCKET_URL = "ws://localhost:8080";
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      author: "ChatGPT",
      content: "채팅방에 오신 것을 환영합니다! 메시지를 보내보세요.",
      timestamp: Date.now() - 60000,
    },
    {
      id: "2",
      author: "User",
      content: "안녕하세요!",
      timestamp: Date.now() - 30000,
    },
  ]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null); // 스크롤을 맨 아래로 내리기 위한 ref
  useEffect(() => {
    // 웹소켓 클라이언트 인스턴스 생성
    const ws = new WebSocket(WEBSOCKET_URL);

    // 연결이 성공적으로 열렸을 때 실행됩니다.
    ws.onopen = () => {
      console.log("✅ 웹소켓 서버와 연결되었습니다.");
      setSocket(ws);
      setIsConnected(true);
    };

    // 서버로부터 메시지를 수신했을 때 실행됩니다.
    ws.onmessage = (event) => {
      try {
        const newMessage: Message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        // 서버에서 오는 환영 메시지 등 JSON이 아닌 일반 텍스트를 처리합니다.
        console.log("수신된 텍스트 메시지:", event.data);
        const systemMessage: Message = {
          id: Date.now().toString(),
          author: "System",
          content: event.data,
          timestamp: Date.now(),
        };
        setMessages((prevMessages) => [...prevMessages, systemMessage]);
      }
    };

    // 연결이 닫혔을 때 실행됩니다.
    ws.onclose = () => {
      console.log("🔌 서버와의 연결이 끊어졌습니다.");
      setIsConnected(false);
    };

    // 에러가 발생했을 때 실행됩니다.
    ws.onerror = (error) => {
      console.error("웹소켓 에러 발생:", error);
      setIsConnected(false);
    };

    // 컴포넌트가 언마운트될 때 웹소켓 연결을 정리합니다 (매우 중요!).
    return () => {
      ws.close();
    };
  }, []);
  // 메시지가 추가될 때마다 스크롤을 맨 아래로 내립니다.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && socket && socket.readyState === WebSocket.OPEN) {
      const newMessage: Message = {
        id: Date.now().toString(),
        author: "나", // 실제로는 인증된 사용자 정보로 대체해야 합니다.
        content: inputMessage,
        timestamp: Date.now(),
      };
      // 메시지를 JSON 문자열 형태로 서버에 전송합니다.
      socket.send(JSON.stringify(newMessage));
      setInputMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        {/* 사이드바 (필요 시 추가) */}
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">채팅방</div>
          </div>
          <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src="https://picsum.photos/200" // 프로필 이미지
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">내 프로필</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          {/* 다른 사용자 목록 등... */}
        </div>

        {/* 채팅 메시지 영역 */}
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white p-4 h-full">
            <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto mb-4">
              <div className="flex flex-col h-full">
                {messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`flex items-end mb-2 ${
                      msg.author === "나" ? "justify-end" : ""
                    }`}
                  >
                    {msg.author !== "나" && ( // 다른 사람 메시지일 때만 아바타 표시
                      <div className="flex flex-col items-center space-y-2 order-1 mr-2">
                        <img
                          src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${msg.author}`}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-xs text-gray-500 break-words max-w-[50px] text-center">
                          {msg.author}
                        </span>
                      </div>
                    )}
                    <div
                      className="relative max-w-xs px-4 py-2 rounded-lg"
                      style={{
                        backgroundColor:
                          msg.author === "나" ? "#E0E7FF" : "#F3F4F6",
                        order: msg.author === "나" ? 2 : 1, // 내 메시지는 오른쪽에
                      }}
                    >
                      {msg.author === "나" ? ( // 내 메시지일 때만 Author 숨김
                        <></>
                      ) : (
                        <div className="text-sm font-semibold mb-1 hidden">
                          {msg.author}
                        </div>
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-xs text-gray-500 block text-right mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} /> {/* 스크롤 위치를 위한 더미 div */}
              </div>
            </div>

            {/* 메시지 입력창 */}
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <form onSubmit={handleSendMessage} className="flex w-full">
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="메시지를 입력하세요..."
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>보내기</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
