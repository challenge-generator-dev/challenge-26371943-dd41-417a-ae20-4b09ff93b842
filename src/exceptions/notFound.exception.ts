import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {
    public readonly resourceType: string;
    public readonly resourceIdentifier: string | number;

    constructor(
        resourceType: string,
        resourceIdentifier: string | number,
        message?: string
    ) {
        const defaultMessage = message || `${resourceType} con identificador '${resourceIdentifier}' no encontrado`;
        super(defaultMessage, 404, "NOT_FOUND");
        
        this.resourceType = resourceType;
        this.resourceIdentifier = resourceIdentifier;
    }

    public static forProduct(id: string): NotFoundException {
        return new NotFoundException("Producto", id);
    }

    public static forResource(resourceType: string, identifier: string | number): NotFoundException {
        return new NotFoundException(resourceType, identifier);
    }

    public toJSON(): Record<string, unknown> {
        return {
            error: this.message,
            statusCode: this.statusCode,
            errorCode: this.errorCode,
            timestamp: this.timestamp,
            resource: {
                type: this.resourceType,
                identifier: this.resourceIdentifier
            }
        };
    }

    public static isNotFoundException(error: unknown): error is NotFoundException {
        return error instanceof NotFoundException;
    }
}