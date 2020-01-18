package com.wylosowana.handlers.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import lombok.SneakyThrows;
import lombok.extern.apachecommons.CommonsLog;
import org.apache.http.HttpStatus;

import java.util.Map;
import java.util.Optional;

@CommonsLog
public class CreateTest extends TestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    @SneakyThrows
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            Optional<Test> test = getTest(input).filter(this::isValid).map(testDao::save).map(Optional::get);

            return HandlerUtils.buildResponse()
                    .setStatusCode(test.isPresent() ? HttpStatus.SC_CREATED : HttpStatus.SC_BAD_REQUEST)
                    .setObjectBody(test.orElse(null))
                    .build();

        } catch (Exception e) {
            log.error("Exception thrown in CreateTest::handleRequest!\n" + e.getMessage());
            return HandlerUtils.buildResponse().setObjectBody(e.getMessage()).setStatusCode(HttpStatus.SC_BAD_REQUEST).build();
        }
    }
}
