import { useAuth } from "@/context/AuthContext";
import BroadcastComposer from "@/components/broadcast/BroadcastComposer";
import BroadcastTable from "@/components/broadcast/BroadcastTable";
import { Megaphone } from "lucide-react";

const ADMIN_ROLES = ["admin", "ekadmin", "anadmin", "ngadmin"];

export default function BroadcastPage() {
  const { user } = useAuth();
  const canCompose = user?.role && ADMIN_ROLES.includes(user.role);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-brand-green/10 flex items-center justify-center">
          <Megaphone className="w-5 h-5 text-brand-green" />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">
            Broadcast
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            {canCompose
              ? "Send platform-wide messages to members"
              : "Messages and announcements from the platform"}
          </p>
        </div>
      </div>

      {/* Composer — admin & state admin only */}
      {canCompose && <BroadcastComposer />}

      {/* Table — all authenticated users */}
      <BroadcastTable />
    </div>
  );
}
