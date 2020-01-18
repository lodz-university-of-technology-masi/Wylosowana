package com.wylosowana.handlers.tests;

import com.amazonaws.services.cognitoidp.model.ResourceNotFoundException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import lombok.extern.apachecommons.CommonsLog;
import org.apache.http.HttpStatus;

import java.util.Map;

@CommonsLog
public class GetTestById extends TestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private static final String ID_KEY = "id";

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            String testId = HandlerUtils.getPathParams(input).get(ID_KEY);
            Test test = testDao.findById(testId).orElseThrow(() -> new ResourceNotFoundException("Such test does not exist!"));

            return HandlerUtils.buildResponse().setObjectBody(test).setStatusCode(HttpStatus.SC_OK).build();
        } catch (ResourceNotFoundException e) {
            log.error("Exception thrown in GetTestById::handleRequest!\n" + e.getMessage());
            return HandlerUtils.buildResponse().setObjectBody(e.getMessage()).setStatusCode(HttpStatus.SC_NOT_FOUND).build();
        }
    }
}
