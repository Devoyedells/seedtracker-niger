import { X, User, Calendar, Users, Mail, Tag } from "lucide-react";
import { useBroadcast } from "@/hooks/useBroadcast";
import { format } from "date-fns";

const ACTOR_TYPE_LABELS: Record<string, string> = {
  producer: "Seed Producer",
  input_provider: "Input Provider",
  aggregator: "Aggregator",
  dealer: "Dealer & Retailer",
  offtaker: "Offtaker",
  processor: "Processor",
  farmer: "Farmer / Cooperative",
  others: "Others",
};

const ROLE_LABELS: Record<string, string> = {
  admin: "Admin",
  ekadmin: "Ekiti Admin",
  anadmin: "Anambra Admin",
  ngadmin: "Niger Admin",
};

interface BroadcastDetailModalProps {
  broadcastId: string;
  onClose: () => void;
}

export default function BroadcastDetailModal({
  broadcastId,
  onClose,
}: BroadcastDetailModalProps) {
  const { data: broadcast, isLoading } = useBroadcast(broadcastId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow:
            "0 24px 64px rgba(26,94,54,0.18), 0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between px-6 py-5 flex-shrink-0 border-b"
          style={{
            borderColor: "rgba(0,0,0,0.06)",
            background: "rgba(26,94,54,0.04)",
          }}
        >
          <div className="flex-1 min-w-0 pr-4">
            {isLoading ? (
              <div className="h-5 bg-gray-200 rounded animate-pulse w-48" />
            ) : (
              <h2 className="text-[16px] font-black text-gray-900 leading-tight">
                {broadcast?.title}
              </h2>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Meta row */}
        {broadcast && !isLoading && (
          <div
            className="flex flex-wrap gap-3 px-6 py-3 flex-shrink-0 border-b"
            style={{
              borderColor: "rgba(0,0,0,0.05)",
              background: "rgba(255,255,255,0.4)",
            }}
          >
            <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
              <User className="w-3.5 h-3.5 text-brand-green" />
              {broadcast.senderName}
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">
                {ROLE_LABELS[broadcast.senderRole] ?? broadcast.senderRole}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {format(new Date(broadcast.createdAt), "MMM d, yyyy · h:mm a")}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              {broadcast.targetType === "all"
                ? broadcast.senderState
                  ? `All ${broadcast.senderState} Members`
                  : "All Members"
                : `${broadcast.targetActorTypes.map((t) => ACTOR_TYPE_LABELS[t] ?? t).join(", ")}`}
            </div>
            {broadcast.sendEmail && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                <Mail className="w-3.5 h-3.5" />
                Email sent
              </div>
            )}
            {broadcast.targetType === "actor_types" &&
              broadcast.targetActorTypes.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {broadcast.targetActorTypes.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1 text-xs bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-full font-semibold"
                    >
                      <Tag className="w-3 h-3" />
                      {ACTOR_TYPE_LABELS[t] ?? t}
                    </span>
                  ))}
                </div>
              )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 rounded animate-pulse"
                  style={{ width: `${85 - i * 8}%` }}
                />
              ))}
            </div>
          ) : broadcast?.htmlBody ? (
            <div
              className="prose prose-sm max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: broadcast.htmlBody }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
