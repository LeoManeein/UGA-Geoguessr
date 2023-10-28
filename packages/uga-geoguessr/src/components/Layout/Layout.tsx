import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import type { ReactNode } from "react";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen   px-0 bg-neargrey-50">
      <Header />
      <main
        className={`flex-1 top-0 px-1 flex flex-col pl-0 pr-0 mt-16  relative bg-brightness-50 bg-blend-darken  `}
      >
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
}
