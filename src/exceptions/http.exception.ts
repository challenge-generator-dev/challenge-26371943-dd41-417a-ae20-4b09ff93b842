export class HttpException extends Error {
    public readonly statusCode: number;
    public readonly errorCode?: string;
    public readonly timestamp: string;
    public readonly path?: string;

    constructor(
        message: string,
        statusCode: number,
        errorCode?: string,
        details?: unknown
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.timestamp = new Date().toISOString();
        
        if (details !== undefined) {
            this["details"] = details;
        }

        Error.captureStackTrace(this, this.constructor);
    }

    public toJSON(): Record<string, unknown> {
        const response: Record<string, unknown> = {
            error: this.message,
            statusCode: this.statusCode,
            timestamp: this.timestamp
        };

        if (this.errorCode) {
            response.errorCode = this.errorCode;
        }

        if (this.path) {
            response.path = this.path;
        }

        if (this["details"] !== undefined) {
            response.details = this["details"];
        }

        return response;
    }

    public static isHttpException(error: unknown): error is HttpException {
        return error instanceof HttpException;
    }

    protected static formatMessage(defaultMessage: string, customMessage?: string): string {
        return customMessage || defaultMessage;
    }

    protected static getDefaultStatusCode(): number {
        return 500;
    }
}