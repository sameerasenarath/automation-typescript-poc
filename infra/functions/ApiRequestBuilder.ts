import { RequestType } from './RequestType';

export class ApiRequestBuilder {
    description: string | null = null;
    requestType: RequestType | null = null;
    contentType: string | null = null;
    body: any = null;
    url: string | null = null;
    queryParams: Map<string, string[]> | null = null; // MultiValuedMap equivalent in TypeScript
    basicAuth: Map<string, string> | null = null;
    headers: Map<string, string> | null = null;
    formData: Map<string, any[]> | null = null; // MultiValuedMap equivalent in TypeScript
    multiParts: Map<string, any> | null = null;
    followRedirect: boolean = true;
    expectedResponseCode: number = 200;

    constructor() {
        // Default values are already set above
    }

    public setDescription(description: string): ApiRequestBuilder {
        this.description = description;
        return this;
    }

    public setRequestType(requestType: RequestType): ApiRequestBuilder {
        this.requestType = requestType;
        return this;
    }

    public setContentType(contentType: string): ApiRequestBuilder {
        this.contentType = contentType;
        return this;
    }

    public setBody(body: any): ApiRequestBuilder {
        this.body = body;
        return this;
    }

    public setUrl(url: string): ApiRequestBuilder {
        this.url = url;
        return this;
    }

    public setQueryParams(queryParams: Map<string, string[]>): ApiRequestBuilder {
        this.queryParams = queryParams;
        return this;
    }

    public setBasicAuth(basicAuth: Map<string, string>): ApiRequestBuilder {
        this.basicAuth = basicAuth;
        return this;
    }

    public setHeaders(headers: Map<string, string>): ApiRequestBuilder {
        this.headers = headers;
        return this;
    }

    public setFormData(formData: Map<string, any[]>): ApiRequestBuilder {
        this.formData = formData;
        return this;
    }

    public setMultiParts(multiParts: Map<string, any>): ApiRequestBuilder {
        this.multiParts = multiParts;
        return this;
    }

    public setFollowRedirect(followRedirect: boolean): ApiRequestBuilder {
        this.followRedirect = followRedirect;
        return this;
    }

    public setExpectedResponseCode(expectedResponseCode: number): ApiRequestBuilder {
        this.expectedResponseCode = expectedResponseCode;
        return this;
    }
}