export interface Url {
    id: number;
    original: string;
    shortened: string;
}

export interface UrlCreateRequest {
    original: string;
}