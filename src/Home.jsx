import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { ThemeSwitcher } from "./components/theme/ThemeSwitcher";

function Home() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-140px)] relative">
        <Outlet />
        <ThemeSwitcher />
      </main>
      <Footer />
    </>
  );
}

export default Home;
