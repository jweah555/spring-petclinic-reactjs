import { isNotFound } from '../api/client.ts'

interface QueryStatusProps {
  isPending: boolean
  error: Error | null
  what: string
}

/** Standard loading / error message for a page waiting on a query. Renders nothing once data is ready. */
export default function QueryStatus({ isPending, error, what }: QueryStatusProps) {
  if (error) {
    return <p className="error">{isNotFound(error) ? `${what} not found.` : `Could not load ${what.toLowerCase()}: ${error.message}`}</p>
  }
  if (isPending) return <p>Loading {what.toLowerCase()}…</p>
  return null
}
