import { Response } from "express";

/**
 * Formats an object of parameters into a URI Encoded string.
 * {key1:value1, key2:value2} => key1=value1&key2=value2
 *
 * @param {Object} params — the object where key is the parameter key
 * and the value is the parameter value
 * @returns a string representing the formatted parameters
 */
function formatParams(params: Object): string {
  return Object.entries(params)
    .map(([key, value]) => {
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join("&");
}

/**
 * Takes in a HTTP response from fetch and turns it into a JSON object.
 *
 * @param {Response} response — the response object to convert to JSON
 * @returns {Promise<T>} — a promise for the JSON object of type T
 */
function convertResponseToJson<T>(response: globalThis.Response): Promise<T> {
  if (!response.ok) {
    console.log(response);
    throw `API request failed with status code ${response.status} and text: ${response.statusText}`;
  }
  return (response.json() as Promise<T>).catch((error) => {
    throw "Could not convert response to a JSON object";
  });
}

/**
 * Performs a GET request to the URL with given parameters.
 *
 * @param {string} url — the url for the request
 * @param {Object} params — the parameters for the get request, to be used
 * as URL parameters
 * @returns {Promise<T>} — a promise for the JSON object of type T
 */
function get<T>(url: string, params?: Object): Promise<T> {
  const path: string = params ? url + "?" + formatParams(params) : url;
  return fetch(path)
    .then((response) => convertResponseToJson<T>(response))
    .catch((error) => {
      throw `GET Request to ${path} failed with error:\n${error}`;
    });
}

/**
 * Performs a POST request to the URL with given parameters.
 *
 * @param {string} url — the url for the request
 * @param {Object} body — the body for the post request
 * @returns {Promise<T>} — a promise for the JSON object of type T
 */
function post<T>(url: string, body?: Object): Promise<T> {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(url, options as RequestInit)
    .then((response) => convertResponseToJson<T>(response))
    .catch((error) => {
      throw `POST Request to ${url} failed with error:\n${error}`;
    });
}

/**
 * Performs a PUT request to the URL with given parameters.
 *
 * @param {string} url — the url for the request
 * @param {Object} body — the body for the put request
 * @returns {Promise<T>} — a promise for the JSON object of type T
 */
function put<T>(url: string, body?: Object): Promise<T> {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(url, options as RequestInit)
    .then((response) => convertResponseToJson<T>(response))
    .catch((error) => {
      throw `PUT Request to ${url} failed with error:\n${error}`;
    });
}

/**
 * Performs a PATCH request to the URL with given parameters.
 *
 * @param {string} url — the url for the request
 * @param {Object} body — the body for the patch request
 * @returns {Promise<T>} — a promise for the JSON object of type T
 */
function patch<T>(url: string, body?: Object): Promise<T> {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(url, options as RequestInit)
    .then((response) => convertResponseToJson<T>(response))
    .catch((error) => {
      throw `PUT Request to ${url} failed with error:\n${error}`;
    });
}

/**
 * Performs a DELETE request to the URL with given parameters.
 *
 * @param {string} url — the url for the request
 * @param {Object} body — the body for the delete request
 * @returns {Promise<T>} — a promise for the JSON object of type T
 */
function del<T>(url: string, body?: Object): Promise<T> {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  return fetch(url, options as RequestInit)
    .then((response) => convertResponseToJson<T>(response))
    .catch((error) => {
      throw `DELETE Request to ${url} failed with error:\n${error}`;
    });
}

export { get, post, put, patch, del };
