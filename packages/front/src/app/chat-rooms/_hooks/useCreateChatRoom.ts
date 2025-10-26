import { postChatRoom } from "@/app/_asyncApis";
import { useMutation } from "@tanstack/react-query";

export const userCreateChatRoom = (personaId: number) => {
  return useMutation({ mutationFn: () => postChatRoom(personaId) });
};
