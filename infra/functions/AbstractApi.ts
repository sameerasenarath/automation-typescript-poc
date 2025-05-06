/*
import { APIRequest, APIRequestContext, APIResponse, Playwright, RequestOptions, FilePayload, FormData } from 'playwright';
import { ApiRequestBuilder } from './ApiRequestBuilder';
import { RequestType } from './RequestType';

export abstract class AbstractApi {
    protected playwright: Playwright;
    protected request: APIRequest;
    protected requestContext: APIRequestContext | null = null; // Initialize as null

    constructor() {
        this.playwright = require('playwright').create();
        this.request = this.playwright.request;
        this.initialize();
    }

    // Async method to initialize requestContext
    public async initialize(): Promise<void> {
        this.requestContext = await this.request.newContext();
    }

    protected async sendRequest(apiRequestBuilder: ApiRequestBuilder, /!*requestOptions: RequestOptions*!/): Promise<APIResponse> {
        if (!this.requestContext) {
            throw new Error('Request context is not initialized. Call initialize() first.');
        }

        let response: APIResponse | null = null;
        switch (apiRequestBuilder.requestType) {
            case RequestType.GET:
                if (apiRequestBuilder.url != null) {
                    response = await this.requestContext.get(apiRequestBuilder.url, requestOptions);
                }
                break;
            case RequestType.POST:
                if (apiRequestBuilder.url != null) {
                    response = await this.requestContext.post(apiRequestBuilder.url, requestOptions);
                }
                break;
            case RequestType.DELETE:
                if (apiRequestBuilder.url != null) {
                    response = await this.requestContext.delete(apiRequestBuilder.url, requestOptions);
                }
                break;
            default:
                throw new Error(`Unexpected value: ${apiRequestBuilder.requestType}`);
        }
        if (response === null) {
            throw new Error('Failed to get a valid API response. The response is null.');
        }
        return response;
    }

    /!*protected async sendRequest(apiRequestBuilder: ApiRequestBuilder): Promise<APIResponse> {
        if (!this.requestContext) {
            throw new Error('Request context is not initialized. Call initialize() first.');
        }

       // this.report(`${apiRequestBuilder.description} - sending ${apiRequestBuilder.requestType} request to: '${apiRequestBuilder.url}' - expected response code: ${apiRequestBuilder.expectedResponseCode}`);

        const requestOptions: RequestOptions = RequestOptions.create();
        const formData: FormData = FormData.create();

        if (apiRequestBuilder.headers && apiRequestBuilder.headers.size > 0) {
            for (const [key, value] of apiRequestBuilder.headers.entries()) {
                requestOptions.setHeader(key, value);
            }
        }

        if (apiRequestBuilder.queryParams && apiRequestBuilder.queryParams.size > 0) {
            for (const [key, value] of apiRequestBuilder.queryParams.entries()) {
                requestOptions.setQueryParam(key, value);
            }
        }

        if (apiRequestBuilder.formData && apiRequestBuilder.formData.size > 0) {
            for (const [key, value] of apiRequestBuilder.formData.entries()) {
                if (typeof value === 'string') {
                    formData.set(key, value);
                } else if (typeof value === 'boolean') {
                    formData.set(key, value);
                } else if (typeof value === 'number') {
                    formData.set(key, value);
                } else if (value instanceof Path) {
                    formData.set(key, value);
                } else {
                    formData.set(key, value as FilePayload);
                }
            }
            requestOptions.setForm(formData);
        }

        if (apiRequestBuilder.multiParts && apiRequestBuilder.multiParts.size > 0) {
            for (const [key, value] of apiRequestBuilder.multiParts.entries()) {
                if (typeof value === 'string') {
                    formData.set(key, value);
                } else if (typeof value === 'boolean') {
                    formData.set(key, value);
                } else if (typeof value === 'number') {
                    formData.set(key, value);
                } else if (value instanceof Path) {
                    formData.set(key, value);
                } else {
                    formData.set(key, value as FilePayload);
                }
            }
            requestOptions.setMultipart(formData);
        }

        if (apiRequestBuilder.body) {
            requestOptions.setData(apiRequestBuilder.body);
            this.report(`API Request body: ${JSON.stringify(apiRequestBuilder.body)}`);
        }

        const apiResponse: APIResponse = this.sendRequest(apiRequestBuilder, requestOptions);
        if (apiResponse.status() !== apiRequestBuilder.expectedResponseCode || apiResponse.status() === 500) {
            let responseBody: string = await apiResponse.text();
            if (responseBody.includes('html')) {
                responseBody = `<xmp>${responseBody}</xmp>`;
            }
            throw new Error(`Response code for ${apiRequestBuilder.requestType} request to '${apiRequestBuilder.url}' is ${apiResponse.status()}.\nResponse body: ${responseBody}`);
        } else {
            this.report(`Response code for ${apiRequestBuilder.requestType} request to '${apiRequestBuilder.url}' is ${apiRequestBuilder.expectedResponseCode}`);
        }
        return apiResponse;
    }*!/
}*/
