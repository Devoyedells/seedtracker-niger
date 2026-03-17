export interface Broadcast {
  _id: string;
  title: string;
  htmlBody?: string;
  preview?: string;
  senderName: string;
  senderRole: string;
  senderState?: string;
  targetType: "all" | "actor_types";
  targetActorTypes: string[];
  includeAdmins: boolean;
  sendEmail: boolean;
  emailsQueued: boolean;
  createdAt: string;
}

export interface BroadcastListResponse {
  data: Broadcast[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateBroadcastPayload {
  title: string;
  htmlBody: string;
  targetType: "all" | "actor_types";
  targetActorTypes?: string[];
  includeAdmins?: boolean;
  sendEmail?: boolean;
}
