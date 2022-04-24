import { UrlCreateRequest } from "../../src/models/ulr";
import { UrlCreateRequestValidator } from "../../src/validators/urlCreateRequest.validator";

describe('Given a valid create request ', () => {
    const createRequest = { original: 'https://pbid.io/hello/how/are/you' } as UrlCreateRequest;
    describe('When validate is called', () => {
        const urlValidator = new UrlCreateRequestValidator();
        const response = urlValidator.isValid(createRequest);
        test('Then the result is valid', () => {
            expect(response).toEqual(true);
        });
    });
});

describe.each([
    ['hello/how/are/you']
])('Given an invalid create request with base %s and original %s', (original) => {
    const createRequest = { original } as UrlCreateRequest;
    describe('When validate is called', () => {
        const urlValidator = new UrlCreateRequestValidator();
        const response = urlValidator.isValid(createRequest);
        test('Then the result is invalid', () => {
            expect(response).toEqual(false);
        });
    });
});
