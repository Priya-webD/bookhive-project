import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, X, MapPin, CheckCircle, Camera, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    condition: "",
    description: "",
    category: [],
    location: ""
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const conditions = [
    { value: "new", label: "New", description: "Never read, pristine condition" },
    { value: "excellent", label: "Excellent", description: "Minimal wear, like new" },
    { value: "good", label: "Good", description: "Minor wear, all pages intact" },
    { value: "fair", label: "Fair", description: "Noticeable wear but readable" },
    { value: "worn", label: "Worn", description: "Heavy wear, may have markings" }
  ];

  const categories = [
    "Fiction", "Non-Fiction", "Mystery", "Romance", "Sci-Fi", "Fantasy", 
    "Biography", "Self-Help", "History", "Science", "Philosophy", "Arts"
  ];

  const selectedCategories = formData.category || [];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = selectedCategories;
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    setFormData(prev => ({
      ...prev,
      category: newCategories
    }));
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const validateForm = () => {
    return formData.title && formData.author && formData.condition && formData.description;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Book Listed Successfully!",
        description: "Your book is now available for exchange.",
      });
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">List a Book</h1>
        </div>
      </div>

      <main className="container mx-auto p-4 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="shadow-brand animate-fade-in">
            <CardHeader>
              <CardTitle>Book Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Book Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter the book title"
                  className={formData.title ? "border-success" : ""}
                />
                {formData.title && (
                  <CheckCircle size={16} className="text-success ml-auto" />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  placeholder="Enter the author's name"
                  className={formData.author ? "border-success" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN (Optional)</Label>
                <div className="relative">
                  <Input
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => handleInputChange("isbn", e.target.value)}
                    placeholder="Enter ISBN for quick lookup"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Search size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Condition */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Book Condition *</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select book condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition.value} value={condition.value}>
                      <div className="space-y-1">
                        <div className="font-medium">{condition.label}</div>
                        <div className="text-sm text-muted-foreground">{condition.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Description *</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the book's condition, any markings, or why you're exchanging it..."
                rows={4}
                className={formData.description ? "border-success" : ""}
              />
            </CardContent>
          </Card>

          {/* Photos */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Upload Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? "border-primary bg-primary/5" 
                    : "border-muted hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Camera size={32} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  Drag and drop images here, or click to select
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <Upload size={16} className="mr-2" />
                  Choose Files
                </Button>
              </div>

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Pickup Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter pickup location or use current location"
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="success"
            size="xl"
            className="w-full"
            disabled={!validateForm() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Listing Book...
              </>
            ) : (
              <>
                <CheckCircle size={18} className="mr-2" />
                List Book Now
              </>
            )}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddBook;