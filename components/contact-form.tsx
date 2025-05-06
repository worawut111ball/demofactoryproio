"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    position: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [emailError, setEmailError] = useState("");

  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // ตรวจเฉพาะฟิลด์ email
    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("กรุณากรอกอีเมลให้ถูกต้อง เช่น yourname@example.com");
      } else {
        setEmailError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // แก้ไขฟังก์ชัน handleSubmit ให้ใช้ API แทน localStorage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(""); // ล้าง error เดิมก่อน

    // ตรวจสอบว่าทุกช่องมีค่าหรือไม่
    const { name, phone, email, company, position } = formData;
    if (!name || !phone || !email || !company || !position) {
      setFormError("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    // ตรวจ email ผิดรูปแบบด้วย
    if (!validateEmail(email)) {
      setEmailError("กรุณากรอกอีเมลให้ถูกต้อง เช่น yourname@example.com");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        company: "",
        position: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ขอบคุณสำหรับการติดต่อ
          </h3>
          <p className="text-gray-600 mb-6">
            เราได้รับข้อมูลของคุณเรียบร้อยแล้ว
            ทีมงานของเราจะติดต่อกลับโดยเร็วที่สุด
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            ส่งข้อมูลอีกครั้ง
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900">
          ปรึกษาและขอใบเสนอราคา
        </CardTitle>
        <CardDescription>
          กรอกข้อมูลของคุณเพื่อรับการติดต่อกลับจากทีมงานของเรา
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อ</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="กรุณากรอกชื่อของคุณ"
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11 sm:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">เบอร์โทร</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value;
                // รับเฉพาะตัวเลขเท่านั้น
                if (/^\d*$/.test(value)) {
                  handleChange(e);
                }
              }}
              placeholder="กรุณากรอกเบอร์โทรศัพท์"
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11 sm:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@company.com"
              required
              className={`border ${
                emailError ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:ring-blue-500 h-11 sm:h-12`}
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">บริษัท</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="กรุณากรอกชื่อบริษัท"
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11 sm:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">ตำแหน่ง</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="กรุณากรอกตำแหน่งของคุณ"
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11 sm:h-12"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="px-4 sm:px-6 flex flex-col space-y-2">
        {formError && (
          <p className="text-sm text-red-500 w-full text-center">{formError}</p>
        )}
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 text-sm sm:text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              กำลังส่งข้อมูล...
            </>
          ) : (
            "ส่งข้อมูล"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
