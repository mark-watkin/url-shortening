import { Url, UrlCreateRequest } from "../models/ulr";

export async function getUrls(): Promise<Url[]> {
    const response = await fetch('http://api.pbid.localhost/urls');
    return await response.json() as Promise<Url[]>;
}

export async function postUrl(createRequest: UrlCreateRequest): Promise<Url> {
    const response = await fetch('http://api.pbid.localhost/urls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createRequest) 
    });
    return await response.json() as Promise<Url>;
}