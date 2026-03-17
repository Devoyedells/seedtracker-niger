import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

export interface NotificationItem {
  _id: string;
  title: string;
  senderName: string;
  createdAt: string;
}

export function useUnreadCount() {
  return useQuery<number>({
    queryKey: ["notifications", "count"],
    queryFn: async () => {
      const res = await api.get<{ count: number }>(
        "/broadcasts/notifications/count",
      );
      return res.data.count;
    },
    // Poll every 30 seconds
    refetchInterval: 30_000,
    // Also refresh when window regains focus
    refetchOnWindowFocus: true,
    staleTime: 20_000,
  });
}

export function useUnreadNotifications() {
  return useQuery<NotificationItem[]>({
    queryKey: ["notifications", "recent"],
    queryFn: async () => {
      const res = await api.get<NotificationItem[]>(
        "/broadcasts/notifications/recent",
      );
      return res.data;
    },
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
    staleTime: 20_000,
  });
}

export function useMarkBroadcastRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (broadcastId: string) =>
      api.post(`/broadcasts/${broadcastId}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
