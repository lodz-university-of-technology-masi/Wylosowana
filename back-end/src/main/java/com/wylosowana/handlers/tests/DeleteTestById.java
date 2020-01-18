package com.wylosowana.handlers.tests;

import com.amazonaws.services.cognitoidp.model.ResourceNotFoundException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.db.exceptions.ElementNotExist;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import org.apache.http.HttpStatus;

import java.util.Map;

public class DeleteTestById extends TestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private static final String ID_KEY = "id";

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        String testId = HandlerUtils.getPathParams(input).get(ID_KEY);

        testDao.findById(testId).ifPresentOrElse(this::deleteTest, testNotFoundRunnable());

        return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_ACCEPTED).build();
    }

    private Runnable testNotFoundRunnable() {
        return () -> {
            throw new ResourceNotFoundException("Such test does not exist!");
        };
    }

    private void deleteTest(Test test) {
        try {
            testDao.delete(test);
        } catch (ElementNotExist elementNotExist) {
            elementNotExist.printStackTrace();
        }
    }
}
