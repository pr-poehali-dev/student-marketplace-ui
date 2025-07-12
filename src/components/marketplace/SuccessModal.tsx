import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "published" | "stashed";
  onGoToHome?: () => void;
  onGoToMyListings?: () => void;
  onCreateAnother?: () => void;
}

const SuccessModal = ({
  isOpen,
  onClose,
  type,
  onGoToHome,
  onGoToMyListings,
  onCreateAnother,
}: SuccessModalProps) => {
  const isPublished = type === "published";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isPublished
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                <Icon
                  name={isPublished ? "CheckCircle" : "Archive"}
                  size={32}
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">
                  {isPublished
                    ? "Объявление отправлено!"
                    : "Объявление сохранено!"}
                </h2>
                <p className="text-sm text-muted-foreground text-center">
                  {isPublished
                    ? "Ваше объявление отправлено на модерацию и будет опубликовано после проверки"
                    : "Объявление сохранено в стеше. Вы можете опубликовать его позже"}
                </p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status Information */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Статус:</span>
              {isPublished ? (
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                  <Icon name="Clock" size={12} className="mr-1" />
                  На модерации
                </Badge>
              ) : (
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  <Icon name="Archive" size={12} className="mr-1" />В стеше
                </Badge>
              )}
            </div>

            {isPublished && (
              <div className="text-sm text-muted-foreground space-y-1">
                <p>⏱️ Время модерации: обычно до 24 часов</p>
                <p>📧 Уведомление придет на почту</p>
                <p>🔔 Также появится в уведомлениях</p>
              </div>
            )}

            {!isPublished && (
              <div className="text-sm text-muted-foreground space-y-1">
                <p>📝 Объявление доступно для редактирования</p>
                <p>🚀 Можно опубликовать в любое время</p>
                <p>👀 Видно только вам в разделе "В стеше"</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Что дальше?</h4>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onGoToMyListings}
                className="justify-start"
              >
                <Icon name="List" size={14} className="mr-2" />
                Перейти к моим объявлениям
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onCreateAnother}
                className="justify-start"
              >
                <Icon name="Plus" size={14} className="mr-2" />
                Создать еще одно объявление
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onGoToHome}
                className="justify-start"
              >
                <Icon name="Home" size={14} className="mr-2" />
                Вернуться на главную
              </Button>
            </div>
          </div>

          {/* Primary Action */}
          <div className="pt-2">
            <Button onClick={onGoToHome} className="w-full glow-primary">
              Готово
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
