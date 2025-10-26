// src/enums.ts
var APIRoutePrefix = /* @__PURE__ */ ((APIRoutePrefix2) => {
  APIRoutePrefix2["Users"] = "/users";
  APIRoutePrefix2["Auth"] = "/auth";
  return APIRoutePrefix2;
})(APIRoutePrefix || {});
var APIUsersRoute = /* @__PURE__ */ ((APIUsersRoute2) => {
  APIUsersRoute2["GetAll"] = "/";
  APIUsersRoute2["GetById"] = `/:userId`;
  APIUsersRoute2["Current"] = `/@me`;
  return APIUsersRoute2;
})(APIUsersRoute || {});
var APICurrentUserRoute = /* @__PURE__ */ ((APICurrentUserRoute2) => {
  APICurrentUserRoute2["Get"] = `/`;
  APICurrentUserRoute2["Modify"] = `/`;
  return APICurrentUserRoute2;
})(APICurrentUserRoute || {});
var APIAuthRoute = /* @__PURE__ */ ((APIAuthRoute2) => {
  APIAuthRoute2["Create"] = "/create";
  APIAuthRoute2["Login"] = "/login";
  APIAuthRoute2["RefreshToken"] = "/refresh";
  APIAuthRoute2["Logout"] = "/logout";
  return APIAuthRoute2;
})(APIAuthRoute || {});
var APIRoute = /* @__PURE__ */ ((APIRoute2) => {
  APIRoute2["GetUserById"] = `/users/:userId`;
  APIRoute2["GetAllUsers"] = `/users/`;
  APIRoute2["GetCurrentUser"] = `/users/@me/`;
  APIRoute2["ModifyCurrentUser"] = `/users/@me/`;
  APIRoute2["CreateUser"] = `/auth/create`;
  APIRoute2["Login"] = `/auth/login`;
  APIRoute2["RefreshToken"] = `/auth/refresh`;
  APIRoute2["Logout"] = `/auth/logout`;
  return APIRoute2;
})(APIRoute || {});

// src/REST.ts
var RequestMethod = /* @__PURE__ */ ((RequestMethod2) => {
  RequestMethod2["Get"] = "GET";
  RequestMethod2["Delete"] = "DELETE";
  RequestMethod2["Patch"] = "PATCH";
  RequestMethod2["Post"] = "POST";
  RequestMethod2["Put"] = "PUT";
  return RequestMethod2;
})(RequestMethod || {});
var REST = class {
  static baseUrl = process.env.NEXT_PUBLIC_API_URL;
  static get(endpoint, init) {
    return this.request("GET" /* Get */, endpoint, void 0, init);
  }
  static post(endpoint, payload, init) {
    return this.request("POST" /* Post */, endpoint, payload, init);
  }
  static put(endpoint, payload, init) {
    return this.request("PUT" /* Put */, endpoint, payload, init);
  }
  static patch(endpoint, payload, init) {
    return this.request("PATCH" /* Patch */, endpoint, payload, init);
  }
  static delete(endpoint, init) {
    return this.request("DELETE" /* Delete */, endpoint, void 0, init);
  }
  static async request(method, endpoint, payload, init) {
    const response = await this.makeRequest(method, endpoint, payload, init);
    const [, error] = response;
    if (error && error.code === 401 && this.getAccessToken()) {
      const isRefreshed = await this.refreshToken();
      if (isRefreshed) {
        return await this.makeRequest(method, endpoint, payload, init);
      }
    }
    return response;
  }
  static async makeRequest(method, endpoint, payload, init) {
    const headers = new Headers(init?.headers);
    headers.set("Content-Type", "application/json");
    const accessToken = this.getAccessToken();
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    try {
      const url = new URL(endpoint, this.baseUrl).toString();
      const response = await fetch(url, {
        ...init,
        method,
        headers,
        body: JSON.stringify(payload)
      });
      const json = await this.getJSONResponse(response);
      if (!response.ok) {
        return [null, json];
      }
      return [json, null];
    } catch (error) {
      return [
        null,
        {
          code: 0,
          error: error instanceof Error ? error.message : "Unknown error"
        }
      ];
    }
  }
  static async refreshToken() {
    const [data, error] = await this.makeRequest(
      "POST" /* Post */,
      "/auth/refresh" /* RefreshToken */,
      {},
      {
        // Refresh token is included as cookie
        credentials: "include"
      }
    );
    if (error) {
      this.removeAccessToken();
      return false;
    }
    this.setAccessToken(data.accessToken);
    return true;
  }
  static useRoute(endpoint, params) {
    let result = endpoint;
    if (typeof params == "object") {
      for (const k in params) {
        result = result.replace(`:${k}`, params[k]);
      }
    }
    return result;
  }
  static getAccessToken() {
    return sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken") || null;
  }
  static removeAccessToken() {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
  }
  static setAccessToken(token, remember = false) {
    return (remember ? localStorage : sessionStorage).setItem("accessToken", token);
  }
  static async getJSONResponse(response) {
    const contentType = response.headers.get("content-type");
    if (response.status === 201 || response.status === 204) {
      return {};
    }
    if (contentType?.startsWith("application/json")) {
      const data = await response.json();
      if (!response.ok) {
        return {
          code: response.status,
          ...data
        };
      }
      return data;
    }
    return {
      code: response.status,
      error: response.statusText
    };
  }
};
export {
  APIAuthRoute,
  APICurrentUserRoute,
  APIRoute,
  APIRoutePrefix,
  APIUsersRoute,
  REST,
  RequestMethod
};
//# sourceMappingURL=index.js.map