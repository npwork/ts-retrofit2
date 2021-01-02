import { ResponseInterceptor, ResponseInterceptorFunction } from "../../../src";
import { ServiceBuilder } from "../../../src/service.builder";
import { AxiosResponse } from "axios";
import { testServer } from "../../testHelpers";
import { PostsApiService } from "../../fixture/fixtures";

describe("Response interceptors", () => {
  const interceptedHeaderValue = 100;

  test("ResponseInterceptorFunction", async () => {
    const interceptor = <T>(value: AxiosResponse<T>) => {
      value.data["INTERCEPTOR"] = interceptedHeaderValue;
      return value;
    };

    await verifyInterceptor((b) => b.setResponseInterceptors(interceptor));
  });

  test("ResponseInterceptor class", async () => {
    class Interceptor<T> extends ResponseInterceptor<T> {
      onRejected(error: Error): void {}

      onFulfilled(value: AxiosResponse<T>): AxiosResponse<T> | Promise<AxiosResponse<T>> {
        value.data["INTERCEPTOR"] = interceptedHeaderValue;
        return value;
      }
    }

    await verifyInterceptor((b) => b.setResponseInterceptors(new Interceptor()));
  });

  describe("onRejected", () => {
    test("Override onRejected", async () => {
      let calledRejected = false;

      class Interceptor<T> extends ResponseInterceptor<T> {
        onRejected(error: Error): void {
          calledRejected = true;
        }

        onFulfilled(value: AxiosResponse<T>): AxiosResponse<T> | Promise<AxiosResponse<T>> {
          return value;
        }
      }

      const interceptor = new Interceptor();
      const spy = jest.spyOn(interceptor, "onRejected");

      const service = new ServiceBuilder()
        .baseUrl(testServer.url)
        .setResponseInterceptors(interceptor)
        .setStandalone(true)
        .build(PostsApiService);

      await service.wrongUrl();

      expect(spy).toHaveBeenCalled();
      expect(calledRejected).toBeTruthy();
    });

    test("No override", async () => {
      class Interceptor<T> extends ResponseInterceptor<T> {
        onFulfilled(value: AxiosResponse<T>): AxiosResponse<T> | Promise<AxiosResponse<T>> {
          return value;
        }
      }

      const interceptor = new Interceptor();
      const spy = jest.spyOn(interceptor, "onRejected");

      const service = new ServiceBuilder()
        .baseUrl(testServer.url)
        .setStandalone(true)
        .setResponseInterceptors(interceptor)
        .build(PostsApiService);

      await service.wrongUrl();

      expect(spy).toHaveBeenCalled();
    });
  });

  async function verifyInterceptor(setInterceptor: (builder: ServiceBuilder) => void) {
    const builder = new ServiceBuilder().baseUrl(testServer.url).setStandalone(true);

    setInterceptor(builder);

    const service = builder.build(PostsApiService);

    const result = await service.get();

    expect(result.data["INTERCEPTOR"]).toBe(interceptedHeaderValue);
  }
});