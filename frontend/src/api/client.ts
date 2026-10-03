const API_BASE = '/petclinic/api'

export interface FieldError {
  fieldName: string
  errorMessage: string
}

export class ApiError extends Error {
  status: number
  fieldErrors: FieldError[]

  constructor(status: number, message: string, fieldErrors: FieldError[] = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

// This backend reports validation failures in an `errors` response header (a JSON array),
// not in the response body.
function parseFieldErrors(response: Response): FieldError[] {
  const header = response.headers.get('errors')
  if (!header) return []
  try {
    return JSON.parse(header) as FieldError[]
  } catch {
    return []
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `${method} ${path} failed with status ${response.status}`,
      parseFieldErrors(response),
    )
  }

  return response.json() as Promise<T>
}

export function apiGet<T>(path: string): Promise<T> {
  return request<T>('GET', path)
}

export function apiPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>('POST', path, body)
}
