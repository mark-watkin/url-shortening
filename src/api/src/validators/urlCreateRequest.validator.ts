import { UrlCreateRequest } from "../models/ulr";

export class UrlCreateRequestValidator {
    isValid(urlCreateRequest: UrlCreateRequest): boolean {
        const {original} = urlCreateRequest;
        
        try {
            new URL(original);
        } catch(_) {
            return false;
        }

        return true;
    }
}