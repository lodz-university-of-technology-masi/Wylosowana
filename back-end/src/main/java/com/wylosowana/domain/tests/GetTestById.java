package com.wylosowana.domain.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.handlers.HandlerUtils;
import com.wylosowana.handlers.tests.TestHandler;
import org.apache.http.HttpStatus;

import java.util.Map;
import java.util.Optional;

public class GetTestById extends TestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private static final String ID_KEY = "id";

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String, String> pathParameters = HandlerUtils.getPathParams(input);

        String id = pathParameters.get(ID_KEY);
        Optional<Test> test = testDao.findById(id);

        return HandlerUtils.buildResponse().setStatusCode(test.isPresent() ? HttpStatus.SC_OK : HttpStatus.SC_NOT_FOUND).setObjectBody(test.orElse(null)).build();
    }
}
