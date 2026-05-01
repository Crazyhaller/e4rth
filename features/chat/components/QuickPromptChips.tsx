const prompts = [
  'What should I water today?',
  'Why are my leaves yellow?',
  'Create a weekly care routine',
  'How do I improve humidity?',
]

export default function QuickPromptChips({
  onSelect,
}: {
  onSelect: (prompt: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-border/70 bg-card/62 px-3 py-1.5 text-xs text-foreground/70 shadow-soft transition hover:border-primary/40 hover:bg-primary/10 hover:text-foreground hover:cursor-pointer"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}
