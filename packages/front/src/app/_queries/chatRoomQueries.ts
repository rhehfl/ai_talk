import {
  getAllChatRooms,
  getChatRoomHistory,
  getChatRoomInfo,
  postChatRoom,
} from "@/app/_asyncApis";
import {
  mutationOptions,
  queryOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const chatRoomQueries = {
  all: () => ["chatRooms"] as const,
  list: () =>
    queryOptions({
      queryKey: [...chatRoomQueries.all(), "list"] as const,
      queryFn: () => getAllChatRooms(),
      staleTime: 60 * 1000 * 5,
    }),
  details: () => [...chatRoomQueries.all(), "details"] as const,
  detail: (roomId: number) =>
    queryOptions({
      queryKey: [...chatRoomQueries.details(), roomId],
      queryFn: () => getChatRoomInfo(roomId),
    }),
  history: (roomId: number) =>
    queryOptions({
      queryKey: [...chatRoomQueries.details(), roomId, "history"] as const,
      queryFn: () => getChatRoomHistory(roomId),
    }),
};

export const chatRoomMutations = {
  createRoom: () => {
    const queryClient = useQueryClient();
    return mutationOptions({
      mutationFn: postChatRoom,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: chatRoomQueries.list().queryKey,
        });
      },
    });
  },
};
