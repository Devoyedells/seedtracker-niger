import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "@/context/AuthContext";
import { QrCode, Download, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function QRCodePage() {
  const { user } = useAuth();

  if (!user) return null;

  // Utilize the env variable for the frontend base URL to construct the full link
  const frontendUrl =
    import.meta.env.VITE_FRONTEND_URL || window.location.origin;
  const profileLink = `${frontendUrl.replace(/\/$/, "")}/actor/${user._id || user.id}`;

  const downloadQR = () => {
    const svg = document.getElementById("user-qr-code");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Fill white background for the downloaded image
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${user.fullName.replace(/\s+/g, "_")}_QR.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(profileLink);
    toast.success("Profile link copied successfully!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <QrCode className="w-6 h-6 text-brand-green" /> My Profile QR Code
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Share this QR code so stakeholders can instantly view your verified
            seed tracker profile.
          </p>
        </div>
      </div>

      {/* QR Code Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col items-center justify-center p-12 relative text-center">
        <div className="bg-[#f5f6f8] p-8 rounded-3xl mb-8 border border-gray-200 shadow-inner">
          <QRCodeSVG
            id="user-qr-code"
            value={profileLink}
            size={240}
            level="H"
            includeMargin={true}
            bgColor={"#ffffff"}
            fgColor={"#004225"} // Brand Green
          />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {user.fullName}
        </h2>
        <p className="text-gray-500 text-sm mb-8 font-medium max-w-xs mx-auto">
          Scan this code with an smartphone camera to open the digital profile.
        </p>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={downloadQR}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-semibold rounded-xl hover:bg-[#00301b] transition-colors"
          >
            <Download className="w-4 h-4" /> Download
          </button>

          <button
            onClick={copyLink}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <Share2 className="w-4 h-4" /> Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}
