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
    private static final String REQUEST_CONTEXT_KEY = "requestContext";
    private static final String AUTHORIZER_KEY = "authorizer";
    private static final String CLAIMS_KEY = "claims";
    private static final String USERNAME_KEY = "cognito:username";

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

    public static String getUsername(Map<String, Object> requestInput) {
        Map<String, Object> identity = (Map<String, Object>) requestInput.get(REQUEST_CONTEXT_KEY);
        Map<String, Object> authorizer = (Map<String, Object>) identity.get(AUTHORIZER_KEY);
        Map<String, Object> claims = (Map<String, Object>) authorizer.get(CLAIMS_KEY);
        return (String) claims.get(USERNAME_KEY);
    }

    public static ApiGatewayResponse.Builder buildError() {
        return buildResponse().setStatusCode(HttpStatus.SC_INTERNAL_SERVER_ERROR);
    }

    private static Map<String, String> getCorsHeader() {
        return Map.of(CORS_HEADER_KEY, CORS_HEADER_VALUE);
    }
}
