package com.wylosowana.handlers.tests;

import com.amazonaws.services.dynamodbv2.model.ResourceNotFoundException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import lombok.extern.apachecommons.CommonsLog;
import org.apache.http.HttpStatus;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CommonsLog
public class UpdateCandidateLogins extends TestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private static final String ID_KEY = "id";
    private static final String LOGINS_KEY = "candidateLogins";

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = HandlerUtils.getBody(input);
            List<String> logins = objectMapper.treeToValue(jsonNode.get(LOGINS_KEY), ArrayList.class);

            String testId = HandlerUtils.getPathParams(input).get(ID_KEY);
            Test test = testDao.findById(testId).orElseThrow(() -> new ResourceNotFoundException("Such test does not exist!"));

            test.setCandidateLogins(logins);
            test = testDao.save(test).orElseThrow(() -> new UnsupportedOperationException("Updating test failed!"));

            return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_ACCEPTED).setObjectBody(test).build();
        } catch (ResourceNotFoundException e) {
            log.error("Exception thrown in UpdateCandidateLogins::handleRequest!\n" + e.getMessage());
            return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_NOT_FOUND).setObjectBody(e.getMessage()).build();

        } catch (UnsupportedOperationException | IOException e) {
            log.error("Exception thrown in UpdateCandidateLogins::handleRequest!\n" + e.getMessage());
            return HandlerUtils.buildError().setObjectBody(e.getMessage()).build();
        }
    }
}
