"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"

interface NavBarProps {
  setActiveTab?: (tab: "OEE" | "FacScan" | "FacRobot") => void
}

export default function NavBar({ setActiveTab }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Check which section is currently in view
      const sections = [
        "home",
        "about",
        "platform",
        "OEE",
        "services",
        "pricing",
        "recommends",
        "blogs",
        "partners",
        "clients",
        "contact",
      ]

      // Special handling for home section - active when at the top of the page
      if (window.scrollY < 100) {
        setActiveSection("home")
      } else {
        // Find the section that is currently in view
        const currentSection = sections.find((section) => {
          if (section === "home") return false // Skip home in this check
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            // Consider a section in view if its top is within the viewport
            return rect.top <= 100 && rect.bottom >= 0
          }
          return false
        })

        if (currentSection) {
          setActiveSection(currentSection)
        }
      }
    }

    // เพิ่มการตรวจสอบว่าอยู่ในหน้าเบราว์เซอร์หรือไม่
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      // เรียกฟังก์ชันครั้งแรกเพื่อตั้งค่าเริ่มต้น
      handleScroll()
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    setActiveSection(sectionId)
    setIsPlatformDropdownOpen(false)

    // ตั้งค่า activeTab เมื่อคลิกที่เมนู OEE, FacScan หรือ FacRobot
    if (sectionId === "OEE" || sectionId === "FacScan" || sectionId === "FacRobot") {
      if (setActiveTab) {
        setActiveTab(sectionId as "OEE" | "FacScan" | "FacRobot")
      }
    }

    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return
    }

    const section = document.getElementById(sectionId)
    if (section) {
      // Get the height of the navbar to offset the scroll position
      const navbarHeight = 80 // Approximate height of the navbar in pixels
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })
    }
  }

  const togglePlatformDropdown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPlatformDropdownOpen(!isPlatformDropdownOpen)
  }

  const ScrollLink = ({
    href,
    children,
    className,
  }: { href: string; children: React.ReactNode; className?: string }) => {
    const sectionId = href.replace("#", "")
    const isActive = activeSection === sectionId

    return (
      <a
        href={href}
        className={`${className} ${
          isActive ? "text-blue-600 font-semibold bg-blue-50 md:bg-transparent rounded-md" : "text-gray-700"
        }`}
        onClick={(e) => handleScrollToSection(e, sectionId)}
      >
        {children}
      </a>
    )
  }

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    // Platform dropdown will be handled separately
    { href: "#services", label: "Services" },
    { href: "#pricing", label: "Package" },
    { href: "#blogs", label: "Portfolio" },
    // { href: "#partners", label: "พาร์ทเนอร์" },
    // { href: "#clients", label: "ลูกค้าของเรา" },
    // { href: "#contact", label: "ติดต่อ" },
  ]

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/FactoryPRO_02.png" alt="Factory Pro Logo" width={120} height={40} className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <ScrollLink href="#home" className={`font-medium hover:text-blue-400 transition-colors`}>
            Home
            </ScrollLink>
            <ScrollLink href="#about" className={`font-medium hover:text-blue-400 transition-colors`}>
            About
            </ScrollLink>

            {/* Platform dropdown menu */}
            <div className="relative">
              <button
                onClick={togglePlatformDropdown}
                className={`flex items-center font-medium hover:text-blue-400 transition-colors ${
                  activeSection === "platform" ||
                  activeSection === "OEE" ||
                  activeSection === "FacScan" ||
                  activeSection === "FacRobot"
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                Platform
                {isPlatformDropdownOpen ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </button>

              {isPlatformDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md py-1 z-50">
                  <ScrollLink href="#OEE" className="block px-4 py-2 hover:bg-blue-50 w-full text-left">
                    OEE
                  </ScrollLink>
                  <ScrollLink href="#FacScan" className="block px-4 py-2 hover:bg-blue-50 w-full text-left">
                    FacScan
                  </ScrollLink>
                  <ScrollLink href="#FacRobot" className="block px-4 py-2 hover:bg-blue-50 w-full text-left">
                    FacRobot
                  </ScrollLink>
                </div>
              )}
            </div>

            <ScrollLink href="#services" className={`font-medium hover:text-blue-400 transition-colors`}>
            Services
            </ScrollLink>
            <ScrollLink href="#pricing" className={`font-medium hover:text-blue-400 transition-colors`}>
            Package
            </ScrollLink>
            <ScrollLink href="#blogs" className={`font-medium hover:text-blue-400 transition-colors`}>
            Portfolio
            </ScrollLink>
            {/* <ScrollLink href="#partners" className={`font-medium hover:text-blue-400 transition-colors`}>
              พาร์ทเนอร์
            </ScrollLink> */}
            {/* <ScrollLink href="#clients" className={`font-medium hover:text-blue-400 transition-colors`}>
              ลูกค้าของเรา
            </ScrollLink> */}
            {/* <ScrollLink href="#contact" className={`font-medium hover:text-blue-400 transition-colors`}>
              ติดต่อ
            </ScrollLink> */}
          </nav>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className={`h-6 w-6 text-gray-900`} /> : <Menu className={`h-6 w-6 text-gray-900`} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <ScrollLink
                href="#home"
                className="font-medium hover:text-blue-400 py-3 px-2 text-sm rounded-md hover:bg-blue-50"
              >
                Home
              </ScrollLink>
              <ScrollLink
                href="#about"
                className="font-medium hover:text-blue-400 py-3 px-2 text-sm rounded-md hover:bg-blue-50"
              >
                About
              </ScrollLink>

              {/* Platform dropdown for mobile */}
              <div>
                <button
                  onClick={togglePlatformDropdown}
                  className={`flex items-center w-full text-left font-medium py-3 px-2 text-sm rounded-md hover:bg-blue-50 ${
                    activeSection === "platform" ||
                    activeSection === "OEE" ||
                    activeSection === "FacScan" ||
                    activeSection === "FacRobot"
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-700"
                  }`}
                >
                  Platform
                  {isPlatformDropdownOpen ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </button>

                {isPlatformDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <ScrollLink href="#OEE" className="block py-2 px-3 text-sm rounded-md hover:bg-blue-50">
                      OEE
                    </ScrollLink>
                    <ScrollLink href="#FacScan" className="block py-2 px-3 text-sm rounded-md hover:bg-blue-50">
                      FacScan
                    </ScrollLink>
                    <ScrollLink href="#FacRobot" className="block py-2 px-3 text-sm rounded-md hover:bg-blue-50">
                      FacRobot
                    </ScrollLink>
                  </div>
                )}
              </div>

              <ScrollLink
                href="#services"
                className="font-medium hover:text-blue-400 py-3 px-2 text-sm rounded-md hover:bg-blue-50"
              >
                Services
              </ScrollLink>
              <ScrollLink
                href="#pricing"
                className="font-medium hover:text-blue-400 py-3 px-2 text-sm rounded-md hover:bg-blue-50"
              >
                Package
              </ScrollLink>
              <ScrollLink
                href="#blogs"
                className="font-medium hover:text-blue-400 py-3 px-2 text-sm rounded-md hover:bg-blue-50"
              >
                Portfolio
              </ScrollLink>
              {/* <ScrollLink
                href="#partners"
                className="font-medium hover:text-blue-400 py-3 px-2 text-sm rounded-md hover:bg-blue-50"
              >
                พาร์ทเนอร์
              </ScrollLink> */}
              {/* <ScrollLink
                href="#clients"
                className="font-medium hover:text-blue-400 py-3 px-2 text-sm rounded-md hover:bg-blue-50"
              >
                ลูกค้าของเรา
              </ScrollLink> */}
              {/* <ScrollLink
                href="#contact"
                className="font-medium hover:text-blue-400 py-3 px-2 text-sm rounded-md hover:bg-blue-50"
              >
                ติดต่อ
              </ScrollLink> */}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
