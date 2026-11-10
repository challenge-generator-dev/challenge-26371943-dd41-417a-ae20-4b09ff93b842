import { HttpException } from "./http.exception";
import { ValidationError } from "class-validator";

export class ValidationException extends HttpException {
    public readonly validationErrors: ValidationError[];
    public readonly formattedErrors: Record<string, string[]>;

    constructor(
        validationErrors: ValidationError[],
        message: string = "Error de validación en los datos proporcionados"
    ) {
        const formatted = ValidationException.formatValidationErrors(validationErrors);
        super(message, 422, "VALIDATION_ERROR", formatted);
        
        this.validationErrors = validationErrors;
        this.formattedErrors = formatted;
    }

    private static formatValidationErrors(errors: ValidationError[]): Record<string, string[]> {
        const formatted: Record<string, string[]> = {};

        for (const error of errors) {
            const property = error.property;
            const constraints = error.constraints;
            
            if (!formatted[property]) {
                formatted[property] = [];
            }

            if (constraints) {
                const messages = Object.values(constraints);
                formatted[property].push(...messages);
            }

            if (error.children && error.children.length > 0) {
                const childErrors = ValidationException.formatValidationErrors(error.children);
                for (const [childProperty, childMessages] of Object.entries(childErrors)) {
                    const fullProperty = `${property}.${childProperty}`;
                    if (!formatted[fullProperty]) {
                        formatted[fullProperty] = [];
                    }
                    formatted[fullProperty].push(...childMessages);
                }
            }
        }

        return formatted;
    }

    public getFirstErrorForProperty(property: string): string | undefined {
        const errors = this.formattedErrors[property];
        return errors && errors.length > 0 ? errors[0] : undefined;
    }

    public hasErrorForProperty(property: string): boolean {
        return !!this.formattedErrors[property] && this.formattedErrors[property].length > 0;
    }

    public getAllErrors(): Array<{ property: string; messages: string[] }> {
        return Object.entries(this.formattedErrors).map(([property, messages]) => ({
            property,
            messages
        }));
    }

    public getErrorCount(): number {
        let count = 0;
        for (const messages of Object.values(this.formattedErrors)) {
            count += messages.length;
        }
        return count;
    }

    public toJSON(): Record<string, unknown> {
        return {
            error: this.message,
            statusCode: this.statusCode,
            errorCode: this.errorCode,
            timestamp: this.timestamp,
            validationErrors: this.formattedErrors,
            totalErrors: this.getErrorCount()
        };
    }
}