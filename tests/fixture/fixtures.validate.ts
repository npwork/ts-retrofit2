import { ApiResponse, BasePath, BaseService, GET, Path, ConvertTo, STUB_RESPONSE } from "../../src";
import { PostsApiService } from "./fixtures";
import { IsNegative, IsPositive, MinLength } from "class-validator";

export class ValidationPass {
  @IsPositive()
  id = -1;

  @MinLength(1)
  body = "";

  @IsPositive()
  userId = -1;

  methodInside() {
    return this.id;
  }
}

export class ValidationFailsOneField {
  id = -1;

  @MinLength(100)
  body = "";

  userId = -1;

  methodInside() {
    return this.id;
  }
}

export class ValidationFailsTwoFields {
  id = -1;

  @MinLength(100)
  body = "";

  @IsNegative()
  userId = -1;

  methodInside() {
    return this.id;
  }
}

@BasePath(PostsApiService.BASE_PATH)
export class ValidationPassService extends BaseService {
  @GET("/")
  @ConvertTo(ValidationPass)
  async getAll(): ApiResponse<ValidationPass[]> {
    return STUB_RESPONSE();
  }

  @GET("/{id}")
  @ConvertTo(ValidationPass)
  async single(@Path("id") id: number): ApiResponse<ValidationPass> {
    return STUB_RESPONSE();
  }
}

@BasePath(PostsApiService.BASE_PATH)
export class ValidationPassServiceInlinedResponse extends BaseService {
  @GET("/")
  @ConvertTo(ValidationPass)
  async getAll(): Promise<ValidationPass[]> {
    return STUB_RESPONSE();
  }

  @GET("/{id}")
  @ConvertTo(ValidationPass)
  async single(@Path("id") id: number): Promise<ValidationPass> {
    return STUB_RESPONSE();
  }
}

@BasePath(PostsApiService.BASE_PATH)
export class ValidationFailService extends BaseService {
  @GET("/not-found2222", ValidationFailsOneField, { ignoreBasePath: true })
  async wrongUrlAndOneField(): ApiResponse<ValidationFailsOneField[]> {
    return STUB_RESPONSE();
  }

  @GET("/")
  @ConvertTo(ValidationFailsOneField)
  async array(): ApiResponse<ValidationFailsOneField[]> {
    return STUB_RESPONSE();
  }

  @GET("/")
  @ConvertTo(ValidationFailsTwoFields)
  async arrayTwoFields(): ApiResponse<ValidationFailsTwoFields[]> {
    return STUB_RESPONSE();
  }

  @GET("/{id}")
  @ConvertTo(ValidationFailsOneField)
  async singleOneField(@Path("id") id: number): ApiResponse<ValidationFailsOneField> {
    return STUB_RESPONSE();
  }

  @GET("/{id}")
  @ConvertTo(ValidationFailsTwoFields)
  async singleTwoFields(@Path("id") id: number): ApiResponse<ValidationFailsTwoFields> {
    return STUB_RESPONSE();
  }
}

@BasePath(PostsApiService.BASE_PATH)
export class ValidationFailServiceInlinedBody extends BaseService {
  @GET("/")
  @ConvertTo(ValidationFailsOneField)
  async array(): Promise<ValidationFailsOneField[]> {
    return STUB_RESPONSE();
  }

  @GET("/")
  @ConvertTo(ValidationFailsTwoFields)
  async arrayTwoFields(): Promise<ValidationFailsTwoFields[]> {
    return STUB_RESPONSE();
  }

  @GET("/{id}")
  @ConvertTo(ValidationFailsOneField)
  async singleOneField(@Path("id") id: number): Promise<ValidationFailsOneField> {
    return STUB_RESPONSE();
  }

  @GET("/{id}")
  @ConvertTo(ValidationFailsTwoFields)
  async singleTwoFields(@Path("id") id: number): Promise<ValidationFailsTwoFields> {
    return STUB_RESPONSE();
  }
}
