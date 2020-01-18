package com.wylosowana.handlers.tests;

import com.amazonaws.services.dynamodbv2.model.ResourceNotFoundException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.domain.tests.Lang;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import org.apache.http.HttpStatus;

import javax.naming.OperationNotSupportedException;
import java.io.IOException;
import java.util.Map;

public class AddTestTranslation extends TestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private static final String ID_KEY = "id";

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            JsonNode jsonNode = HandlerUtils.getBody(input);
            ObjectMapper objectMapper = new ObjectMapper();
            Lang lang = objectMapper.treeToValue(jsonNode, Lang.class);

            String testId = HandlerUtils.getPathParams(input).get(ID_KEY);
            Test test = testDao.findById(testId).orElseThrow(() -> new ResourceNotFoundException("Such test does not exist!"));
            boolean langAlreadyExists = test.getLangs().stream().anyMatch(l -> l.getLang().equals(lang.getLang()));

            if (!langAlreadyExists) {
                test.getLangs().add(lang);
                test = testDao.save(test).orElseThrow(() -> new OperationNotSupportedException("Test update failes!!"));
            } else {
                throw new IllegalArgumentException("Lang already exists!");
            }

            return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_ACCEPTED).setObjectBody(test).build();
        } catch (IOException | OperationNotSupportedException e) {
            return HandlerUtils.buildError().setObjectBody(e.getMessage()).build();
        } catch (IllegalArgumentException e) {
            return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_NOT_FOUND).setObjectBody(e.getMessage()).build();
        }
    }
}
