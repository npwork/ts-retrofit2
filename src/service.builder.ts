import { AxiosInstance } from "axios";
import {
  RequestInterceptor,
  RequestInterceptorFunction,
  ResponseInterceptor,
  ResponseInterceptorFunction,
} from "./baseService";

export class ServiceBuilder {
  private _endpoint = "";
  private _standalone: boolean | AxiosInstance = false;
  private _requestInterceptors: Array<RequestInterceptorFunction | RequestInterceptor> = [];
  private _responseInterceptors: Array<ResponseInterceptorFunction | ResponseInterceptor> = [];
  private _withInlineResponseBody = false;
  private _validate = false;
  private _shouldSaveRequestHistory = false;
  private _timeout = 60000;

  public build<T>(service: new (builder: ServiceBuilder) => T): T {
    return new service(this);
  }

  public baseUrl(endpoint: string): ServiceBuilder {
    this._endpoint = endpoint;
    return this;
  }

  public setStandalone(standalone: boolean | AxiosInstance): ServiceBuilder {
    this._standalone = standalone;
    return this;
  }

  public setValidate(): ServiceBuilder {
    this._validate = true;
    return this;
  }

  public setRequestInterceptors(
    ...interceptors: Array<RequestInterceptorFunction | RequestInterceptor>
  ): ServiceBuilder {
    this._requestInterceptors.push(...interceptors);
    return this;
  }

  public setResponseInterceptors(
    ...interceptors: Array<ResponseInterceptorFunction | ResponseInterceptor>
  ): ServiceBuilder {
    this._responseInterceptors.push(...interceptors);
    return this;
  }

  public setTimeout(timeout: number): ServiceBuilder {
    this._timeout = timeout;
    return this;
  }

  public inlineResponseBody(): ServiceBuilder {
    this._withInlineResponseBody = true;
    return this;
  }

  public saveRequestHistory(): ServiceBuilder {
    this._shouldSaveRequestHistory = true;
    return this;
  }

  get shouldSaveRequestHistory() {
    return this._shouldSaveRequestHistory;
  }

  get withInlineResponseBody(): boolean {
    return this._withInlineResponseBody;
  }

  get shouldValidate(): boolean {
    return this._validate;
  }

  get endpoint(): string {
    return this._endpoint;
  }

  get standalone(): boolean | AxiosInstance {
    return this._standalone;
  }

  get requestInterceptors(): Array<RequestInterceptorFunction | RequestInterceptor> {
    return this._requestInterceptors;
  }

  get responseInterceptors(): Array<ResponseInterceptorFunction | ResponseInterceptor> {
    return this._responseInterceptors;
  }

  get timeout(): number {
    return this._timeout;
  }
}
