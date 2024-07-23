import NavBar from "@/components/NavBar";

export default function SettingLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
