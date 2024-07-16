/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * Swagger KazUSA API
 * This is the KazUSA server.
 * OpenAPI spec version: 1.0
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
export interface KazusaServerInternalEntityPagination {
  limit?: number;
  offset?: number;
}

export interface KazusaServerInternalEntityNewModule {
  content?: string;
  courseId?: string;
  durationMinutes?: number;
  name?: string;
}

export interface KazusaServerInternalEntityNewCourse {
  description?: string;
  price?: number;
  title?: string;
}

export interface KazusaServerInternalEntityModuleFilters {
  courseId?: string;
  id?: string;
}

export interface KazusaServerInternalEntityModuleReadRequest {
  filters?: KazusaServerInternalEntityModuleFilters;
  pagination?: KazusaServerInternalEntityPagination;
}

export interface KazusaServerInternalEntityModule {
  content?: string;
  courseId?: string;
  createdAt?: string;
  durationMinutes?: number;
  id?: string;
  name?: string;
  updatedAt?: string;
}

export interface KazusaServerInternalEntityCourseFilters {
  id?: string;
}

export interface KazusaServerInternalEntityCourseReadRequest {
  filters?: KazusaServerInternalEntityCourseFilters;
  pagination?: KazusaServerInternalEntityPagination;
}

export interface KazusaServerInternalEntityCourse {
  createdAt?: string;
  description?: string;
  id?: string;
  price?: number;
  title?: string;
  updatedAt?: string;
}

export interface InternalHandlerRegisterResponse {
  error?: string;
  ok?: boolean;
}

export interface InternalHandlerRegisterRequest {
  email?: string;
  name?: string;
  password?: string;
  passwordConfirmation?: string;
  phone?: string;
}

export interface InternalHandlerLoginResponse {
  error?: string;
  ok?: boolean;
}

export interface InternalHandlerLoginRequest {
  email?: string;
  password?: string;
}





  /**
 * read courses
 * @summary Read courses
 */
export const courseRead = <TData = AxiosResponse<KazusaServerInternalEntityCourse[]>>(
    kazusaServerInternalEntityCourseReadRequest: KazusaServerInternalEntityCourseReadRequest, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/course`,options
    );
  }

/**
 * create module
 * @summary Create module
 */
export const moduleCreate = <TData = AxiosResponse<boolean>>(
    kazusaServerInternalEntityNewModule: KazusaServerInternalEntityNewModule, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/course`,
      kazusaServerInternalEntityNewModule,options
    );
  }

/**
 * login user
 * @summary Login a user
 */
export const login = <TData = AxiosResponse<InternalHandlerLoginResponse>>(
    internalHandlerLoginRequest: InternalHandlerLoginRequest, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/login`,
      internalHandlerLoginRequest,options
    );
  }

/**
 * read modules
 * @summary Read modules
 */
export const moduleRead = <TData = AxiosResponse<KazusaServerInternalEntityModule[]>>(
    kazusaServerInternalEntityModuleReadRequest: KazusaServerInternalEntityModuleReadRequest, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/module`,options
    );
  }

/**
 * register user
 * @summary Register a user
 */
export const register = <TData = AxiosResponse<InternalHandlerRegisterResponse>>(
    internalHandlerRegisterRequest: InternalHandlerRegisterRequest, options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.post(
      `/register`,
      internalHandlerRegisterRequest,options
    );
  }

export type CourseReadResult = AxiosResponse<KazusaServerInternalEntityCourse[]>
export type ModuleCreateResult = AxiosResponse<boolean>
export type LoginResult = AxiosResponse<InternalHandlerLoginResponse>
export type ModuleReadResult = AxiosResponse<KazusaServerInternalEntityModule[]>
export type RegisterResult = AxiosResponse<InternalHandlerRegisterResponse>
