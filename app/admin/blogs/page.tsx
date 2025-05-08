"use client";

import type React from "react";

import { useEffect, useState } from "react";
import AdminNavbar from "@/components/admin/admin-navbar";
import AuthCheck from "@/components/admin/auth-check";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface BlogData {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  images: { url: string }[];
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogData | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    fullContent: "",
    imageUrl: "",
    readTime: "",
    category: "",
    slug: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
      console.log("🚀 ~ imageFiles:", imageFiles);
    }
  };
  const handleRemoveImage = (urlToRemove: string) => {
    if (!currentBlog) return;
    const updatedImages = currentBlog.images.filter(
      (img) => img.url !== urlToRemove
    );
    setCurrentBlog({ ...currentBlog, images: updatedImages });
  };

  // แก้ไขฟังก์ชัน loadBlogs ให้ใช้ API แทน localStorage
  const loadBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/blogs");

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      console.log("Loaded blogs:", data);

      // เรียงลำดับข้อมูลจากใหม่ไปเก่า
      const sortedData = [...data].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      setBlogs(sortedData);
    } catch (error) {
      console.error("Error loading blogs:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลบทความได้",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // แก้ไขฟังก์ชัน handleAddBlog ให้ใช้ API แทน localStorage
  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding blog with data:", formData);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("excerpt", formData.excerpt);
      form.append("fullContent", formData.fullContent || formData.excerpt);
      form.append("readTime", formData.readTime || "5 นาที");
      form.append("category", formData.category);
      form.append(
        "slug",
        formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-")
      );

      imageFiles.forEach((file) => {
        console.log("🚀 ~ imageFiles.forEach ~ imageFiles:", imageFiles);
        form.append("images", file);
      });

      const response = await fetch("/api/blogs", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      // รีเซ็ตฟอร์ม
      setFormData({
        title: "",
        excerpt: "",
        fullContent: "",
        imageUrl: "",
        readTime: "",
        category: "",
        slug: "",
      });
      setImageFiles([]);
      setIsAddDialogOpen(false);
      loadBlogs();

      toast({
        title: "สำเร็จ",
        description: "เพิ่มบทความเรียบร้อยแล้ว",
      });
    } catch (error) {
      console.error("Error adding blog:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description:
          "ไม่สามารถเพิ่มบทความได้: " +
          (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  // แก้ไขฟังก์ชัน handleEditBlog ให้ใช้ API แทน localStorage
  const handleEditBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBlog) return;

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("excerpt", formData.excerpt);
      form.append("fullContent", formData.fullContent || formData.excerpt);
      form.append("readTime", formData.readTime || "5 นาที");
      form.append("category", formData.category);
      form.append(
        "slug",
        formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-")
      );

      currentBlog.images.forEach((img) => {
        form.append("existingImages", img.url);
      });

      console.log("🚀 ~ newImages:", newImages);
      newImages.forEach((file) => {
        console.log("🚀 ~ newImages.forEach ~ newImages:", newImages);
        form.append("images", file);
      });

      const response = await fetch(`/api/blogs/${currentBlog.id}`, {
        method: "PATCH",
        body: form,
      });
      console.log("🚀 ~ API Response:", response);

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      loadBlogs();
      setNewImages([]);
      setIsEditDialogOpen(false);

      toast({ title: "สำเร็จ", description: "แก้ไขบทความเรียบร้อยแล้ว" });
    } catch (error) {
      console.error("Error updating blog:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description:
          "ไม่สามารถแก้ไขบทความได้: " +
          (error instanceof Error ? error.message : String(error)),
        variant: "destructive",
      });
    }
  };

  // แก้ไขฟังก์ชัน handleDelete ให้ใช้ API แทน localStorage
  const handleDelete = async (id: string) => {
    if (confirm("คุณต้องการลบบทความนี้ใช่หรือไม่?")) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete blog");
        }

        loadBlogs();
        toast({
          title: "สำเร็จ",
          description: "ลบบทความเรียบร้อยแล้ว",
        });
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถลบบทความได้",
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = (blog: BlogData) => {
    setCurrentBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      fullContent: "",
      imageUrl: blog.imageUrl,
      readTime: blog.readTime,
      category: blog.category,
      slug: blog.slug,
    });
    setIsEditDialogOpen(true);
  };

  const openAddDialog = () => {
    // รีเซ็ตฟอร์มก่อนเปิด dialog
    setFormData({
      title: "",
      excerpt: "",
      fullContent: "",
      imageUrl: "",
      readTime: "",
      category: "",
      slug: "",
    });
    setIsAddDialogOpen(true);
  };

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">จัดการบทความ</h1>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              เพิ่มบทความใหม่
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>รายการบทความ</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-blue-600 border-r-transparent"></div>
                  <p className="mt-2 text-gray-500">กำลังโหลดข้อมูล...</p>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  ไม่พบบทความ
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>หัวข้อ</TableHead>
                        <TableHead>หมวดหมู่</TableHead>
                        <TableHead>วันที่</TableHead>
                        <TableHead>เวลาอ่าน</TableHead>
                        <TableHead>รูปภาพ</TableHead>
                        <TableHead className="text-right">จัดการ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogs.map((blog) => (
                        <TableRow key={blog.id}>
                          <TableCell className="font-medium">
                            {blog.title}
                          </TableCell>
                          <TableCell>{blog.category}</TableCell>
                          <TableCell>{blog.date}</TableCell>
                          <TableCell>{blog.readTime}</TableCell>
                          <TableCell>
                            <div className="flex -space-x-2 overflow-hidden">
                              {blog.images?.slice(0, 3).map((img, index) => (
                                <img
                                  key={index}
                                  src={img.url}
                                  alt={`Image ${index}`}
                                  className="inline-block h-12 w-12 rounded border-2 border-white object-cover shadow-sm"
                                />
                              ))}
                              {blog.images.length > 3 && (
                                <div className="h-12 w-12 rounded-full bg-gray-200 text-xs flex items-center justify-center border-2 border-white">
                                  +{blog.images.length - 3}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(blog)}
                                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(blog.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog สำหรับเพิ่มบทความ */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>เพิ่มบทความใหม่</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddBlog} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">หัวข้อบทความ</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="กรอกหัวข้อบทความ"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">เนื้อหาย่อ</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="กรอกเนื้อหาย่อของบทความ"
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullContent">เนื้อหาเต็ม</Label>
              <Textarea
                id="fullContent"
                name="fullContent"
                value={formData.fullContent}
                onChange={handleInputChange}
                placeholder="กรอกเนื้อหาเต็มของบทความ (ถ้าไม่ระบุจะใช้เนื้อหาย่อ)"
                rows={6}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">หมวดหมู่</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="เช่น การผลิต, เทคโนโลยี"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">เวลาในการอ่าน</Label>
                <Input
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  placeholder="เช่น 5 นาที"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageFile">เลือกรูปภาพ</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesChange}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                ยกเลิก
              </Button>
              <Button type="submit">บันทึก</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog สำหรับแก้ไขบทความ */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>แก้ไขบทความ</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditBlog} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">หัวข้อบทความ</Label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="กรอกหัวข้อบทความ"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-excerpt">เนื้อหาย่อ</Label>
              <Textarea
                id="edit-excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="กรอกเนื้อหาย่อของบทความ"
                required
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-fullContent">เนื้อหาเต็ม</Label>
              <Textarea
                id="edit-fullContent"
                name="fullContent"
                value={formData.fullContent}
                onChange={handleInputChange}
                placeholder="กรอกเนื้อหาเต็มของบทความ (ถ้าไม่ระบุจะใช้เนื้อหาย่อ)"
                rows={6}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category">หมวดหมู่</Label>
                <Input
                  id="edit-category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="เช่น การผลิต, เทคโนโลยี"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-readTime">เวลาในการอ่าน</Label>
                <Input
                  id="edit-readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  placeholder="เช่น 5 นาที"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-imageUrl">เลือกรูปภาพ</Label>
              {currentBlog?.images?.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.url}
                    alt={`Image ${index}`}
                    className="h-24 w-24 object-cover rounded border"
                  />
                  <button
                    onClick={() => handleRemoveImage(img.url)}
                    className="absolute top-0 right-0 text-xs text-red-600 bg-white rounded-full p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
              <Input
                id="edit-newImages"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files);
                    console.log("📸 รูปภาพใหม่ที่เลือก:", files);
                    setNewImages(files);
                  }
                }}
              />
              <div className="flex gap-2 flex-wrap">
                {newImages.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`New Preview ${index}`}
                    className="h-16 w-16 object-cover rounded border"
                  />
                ))}
              </div>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="edit-slug">Slug (URL)</Label>
              <Input
                id="edit-slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="เช่น my-blog-post (ถ้าไม่ระบุจะสร้างจากหัวข้อ)"
              />
            </div> */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                ยกเลิก
              </Button>
              <Button type="submit">บันทึก</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AuthCheck>
  );
}
