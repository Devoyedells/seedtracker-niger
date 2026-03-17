import { useState } from "react";
import { useBroadcasts } from "@/hooks/useBroadcast";
import BroadcastDetailModal from "./BroadcastDetailModal";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Megaphone, Mail, Loader2, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const ACTOR_TYPE_LABELS: Record<string, string> = {
  producer: "Seed Producer",
  input_provider: "Input Provider",
  aggregator: "Aggregator",
  dealer: "Dealer & Retailer",
  offtaker: "Offtaker",
  processor: "Processor",
  farmer: "Farmer / Coop",
  others: "Others",
};

const LIMIT = 10;

function buildPages(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (currentPage > 3) pages.push("ellipsis");
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }
  if (currentPage < totalPages - 2) pages.push("ellipsis");
  pages.push(totalPages);
  return pages;
}

export default function BroadcastTable() {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, isLoading } = useBroadcasts(page, LIMIT);

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 1;

  return (
    <>
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
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{
            borderColor: "rgba(255,255,255,0.4)",
            background: "rgba(26,94,54,0.05)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-brand-green/10 flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-brand-green" />
            </div>
            <div>
              <h2 className="text-[15px] font-black text-gray-900 tracking-tight">
                Broadcasts
              </h2>
              {data && (
                <p className="text-xs text-gray-500 font-medium">
                  {data.total} total message{data.total !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-brand-green" />
            </div>
          ) : !data?.data.length ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Megaphone className="w-10 h-10 text-gray-300" />
              <p className="text-sm text-gray-400 font-medium">
                No broadcasts yet
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr
                  className="border-b"
                  style={{ borderColor: "rgba(0,0,0,0.05)" }}
                >
                  <th className="text-left px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-widest">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-widest hidden sm:table-cell">
                    Preview
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">
                    Audience
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">
                    Sent by
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {data.data.map((broadcast, idx) => (
                  <tr
                    key={broadcast._id}
                    onClick={() => setSelectedId(broadcast._id)}
                    className="cursor-pointer border-b group transition-colors hover:bg-brand-green/[0.04]"
                    style={{
                      borderColor: "rgba(0,0,0,0.04)",
                      background:
                        idx % 2 === 0
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                          <Megaphone className="w-3.5 h-3.5 text-brand-green" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-[13px] leading-tight line-clamp-1">
                            {broadcast.title}
                          </p>
                          {broadcast.sendEmail && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-0.5">
                              <Mail className="w-2.5 h-2.5" /> Email
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-gray-500 font-mono text-xs bg-gray-100 px-2 py-0.5 rounded-md">
                        {broadcast.preview ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                        {broadcast.targetType === "all"
                          ? broadcast.senderState
                            ? `All ${broadcast.senderState}`
                            : "All Members"
                          : broadcast.targetActorTypes
                              .map((t) => ACTOR_TYPE_LABELS[t] ?? t)
                              .join(", ")
                              .slice(0, 30)}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-xs font-semibold text-gray-600">
                        {broadcast.senderName}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs text-gray-400 font-medium">
                        {format(new Date(broadcast.createdAt), "MMM d, yyyy")}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand-green transition-colors ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="px-6 py-4 border-t flex justify-center"
            style={{ borderColor: "rgba(0,0,0,0.05)" }}
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                    className={
                      page === 1 ? "pointer-events-none opacity-40" : ""
                    }
                  />
                </PaginationItem>

                {buildPages(page, totalPages).map((p, i) =>
                  p === "ellipsis" ? (
                    <PaginationItem key={`e-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={page === p}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(p as number);
                        }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) setPage(page + 1);
                    }}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-40"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {selectedId && (
        <BroadcastDetailModal
          broadcastId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
}
