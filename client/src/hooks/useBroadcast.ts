import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import type {
  BroadcastListResponse,
  Broadcast,
  CreateBroadcastPayload,
} from "@/components/broadcast/types";

export function useBroadcasts(page: number, limit = 10) {
  return useQuery<BroadcastListResponse>({
    queryKey: ["broadcasts", page, limit],
    queryFn: async () => {
      const res = await api.get(`/broadcasts?page=${page}&limit=${limit}`);
      return res.data;
    },
  });
}

export function useBroadcast(id: string | null) {
  return useQuery<Broadcast>({
    queryKey: ["broadcast", id],
    queryFn: async () => {
      const res = await api.get(`/broadcasts/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateBroadcast() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateBroadcastPayload) => {
      const res = await api.post("/broadcasts", payload);
      return res.data as Broadcast;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["broadcasts"] });
    },
  });
}
