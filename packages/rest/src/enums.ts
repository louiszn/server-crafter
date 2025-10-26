export enum APIRoutePrefix {
	Users = "/users",
	Auth = "/auth",
}

export enum APIUsersRoute {
	GetAll = "/",
	GetById = `/:userId`,
	Current = `/@me`,
}

export enum APICurrentUserRoute {
	Get = `/`,
	Modify = `/`,
}

export enum APIAuthRoute {
	Create = "/create",
	Login = "/login",
	RefreshToken = "/refresh",
	Logout = "/logout",
}

export enum APIRoute {
	GetUserById = `${APIRoutePrefix.Users}${APIUsersRoute.GetById}`,
	GetAllUsers = `${APIRoutePrefix.Users}${APIUsersRoute.GetAll}`,
	GetCurrentUser = `${APIRoutePrefix.Users}${APIUsersRoute.Current}${APICurrentUserRoute.Get}`,
	ModifyCurrentUser = `${APIRoutePrefix.Users}${APIUsersRoute.Current}${APICurrentUserRoute.Modify}`,

	CreateUser = `${APIRoutePrefix.Auth}${APIAuthRoute.Create}`,
	Login = `${APIRoutePrefix.Auth}${APIAuthRoute.Login}`,
	RefreshToken = `${APIRoutePrefix.Auth}${APIAuthRoute.RefreshToken}`,
	Logout = `${APIRoutePrefix.Auth}${APIAuthRoute.Logout}`,
}
