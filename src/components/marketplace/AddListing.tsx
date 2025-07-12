import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { ItemCondition } from "@/types";

interface AddListingFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  dormitory: string;
  condition: ItemCondition;
}

interface AddListingProps {
  onNext?: (data: AddListingFormData) => void;
  onCancel?: () => void;
}

const AddListing = ({ onNext, onCancel }: AddListingProps) => {
  const [formData, setFormData] = useState<AddListingFormData>({
    title: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    dormitory: "",
    condition: "used",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState<Partial<AddListingFormData>>({});

  // Mock data for categories
  const categories = [
    {
      name: "Электроника",
      subcategories: [
        "Телефоны",
        "Ноутбуки",
        "Наушники",
        "Планшеты",
        "Аксессуары",
      ],
    },
    {
      name: "Учебники",
      subcategories: [
        "Математика",
        "Физика",
        "Химия",
        "История",
        "Языки",
        "Экономика",
      ],
    },
    {
      name: "Одежда",
      subcategories: ["Мужская", "Женская", "Обувь", "Аксессуары"],
    },
    {
      name: "Спорт",
      subcategories: ["Тренажеры", "Инвентарь", "Одежда", "Велосипеды"],
    },
    {
      name: "Дом и быт",
      subcategories: ["Мебель", "Техника", "Посуда", "Декор", "Освещение"],
    },
    {
      name: "Транспорт",
      subcategories: ["Велосипеды", "Самокаты", "Аксессуары"],
    },
  ];

  const dormitories = [
    "Общежитие №1",
    "Общежитие №2",
    "Общежитие №3",
    "Общежитие №4",
    "Общежитие №5",
  ];

  const conditions = [
    { value: "new", label: "Новое", description: "Товар не использовался" },
    { value: "used", label: "Б/у", description: "Товар в хорошем состоянии" },
    {
      value: "damaged",
      label: "Требует ремонта",
      description: "Есть дефекты или поломки",
    },
  ];

  const handleInputChange = (
    field: keyof AddListingFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setFormData((prev) => ({
      ...prev,
      category: categoryName,
      subcategory: "", // Reset subcategory when category changes
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AddListingFormData> = {};

    if (!formData.title.trim()) newErrors.title = "Введите название";
    if (!formData.description.trim())
      newErrors.description = "Введите описание";
    if (!formData.price.trim()) newErrors.price = "Введите цену";
    if (!formData.category) newErrors.category = "Выберите категорию";
    if (!formData.dormitory) newErrors.dormitory = "Выберите общежитие";

    // Validate price format
    if (formData.price && !/^\d+$/.test(formData.price.replace(/\s/g, ""))) {
      newErrors.price = "Цена должна содержать только цифры";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext?.(formData);
    }
  };

  const formatPrice = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handlePriceChange = (value: string) => {
    const formatted = formatPrice(value);
    handleInputChange("price", formatted);
  };

  const getConditionBadge = (condition: ItemCondition) => {
    switch (condition) {
      case "new":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Новое
          </Badge>
        );
      case "used":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Б/у
          </Badge>
        );
      case "damaged":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            Требует ремонта
          </Badge>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Подать объявление
        </h1>
        <p className="text-muted-foreground">Шаг 1 из 2: Основная информация</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="FileText" size={20} />
            Описание товара
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Название объявления *</Label>
              <Input
                id="title"
                placeholder="Например: iPhone 14 Pro 128GB Space Black"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Описание *</Label>
              <Textarea
                id="description"
                placeholder="Расскажите подробнее о товаре: состояние, особенности, причина продажи..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Цена *</Label>
              <div className="relative">
                <Input
                  id="price"
                  placeholder="25000"
                  value={formData.price}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className={`pr-12 ${errors.price ? "border-red-500" : ""}`}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  ₽
                </span>
              </div>
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            {/* Category and Subcategory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Категория *</Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Подкатегория</Label>
                <Select
                  value={formData.subcategory}
                  onValueChange={(value) =>
                    handleInputChange("subcategory", value)
                  }
                  disabled={!selectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите подкатегорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory &&
                      categories
                        .find((cat) => cat.name === selectedCategory)
                        ?.subcategories.map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dormitory */}
            <div className="space-y-2">
              <Label>Общежитие *</Label>
              <Select
                value={formData.dormitory}
                onValueChange={(value) => handleInputChange("dormitory", value)}
              >
                <SelectTrigger
                  className={errors.dormitory ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Выберите общежитие" />
                </SelectTrigger>
                <SelectContent>
                  {dormitories.map((dorm) => (
                    <SelectItem key={dorm} value={dorm}>
                      {dorm}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.dormitory && (
                <p className="text-sm text-red-500">{errors.dormitory}</p>
              )}
            </div>

            {/* Condition */}
            <div className="space-y-3">
              <Label>Состояние товара *</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {conditions.map((condition) => (
                  <div
                    key={condition.value}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      formData.condition === condition.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() =>
                      handleInputChange(
                        "condition",
                        condition.value as ItemCondition,
                      )
                    }
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{condition.label}</span>
                      {formData.condition === condition.value && (
                        <Icon name="Check" size={16} className="text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {condition.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Отмена
              </Button>
              <Button type="submit" className="flex-1 glow-primary">
                Далее: Добавить фото
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview */}
      {formData.title && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">
              Предварительный просмотр
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                <Icon
                  name="Image"
                  size={24}
                  className="text-muted-foreground"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">
                  {formData.title}
                </h3>
                <p className="text-lg font-semibold text-primary mb-2">
                  {formData.price ? `${formData.price} ₽` : "0 ₽"}
                </p>
                <div className="flex gap-2 mb-2">
                  {formData.category && (
                    <Badge variant="secondary" className="text-xs">
                      {formData.category}
                    </Badge>
                  )}
                  {formData.dormitory && (
                    <Badge variant="outline" className="text-xs">
                      {formData.dormitory}
                    </Badge>
                  )}
                  {getConditionBadge(formData.condition)}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <Icon name="MessageCircle" size={11} className="mr-1" />
                    Написать
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <Icon name="Heart" size={11} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AddListing;
