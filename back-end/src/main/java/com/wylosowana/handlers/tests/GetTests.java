package com.wylosowana.handlers.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import lombok.extern.apachecommons.CommonsLog;
import org.apache.http.HttpStatus;

import java.util.List;
import java.util.Map;

@CommonsLog
public class GetTests extends TestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            String username = HandlerUtils.getUser(input);
            List<Test> tests = testDao.findByRecruiterLogin(username);

            return HandlerUtils.buildResponse()
                    .setStatusCode(HttpStatus.SC_OK)
                    .setObjectBody(tests)
                    .build();
        } catch (Exception e) {
            log.error("Exception thrown in TestHandler::handleRequest! " + e.getMessage());
            return HandlerUtils.buildError().setObjectBody(e.getMessage()).build();
        }
    }
}
