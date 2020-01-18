package com.wylosowana.handlers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wylosowana.ApiGatewayResponse;
import org.apache.http.HttpStatus;

import java.io.IOException;
import java.util.Map;

public class HandlerUtils {

    private static final String CORS_HEADER_KEY = "Access-Control-Allow-Origin";
    private static final String CORS_HEADER_VALUE = "*";
    private static final String BODY_KEY = "body";
    private static final String PATH_PARAMETERS_KEY = "pathParameters";
    private static final String QUERY_PARAMETERS_KEY = "queryStringParameters";
    private static final String IDENTITY_KEY = "indentity";
    private static final String USER_KEY = "user";

    public static ApiGatewayResponse.Builder buildResponse() {
        return ApiGatewayResponse.builder().setHeaders(getCorsHeader());
    }

    public static JsonNode getBody(Map<String, Object> requestInput) throws IOException {
        return new ObjectMapper().readTree((String) requestInput.get(BODY_KEY));
    }

    public static Map<String, String> getPathParams(Map<String, Object> requestInput) {
        return (Map<String, String>) requestInput.get(PATH_PARAMETERS_KEY);
    }

    public static Map<String, String> getQueryParams(Map<String, Object> requestInput) {
        return (Map<String, String>) requestInput.get(QUERY_PARAMETERS_KEY);
    }

    public static String getUser(Map<String, Object> requestInput) {
        Map<String, Object> identity = (Map<String, Object>) requestInput.get(IDENTITY_KEY);
        return (String) identity.get(USER_KEY);
    }

    public static ApiGatewayResponse.Builder buildError() {
        return buildResponse().setStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR);
    }

    private static Map<String, String> getCorsHeader() {
        return Map.of(CORS_HEADER_KEY, CORS_HEADER_VALUE);
    }
}