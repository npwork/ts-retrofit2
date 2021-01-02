import {
  ApiResponse,
  BasePath,
  BaseService,
  Body,
  Field,
  FieldMap,
  FormUrlEncoded,
  POST,
  STUB_RESPONSE,
} from "../../src";
import { API_PREFIX, Post } from "./fixtures";

@BasePath(API_PREFIX)
export class FormUrlEncodedService extends BaseService {
  @POST("/form-url-encoded")
  @FormUrlEncoded
  async formUrlEncoded(
    @Field("param1") param1: number,
    @Field("param2") param2: string,
    @Field("param3") param3: boolean,
  ): ApiResponse<Post> {
    return STUB_RESPONSE();
  }

  @POST("/form-url-encoded")
  @FormUrlEncoded
  async formUrlEncodedWithBody(@Body body: { param1: number; param2: string; param3: boolean }): ApiResponse<Post> {
    return STUB_RESPONSE();
  }

  @POST("/form-url-encoded")
  @FormUrlEncoded
  async formUrlEncodedWithFieldMap(
    @FieldMap body: { param1: number; param2: string; param3: boolean },
  ): ApiResponse<Post> {
    return STUB_RESPONSE();
  }
}