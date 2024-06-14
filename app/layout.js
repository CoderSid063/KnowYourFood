import MainHeader from "@/components/main-header/MainHeader";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <MainHeader />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
