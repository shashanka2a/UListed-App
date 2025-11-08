"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card } from "../components/ui/card";
import { Upload, X, DollarSign, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Listing } from "@/app/types";

interface SellFormProps {
  onSubmit: (listing: Omit<Listing, "id" | "seller" | "sellerAvatar" | "postedAt" | "isFavorited">) => void;
}

export function SellForm({ onSubmit }: SellFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newListing = {
      title,
      price: parseFloat(price),
      image: images[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category,
      condition,
      description,
      location,
    };

    onSubmit(newListing);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form
    setTimeout(() => {
      setImages([]);
      setTitle("");
      setPrice("");
      setCategory("");
      setCondition("");
      setDescription("");
      setLocation("");
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-6 py-4">
          <h1 className="text-gray-900">Create Listing</h1>
          <p className="text-gray-600 mt-1">Share what you're selling</p>
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
          >
            <Card className="px-6 py-4 bg-green-600 text-white border-0 shadow-lg rounded-2xl flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <span>Listing created successfully!</span>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <div className="max-w-lg mx-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <Card className="p-6 rounded-2xl border-2 border-dashed border-gray-300 bg-white hover:border-blue-400 transition-colors duration-200">
            <div className="space-y-4">
              <div className="text-center">
                <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                <h3 className="text-gray-900">Upload Photos</h3>
                <p className="text-gray-500 mt-1">
                  Add up to 5 photos (first photo will be cover)
                </p>
              </div>

              {/* Image Preview Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, index) => (
                    <motion.div
                      key={index}
                      className="relative aspect-square"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={img}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2">
                          <span className="px-2 py-1 bg-blue-600 text-white rounded-md text-xs">
                            Cover
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              {images.length < 5 && (
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
                      onClick={() =>
                        (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()
                      }
                    >
                      Choose Photos
                    </Button>
                  </motion.div>
                </label>
              )}
            </div>
          </Card>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., MacBook Pro 2021"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full h-12 rounded-xl border-2 border-gray-200 transition-all duration-200 focus:border-blue-600 hover:border-gray-300"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-gray-700">
              Price *
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
                step="0.01"
                className="w-full h-12 pl-12 rounded-xl border-2 border-gray-200 transition-all duration-200 focus:border-blue-600 hover:border-gray-300"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-gray-700">
              Category *
            </Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="w-full h-12 rounded-xl border-2 border-gray-200 transition-all duration-200 focus:border-blue-600 hover:border-gray-300">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Tickets">Tickets</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <Label htmlFor="condition" className="text-gray-700">
              Condition *
            </Label>
            <Select value={condition} onValueChange={setCondition} required>
              <SelectTrigger className="w-full h-12 rounded-xl border-2 border-gray-200 transition-all duration-200 focus:border-blue-600 hover:border-gray-300">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Like New">Like New</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-gray-700">
              Pickup Location *
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g., Library West, Student Union"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full h-12 rounded-xl border-2 border-gray-200 transition-all duration-200 focus:border-blue-600 hover:border-gray-300"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your item, include any defects or special features..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
              className="w-full rounded-xl border-2 border-gray-200 transition-all duration-200 focus:border-blue-600 hover:border-gray-300 resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Create Listing
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
