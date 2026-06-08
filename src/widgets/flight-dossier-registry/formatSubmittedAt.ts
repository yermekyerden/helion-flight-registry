export function formatSubmittedAt(submittedAt: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(submittedAt));
}
