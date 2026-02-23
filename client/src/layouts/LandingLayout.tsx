import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white mx-auto max-w-[2000px]">
      <Header />
      <main className="mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
