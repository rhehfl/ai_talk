import { chatRoomQueries } from "@/app/_queries";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "common";

export const useChatHistoryUpdater = (roomId: number) => {
  const queryClient = useQueryClient();
  const chatRoomQueryOption = chatRoomQueries.history(roomId);
  const historyUpdater = (message: Message) => {
    queryClient.setQueryData(chatRoomQueryOption.queryKey, (oldData) => {
      if (oldData === undefined) {
        return [message];
      }
      return [...oldData, message];
    });
  };

  return { historyUpdater };
};
