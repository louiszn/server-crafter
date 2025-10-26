import { ZodIssue } from 'zod/v3';

declare enum APIRoutePrefix {
    Users = "/users",
    Auth = "/auth"
}
declare enum APIUsersRoute {
    GetAll = "/",
    GetById = "/:userId",
    Current = "/@me"
}
declare enum APICurrentUserRoute {
    Get = "/",
    Modify = "/"
}
declare enum APIAuthRoute {
    Create = "/create",
    Login = "/login",
    RefreshToken = "/refresh",
    Logout = "/logout"
}
declare enum APIRoute {
    GetUserById = "/users/:userId",
    GetAllUsers = "/users/",
    GetCurrentUser = "/users/@me/",
    ModifyCurrentUser = "/users/@me/",
    CreateUser = "/auth/create",
    Login = "/auth/login",
    RefreshToken = "/auth/refresh",
    Logout = "/auth/logout"
}

type FindParam<T extends string> = T extends `:${infer P}` ? P : never;
type SplitBySlash<T extends string> = T extends `${infer First}/${infer Rest}` ? First | SplitBySlash<Rest> : T;
type ExtractPathParams<T extends string> = FindParam<SplitBySlash<T>>;
type HasParams<T extends APIRoute> = ExtractPathParams<T> extends never ? false : true;
type Params<T extends APIRoute> = {
    [K in ExtractPathParams<T>]: string;
};
declare enum RequestMethod {
    Get = "GET",
    Delete = "DELETE",
    Patch = "PATCH",
    Post = "POST",
    Put = "PUT"
}
interface ResponseError {
    code: number;
    error: string | ZodIssue[];
}
type RESTRequestInit = Omit<RequestInit, "method" | "body">;
declare abstract class REST {
    static baseUrl: string;
    static get<T>(endpoint: string, init?: RESTRequestInit): Promise<[null, ResponseError] | [T, null]>;
    static post<T, P>(endpoint: string, payload: P, init?: RESTRequestInit): Promise<[null, ResponseError] | [T, null]>;
    static put<T, P>(endpoint: string, payload: P, init?: RESTRequestInit): Promise<[null, ResponseError] | [T, null]>;
    static patch<T, P>(endpoint: string, payload: P, init?: RESTRequestInit): Promise<[null, ResponseError] | [T, null]>;
    static delete<T>(endpoint: string, init?: RESTRequestInit): Promise<[null, ResponseError] | [T, null]>;
    static request<T, P = unknown>(method: RequestMethod, endpoint: string, payload?: P, init?: RESTRequestInit): Promise<[T, null] | [null, ResponseError]>;
    static makeRequest<T, P = unknown>(method: RequestMethod, endpoint: string, payload?: P, init?: RESTRequestInit): Promise<[T, null] | [null, ResponseError]>;
    private static refreshToken;
    static useRoute<T extends APIRoute>(endpoint: T, ...args: HasParams<T> extends false ? [] : [params: Params<T>]): string;
    static useRoute<T extends APIRoute>(endpoint: T, params: Params<T>): string;
    static getAccessToken(): string | null;
    static removeAccessToken(): void;
    static setAccessToken(token: string, remember?: boolean): void;
    private static getJSONResponse;
}

interface APILoginResponse {
	accessToken: string;
}

interface APIRefreshTokenResponse {
	accessToken: string;
}

interface APIUser {
	id: string;
	email: string;
	createdAt: number;
}

export { APIAuthRoute, APICurrentUserRoute, type APILoginResponse, type APIRefreshTokenResponse, APIRoute, APIRoutePrefix, type APIUser, APIUsersRoute, type Params, REST, type RESTRequestInit, RequestMethod, type ResponseError };
