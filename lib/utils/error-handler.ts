interface ErrorContext {
  component?: string
  action?: string
  userId?: string
  metadata?: Record<string, any>
}

export class AppError extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly context?: ErrorContext
  public readonly timestamp: Date

  constructor(message: string, code = "UNKNOWN_ERROR", statusCode = 500, context?: ErrorContext) {
    super(message)
    this.name = "AppError"
    this.code = code
    this.statusCode = statusCode
    this.context = context
    this.timestamp = new Date()

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}

export class ErrorHandler {
  private static instance: ErrorHandler
  private errorLog: AppError[] = []

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler()
    }
    return ErrorHandler.instance
  }

  handle(error: Error | AppError, context?: ErrorContext): void {
    const appError = error instanceof AppError ? error : this.convertToAppError(error, context)

    // Log the error
    this.logError(appError)

    // Store in memory (in production, you'd send to a service like Sentry)
    this.errorLog.push(appError)

    // Keep only last 100 errors in memory
    if (this.errorLog.length > 100) {
      this.errorLog = this.errorLog.slice(-100)
    }

    // In development, also log to console
    if (process.env.NODE_ENV === "development") {
      console.error("🚨 Application Error:", {
        message: appError.message,
        code: appError.code,
        statusCode: appError.statusCode,
        context: appError.context,
        stack: appError.stack,
      })
    }
  }

  private convertToAppError(error: Error, context?: ErrorContext): AppError {
    // Convert common errors to AppErrors with appropriate codes
    if (error.message.includes("fetch")) {
      return new AppError(error.message, "NETWORK_ERROR", 503, context)
    }

    if (error.message.includes("unauthorized") || error.message.includes("401")) {
      return new AppError(error.message, "UNAUTHORIZED", 401, context)
    }

    if (error.message.includes("not found") || error.message.includes("404")) {
      return new AppError(error.message, "NOT_FOUND", 404, context)
    }

    return new AppError(error.message, "UNKNOWN_ERROR", 500, context)
  }

  private logError(error: AppError): void {
    // In production, you'd send this to your logging service
    const logEntry = {
      timestamp: error.timestamp.toISOString(),
      level: "ERROR",
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      context: error.context,
      stack: error.stack,
    }

    // For now, just console.error in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error Log:", logEntry)
    }

    // In production, you might do:
    // await sendToLoggingService(logEntry)
  }

  getRecentErrors(limit = 10): AppError[] {
    return this.errorLog.slice(-limit).reverse()
  }

  getErrorStats() {
    const now = new Date()
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    const errorsLastHour = this.errorLog.filter((error) => error.timestamp > oneHourAgo)
    const errorsLastDay = this.errorLog.filter((error) => error.timestamp > oneDayAgo)

    const errorsByCode = this.errorLog.reduce(
      (acc, error) => {
        acc[error.code] = (acc[error.code] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      total: this.errorLog.length,
      lastHour: errorsLastHour.length,
      lastDay: errorsLastDay.length,
      byCode: errorsByCode,
      mostCommon: Object.entries(errorsByCode)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5),
    }
  }

  clearErrors(): void {
    this.errorLog = []
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance()

// Utility functions for common error scenarios
export const handleAsyncError = async <T>(\
  promise: Promise<T>,
  context?: ErrorContext,
)
: Promise<[T | null, AppError | null]> =>
{
  try {
    const result = await promise
    return [result, null]
  } catch (error) {
    const appError =
      error instanceof AppError ? error : new AppError((error as Error).message, "ASYNC_ERROR", 500, context)
    errorHandler.handle(appError)
    return [null, appError]
  }
}

export const createErrorBoundary = (component: string) => {
  return (error: Error, errorInfo: any) => {
    errorHandler.handle(error, {
      component,
      metadata: { errorInfo },
    })
  }
}
