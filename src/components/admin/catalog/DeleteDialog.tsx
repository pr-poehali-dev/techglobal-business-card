import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteDialogProps } from "./types";

const DeleteDialog = ({
  show,
  deleting,
  password,
  onPasswordChange,
  onConfirm,
  onCancel
}: DeleteDialogProps) => {
  return (
    <Dialog open={show} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Подтверждение удаления</DialogTitle>
          <DialogDescription>
            Для удаления каталога введите пароль администратора
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Пароль</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Введите пароль"
              disabled={deleting}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onConfirm();
                }
              }}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onCancel} disabled={deleting}>
              Отмена
            </Button>
            <Button 
              variant="destructive" 
              onClick={onConfirm}
              disabled={deleting || !password}
            >
              {deleting ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Удаление...
                </>
              ) : (
                <>
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Удалить
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
