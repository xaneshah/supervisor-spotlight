import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { StarRating } from './StarRating';
import { addReview } from '@/services/reviewService';
import { toast } from 'sonner';
import { Loader2, Send, EyeOff } from 'lucide-react';
import { Confetti } from '@/components/ui/Confetti';

const reviewSchema = z.object({
  comment: z.string().min(10, 'Review must be at least 10 characters').max(500, 'Review must be under 500 characters'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  teacherId: string;
  onSubmitted: () => void;
}

export function ReviewForm({ teacherId, onSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ratingError, setRatingError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (data: ReviewFormData) => {
    if (rating === 0) {
      setRatingError('Please select a rating');
      return;
    }
    setRatingError('');
    setLoading(true);
    try {
      await addReview({ teacherId, comment: data.comment, rating, isAnonymous });

      // Bro-level hype trigger
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);

      toast.success('Review submitted successfully!');
      reset();
      setRating(0);
      onSubmitted();
    } catch {
      toast.error('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Your Rating</label>
          <StarRating value={rating} onChange={(v) => { setRating(v); setRatingError(''); }} />
          <AnimatePresence>
            {ratingError && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-xs text-destructive">
                {ratingError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="comment">Your Review</label>
          <textarea
            id="comment"
            {...register('comment')}
            placeholder="Share your experience with this supervisor..."
            rows={4}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />
          {errors.comment && (
            <p className="mt-1 text-xs text-destructive">{errors.comment.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsAnonymous(!isAnonymous)}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <div className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${isAnonymous ? 'bg-primary' : 'bg-secondary'}`}>
              <motion.div
                className="h-4 w-4 rounded-full bg-foreground"
                animate={{ x: isAnonymous ? 16 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </div>
            <EyeOff size={14} />
            Post Anonymously
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            Submit Review
          </button>
        </div>
      </form>
    </>
  );
}
