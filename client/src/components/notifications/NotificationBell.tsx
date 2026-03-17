import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import {
  useUnreadCount,
  useUnreadNotifications,
  useMarkBroadcastRead,
} from "@/hooks/useNotifications";

function formatRelative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const { data: count = 0 } = useUnreadCount();
  const { data: notifications = [] } = useUnreadNotifications();
  const markRead = useMarkBroadcastRead();

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleNotificationClick = (id: string) => {
    markRead.mutate(id);
    setOpen(false);
    navigate("/dashboard/broadcast");
  };

  const handleMarkAllRead = () => {
    notifications.forEach((n) => markRead.mutate(n._id));
    setOpen(false);
  };

  const displayCount = count > 99 ? "99+" : count > 0 ? String(count) : null;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notifications${count > 0 ? `, ${count} unread` : ""}`}
        className="relative p-2 rounded-xl text-gray-500 hover:text-brand-green hover:bg-brand-green/5 transition-all"
      >
        <Bell className="w-5 h-5" />

        {/* Badge */}
        {displayCount && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-black leading-none ring-2 ring-white">
            {displayCount}
          </span>
        )}

        {/* Ripple animation when there are unread messages */}
        {count > 0 && (
          <>
            <span className="absolute -top-0.5 -right-0.5 inline-flex rounded-full w-[18px] h-[18px] bg-red-400 opacity-60 animate-ping" />
          </>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-full mt-2 w-80 z-50 rounded-2xl overflow-hidden shadow-2xl border border-white/60"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-brand-green" />
              <span className="text-sm font-black text-gray-800">
                Notifications
              </span>
              {count > 0 && (
                <span className="text-[11px] font-black bg-red-100 text-red-600 rounded-full px-2 py-0.5">
                  {count} unread
                </span>
              )}
            </div>
            {notifications.length > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold text-brand-green hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-[360px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-semibold">
                  You&apos;re all caught up!
                </p>
                <p className="text-xs text-gray-300 mt-0.5">
                  No new broadcasts
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n._id}
                  onClick={() => handleNotificationClick(n._id)}
                  className="w-full text-left px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-brand-green/5 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    {/* Unread dot */}
                    <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-brand-green" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate group-hover:text-brand-green transition-colors">
                        {n.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        From {n.senderName}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {formatRelative(n.createdAt)}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/60">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/dashboard/broadcast");
              }}
              className="w-full text-center text-xs font-bold text-brand-green hover:underline"
            >
              View all broadcasts →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
