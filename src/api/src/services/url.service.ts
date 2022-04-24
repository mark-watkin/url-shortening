import { Url, UrlCreateRequest } from "../models/ulr";
import { UrlRepository } from "../repositories/url.repository";
import { UrlCreateRequestValidator } from "../validators/urlCreateRequest.validator";
import { SequenceService } from "./sequence.service";
import { ShortCodeService } from "./shortCode.service";

const SEQUENCE_NAME = 'short-code-sequence';

export class UrlService {
    _shortCodeService: ShortCodeService;
    _sequenceService: SequenceService;
    _urlRepository: UrlRepository;
    _urlCreateRequestValidator: UrlCreateRequestValidator;

    constructor(
        shortCodeService: ShortCodeService = new ShortCodeService(), 
        sequenceService: SequenceService = new SequenceService(),
        urlRepository: UrlRepository = new UrlRepository(),
        urlCreateRequestValidator: UrlCreateRequestValidator = new UrlCreateRequestValidator()
    ) {
        this._shortCodeService = shortCodeService;
        this._sequenceService = sequenceService;
        this._urlRepository = urlRepository;
        this._urlCreateRequestValidator = urlCreateRequestValidator
    }

    async create(createRequest: UrlCreateRequest): Promise<Url> {
        if (!this._urlCreateRequestValidator.isValid(createRequest)) {
            throw Error('Create url request is invalid');
        }

        const { original } = createRequest;
        const id = await this._sequenceService.getNext(SEQUENCE_NAME);
        
        const shortCode = this._shortCodeService.encode(id);
        const shortened = `https://pbid.io/${shortCode}`;

        const newUrl = {
            id,
            original,
            shortened
        } as Url;

        await this._urlRepository.addUrl(newUrl);
        return newUrl;
    }
}