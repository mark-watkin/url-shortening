import { UrlCreateRequest } from "../../src/models/ulr";
import { UrlRepository } from "../../src/repositories/url.repository";
import { SequenceService } from "../../src/services/sequence.service";
import { ShortCodeService } from "../../src/services/shortCode.service";
import { UrlService } from "../../src/services/url.service";

describe.each([
    ['https://google.com/hello/how/are/you', 'https://pbid.io/12345678'],
    ['https://google.com:3000/hello/how/are/you', 'https://pbid.io/12345678'],
    ['http://google.com', 'https://pbid.io/12345678']
])('Given a valid url create request', (original, expected) => {
    const expectedId = 56;
    const expectedShortCode = '12345678';

    const shortCodeService = new ShortCodeService();
    const shortCodeServiceMock = jest.spyOn(shortCodeService, 'encode');
    shortCodeServiceMock.mockReturnValue(expectedShortCode);

    const sequenceService = new SequenceService();
    const sequenceServiceMock = jest.spyOn(sequenceService, 'getNext');
    sequenceServiceMock.mockImplementation(() => Promise.resolve(expectedId));

    const urlRepository = new UrlRepository();
    const urlRepositoryMock = jest.spyOn(urlRepository, 'addUrl');
    urlRepositoryMock.mockImplementation(() => Promise.resolve());
    
    const urlCreateRequest = { original: original } as UrlCreateRequest;

    describe('When the url is created', () => {
        const urlService = new UrlService(shortCodeService, sequenceService, urlRepository);
        const responsePromise = urlService.create(urlCreateRequest);

        test('Then the created url is returned', async () => {
            const response = await responsePromise;
            expect(response.original).toEqual(urlCreateRequest.original);
            expect(response.shortened).toEqual(expected);
            expect(response.id).toEqual(expectedId);
        });
    });
});

describe('Given an invalid url create request', () => {    
    const urlCreateRequest = { original: 'hello/how/are/you' } as UrlCreateRequest;
    describe('When the url is created', () => {
        const urlService = new UrlService();
        test('Then an error is thrown', async () => {
            await expect(async () => await urlService.create(urlCreateRequest)).rejects.toThrow('Create url request is invalid');
        });
    });
});