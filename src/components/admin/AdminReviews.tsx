import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

interface Review {
  id: number;
  company: string;
  author: string;
  position: string;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

interface AdminReviewsProps {
  reviews: Review[];
  onRefresh: () => void;
}

const AdminReviews = ({ reviews, onRefresh }: AdminReviewsProps) => {
  const [actionPassword, setActionPassword] = useState<{ [key: number]: string }>({});
  const [processing, setProcessing] = useState<number | null>(null);

  const handleAction = async (reviewId: number, action: 'approve' | 'reject' | 'delete') => {
    const password = actionPassword[reviewId];
    
    if (!password) {
      alert('Введите пароль для выполнения действия');
      return;
    }

    setProcessing(reviewId);

    try {
      const response = await fetch('https://functions.poehali.dev/8ec434e3-42fe-4a2d-9999-c2993fdf0456', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reviewId, action, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Действие выполнено');
        setActionPassword({ ...actionPassword, [reviewId]: '' });
        onRefresh();
      } else {
        alert(data.error || 'Ошибка выполнения');
      }
    } catch (error) {
      alert('Ошибка выполнения действия');
    } finally {
      setProcessing(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { text: 'На модерации', color: 'bg-yellow-100 text-yellow-800' },
      approved: { text: 'Одобрен', color: 'bg-green-100 text-green-800' },
      rejected: { text: 'Отклонен', color: 'bg-red-100 text-red-800' }
    };
    
    const badge = badges[status as keyof typeof badges] || badges.pending;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const pendingReviews = reviews.filter(r => r.status === 'pending');
  const approvedReviews = reviews.filter(r => r.status === 'approved');
  const rejectedReviews = reviews.filter(r => r.status === 'rejected');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Clock" size={20} className="text-yellow-500" />
            <p className="text-sm text-muted-foreground">На модерации</p>
          </div>
          <p className="text-2xl font-bold">{pendingReviews.length}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="CheckCircle" size={20} className="text-green-500" />
            <p className="text-sm text-muted-foreground">Одобрено</p>
          </div>
          <p className="text-2xl font-bold">{approvedReviews.length}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="XCircle" size={20} className="text-red-500" />
            <p className="text-sm text-muted-foreground">Отклонено</p>
          </div>
          <p className="text-2xl font-bold">{rejectedReviews.length}</p>
        </Card>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card className="p-8 text-center">
            <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Отзывов пока нет</p>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{review.company}</h3>
                    {getStatusBadge(review.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.author} • {review.position}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(review.created_at).toLocaleString('ru-RU')}
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg mb-4">
                <p className="text-foreground/90">{review.text}</p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Input
                  type="password"
                  placeholder="Пароль для действия"
                  value={actionPassword[review.id] || ''}
                  onChange={(e) => setActionPassword({ ...actionPassword, [review.id]: e.target.value })}
                  className="max-w-xs"
                  disabled={processing === review.id}
                />
                
                {review.status !== 'approved' && (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleAction(review.id, 'approve')}
                    disabled={processing === review.id}
                    className="gap-1"
                  >
                    <Icon name="Check" size={16} />
                    Одобрить
                  </Button>
                )}
                
                {review.status !== 'rejected' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(review.id, 'reject')}
                    disabled={processing === review.id}
                    className="gap-1"
                  >
                    <Icon name="X" size={16} />
                    Отклонить
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleAction(review.id, 'delete')}
                  disabled={processing === review.id}
                  className="gap-1 ml-auto"
                >
                  <Icon name="Trash2" size={16} />
                  Удалить
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
