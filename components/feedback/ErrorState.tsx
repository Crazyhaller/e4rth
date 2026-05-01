export default function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: {
  title?: string
  message: string
  onRetry?: () => void
}) {
  return (
    <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-5 shadow-soft">
      <h2 className="font-semibold text-red-500 dark:text-red-300">{title}</h2>
      <p className="mt-1 text-sm text-red-700/80 dark:text-red-100/80">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-full bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600 hover:cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  )
}
