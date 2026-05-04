interface ObReviewCardProps {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}

export function ObReviewCard({ title, onEdit, children }: ObReviewCardProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-5">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-[14px] font-semibold text-[var(--text)] m-0">{title}</h4>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-[12px] font-medium text-[var(--brand)] bg-none border-none cursor-pointer font-[inherit] hover:underline"
          >
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
