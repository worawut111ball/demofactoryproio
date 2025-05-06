"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Users,
  ImageIcon,
} from "lucide-react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  // แก้ไขฟังก์ชัน handleLogout ให้ใช้ API แทน localStorage
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/admin/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    {
      href: "/admin",
      label: "แดชบอร์ด",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/admin/contacts",
      label: "ข้อมูลการติดต่อ",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      href: "/admin/blogs",
      label: "จัดการบทความ",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    // { href: "/admin/testimonials", label: "จัดการรีวิว", icon: <Users className="mr-2 h-4 w-4" /> },
    // { href: "/admin/images", label: "จัดการรูปภาพ", icon: <ImageIcon className="mr-2 h-4 w-4" /> },
  ];

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-700">
              Factory Pro Admin
            </h1>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            ออกจากระบบ
          </Button>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-1 overflow-x-auto py-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={`${
                    pathname === item.href ? "bg-blue-600" : "hover:bg-gray-200"
                  } whitespace-nowrap`}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
