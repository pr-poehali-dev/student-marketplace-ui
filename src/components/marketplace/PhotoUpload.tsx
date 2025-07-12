import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface PhotoUploadProps {
  onPublish?: () => void;
  onSaveToStash?: () => void;
  onBack?: () => void;
  formData?: any;
}

const PhotoUpload = ({
  onPublish,
  onSaveToStash,
  onBack,
  formData,
}: PhotoUploadProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxPhotos = 10;

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newPhotos: string[] = [];
    const remainingSlots = maxPhotos - photos.length;
    const filesToProcess = Math.min(files.length, remainingSlots);

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newPhotos.push(e.target.result as string);
            if (newPhotos.length === filesToProcess) {
              setPhotos((prev) => [...prev, ...newPhotos]);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const movePhoto = (fromIndex: number, toIndex: number) => {
    setPhotos((prev) => {
      const newPhotos = [...prev];
      const [moved] = newPhotos.splice(fromIndex, 1);
      newPhotos.splice(toIndex, 0, moved);
      return newPhotos;
    });
  };

  const getConditionBadge = (condition: string) => {
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
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Подать объявление
        </h1>
        <p className="text-muted-foreground">
          Шаг 2 из 2: Добавление фотографий
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Photo Upload Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Camera" size={20} />
                Фотографии товара
                <Badge variant="outline" className="ml-auto">
                  {photos.length}/{maxPhotos}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragOver
                    ? "border-primary bg-primary/5"
                    : photos.length >= maxPhotos
                      ? "border-muted bg-muted/20"
                      : "border-muted-foreground/25 hover:border-primary hover:bg-primary/5"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() =>
                  photos.length < maxPhotos && fileInputRef.current?.click()
                }
              >
                {photos.length < maxPhotos ? (
                  <>
                    <Icon
                      name="Upload"
                      size={32}
                      className="mx-auto text-muted-foreground mb-4"
                    />
                    <h3 className="font-medium text-foreground mb-2">
                      Перетащите фото сюда или нажмите для выбора
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      PNG, JPG до 5МБ. Максимум {maxPhotos} фотографий
                    </p>
                    <Button type="button" variant="outline">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Выбрать файлы
                    </Button>
                  </>
                ) : (
                  <>
                    <Icon
                      name="CheckCircle"
                      size={32}
                      className="mx-auto text-green-500 mb-4"
                    />
                    <h3 className="font-medium text-foreground mb-2">
                      Достигнуто максимальное количество фото
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Удалите ненужные фото для добавления новых
                    </p>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />

              {/* Photo Grid */}
              {photos.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">
                    Загруженные фото
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {photos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-lg overflow-hidden bg-muted"
                      >
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === 0 && (
                          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">
                            Главное фото
                          </Badge>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                          {index > 0 && (
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-7 w-7 p-0"
                              onClick={() => movePhoto(index, index - 1)}
                            >
                              <Icon name="ChevronLeft" size={12} />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-7 w-7 p-0"
                            onClick={() => removePhoto(index)}
                          >
                            <Icon name="Trash2" size={12} />
                          </Button>
                          {index < photos.length - 1 && (
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-7 w-7 p-0"
                              onClick={() => movePhoto(index, index + 1)}
                            >
                              <Icon name="ChevronRight" size={12} />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Первое фото будет использовано как главное. Перетащите или
                    используйте стрелки для изменения порядка.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack} className="flex-1">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Назад
            </Button>
            <Button
              variant="outline"
              onClick={onSaveToStash}
              className="flex-1"
              disabled={photos.length === 0}
            >
              <Icon name="Archive" size={16} className="mr-2" />В стеш
            </Button>
            <Button
              onClick={onPublish}
              className="flex-1 glow-primary"
              disabled={photos.length === 0}
            >
              <Icon name="Send" size={16} className="mr-2" />
              Опубликовать
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Предварительный просмотр</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Main Product Card Preview */}
              <div className="glass-surface rounded-lg overflow-hidden">
                <div className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    {photos.length > 0 ? (
                      <img
                        src={photos[0]}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon
                          name="Image"
                          size={48}
                          className="text-muted-foreground"
                        />
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white h-7 w-7 p-0"
                  >
                    <Icon name="Heart" size={12} />
                  </Button>
                  {photos.length > 1 && (
                    <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                      +{photos.length - 1}
                    </Badge>
                  )}
                </div>

                <div className="p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-foreground text-base line-clamp-2 flex-1">
                      {formData?.title || "Название товара"}
                    </h4>
                    <Icon
                      name="CheckCircle"
                      size={14}
                      className="text-primary flex-shrink-0 ml-1.5"
                    />
                  </div>

                  <p className="text-lg font-semibold text-primary">
                    {formData?.price ? `${formData.price} ₽` : "0 ₽"}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {formData?.category && (
                      <Badge
                        variant="secondary"
                        className="text-xs px-1.5 py-0.5"
                      >
                        {formData.category}
                      </Badge>
                    )}
                    {formData?.dormitory && (
                      <Badge
                        variant="outline"
                        className="text-xs px-1.5 py-0.5"
                      >
                        {formData.dormitory}
                      </Badge>
                    )}
                    {formData?.condition &&
                      getConditionBadge(formData.condition)}
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 mr-1.5 h-7 text-xs"
                    >
                      <Icon name="MessageCircle" size={11} className="mr-1" />
                      Написать
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                      <Icon name="Share" size={11} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Form Data Summary */}
              {formData && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg space-y-2">
                  <h5 className="font-medium text-sm">Информация о товаре:</h5>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <p>
                      <span className="font-medium">Описание:</span>{" "}
                      {formData.description}
                    </p>
                    {formData.subcategory && (
                      <p>
                        <span className="font-medium">Подкатегория:</span>{" "}
                        {formData.subcategory}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Советы для лучших фото
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Icon
                  name="Lightbulb"
                  size={16}
                  className="text-amber-500 mt-0.5"
                />
                <div className="text-sm">
                  <p className="font-medium">Хорошее освещение</p>
                  <p className="text-muted-foreground">
                    Фотографируйте при дневном свете
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Eye" size={16} className="text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Разные ракурсы</p>
                  <p className="text-muted-foreground">
                    Покажите товар с разных сторон
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon
                  name="Focus"
                  size={16}
                  className="text-green-500 mt-0.5"
                />
                <div className="text-sm">
                  <p className="font-medium">Четкость</p>
                  <p className="text-muted-foreground">
                    Следите за резкостью изображения
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
