import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PdfViewerProps } from "./types";

const PdfViewer = ({ catalogId, onClose }: PdfViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (catalogId) {
      loadPdf();
    }
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [catalogId]);

  const loadPdf = async () => {
    if (!catalogId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://functions.poehali.dev/dba10cc1-2227-43d6-bfdc-130bb8e4bc14?id=${catalogId}`);
      
      if (!response.ok) {
        throw new Error('Failed to load PDF');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError('Не удалось загрузить PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={catalogId !== null} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Просмотр каталога</DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
                <p className="text-muted-foreground">Загрузка PDF...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-destructive" />
                <p className="text-destructive">{error}</p>
                <Button onClick={loadPdf} className="mt-4">
                  Повторить попытку
                </Button>
              </div>
            </div>
          )}

          {pdfUrl && !loading && !error && (
            <iframe
              src={pdfUrl}
              className="w-full h-full rounded border"
              title="PDF Preview"
            />
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;
