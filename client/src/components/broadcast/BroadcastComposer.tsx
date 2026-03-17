import { useState } from "react";
import { Send, Mail, MailX } from "lucide-react";
import { toast } from "sonner";
import RichTextEditor from "./RichTextEditor";
import RecipientSelector from "./RecipientSelector";
import { useCreateBroadcast } from "@/hooks/useBroadcast";

export default function BroadcastComposer() {
  const [title, setTitle] = useState("");
  const [htmlBody, setHtmlBody] = useState("");
  const [targetType, setTargetType] = useState<"all" | "actor_types">("all");
  const [targetActorTypes, setTargetActorTypes] = useState<string[]>([]);
  const [includeAdmins, setIncludeAdmins] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);

  const { mutate: createBroadcast, isPending } = useCreateBroadcast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a broadcast title.");
      return;
    }
    if (!htmlBody || htmlBody === "<p></p>") {
      toast.error("Please enter a message body.");
      return;
    }
    if (targetType === "actor_types" && targetActorTypes.length === 0) {
      toast.error("Please select at least one actor type.");
      return;
    }

    createBroadcast(
      {
        title,
        htmlBody,
        targetType,
        targetActorTypes,
        includeAdmins,
        sendEmail,
      },
      {
        onSuccess: () => {
          toast.success("Broadcast published successfully.");
          setTitle("");
          setHtmlBody("");
          setTargetType("all");
          setTargetActorTypes([]);
          setIncludeAdmins(false);
          setSendEmail(false);
        },
        onError: () => {
          toast.error("Failed to publish broadcast. Please try again.");
        },
      },
    );
  };

  return (
    <div
      className="rounded-3xl overflow-hidden shadow-xl"
      style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow:
          "0 8px 32px rgba(26,94,54,0.10), 0 1.5px 6px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 border-b"
        style={{
          borderColor: "rgba(255,255,255,0.4)",
          background: "rgba(26,94,54,0.05)",
        }}
      >
        <h2 className="text-[15px] font-black text-gray-900 tracking-tight">
          Create Broadcast
        </h2>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          Publish a message to members on the platform
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5">
            Broadcast Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Important Update on Seed Distribution"
            className="w-full px-4 py-3 rounded-xl border text-sm font-medium text-gray-800 placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green/50"
            style={{
              background: "rgba(255,255,255,0.6)",
              borderColor: "rgba(255,255,255,0.5)",
            }}
          />
        </div>

        {/* Recipients */}
        <div>
          <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">
            Recipients
          </label>
          <div
            className="rounded-2xl p-4"
            style={{
              background: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
          >
            <RecipientSelector
              targetType={targetType}
              targetActorTypes={targetActorTypes}
              includeAdmins={includeAdmins}
              onTargetTypeChange={setTargetType}
              onActorTypesChange={setTargetActorTypes}
              onIncludeAdminsChange={setIncludeAdmins}
            />
          </div>
        </div>

        {/* Message body */}
        <div>
          <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5">
            Message
          </label>
          <RichTextEditor
            value={htmlBody}
            onChange={setHtmlBody}
            placeholder="Compose your broadcast message here..."
          />
        </div>

        {/* Send email toggle */}
        <div
          className="flex items-center justify-between rounded-2xl px-4 py-3.5"
          style={{
            background: "rgba(255,255,255,0.4)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <div className="flex items-center gap-3">
            {sendEmail ? (
              <Mail className="w-4 h-4 text-brand-green" />
            ) : (
              <MailX className="w-4 h-4 text-gray-400" />
            )}
            <div>
              <p className="text-sm font-bold text-gray-800">
                Send Email Notification
              </p>
              <p className="text-xs text-gray-500">
                Emails will be queued and sent asynchronously
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSendEmail(!sendEmail)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              sendEmail ? "bg-brand-green" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-md transition-transform ${
                sendEmail ? "translate-x-6" : "translate-x-1"
              }`}
              style={{ width: "18px", height: "18px" }}
            />
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-brand-green text-white font-black text-sm tracking-wide shadow-lg hover:bg-brand-green/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {isPending ? "Publishing…" : "Publish Broadcast"}
        </button>
      </form>
    </div>
  );
}
