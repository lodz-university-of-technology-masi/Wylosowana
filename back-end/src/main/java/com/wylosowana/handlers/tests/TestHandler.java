package com.wylosowana.handlers.tests;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wylosowana.db.tests.DynamoDBTestDao;
import com.wylosowana.db.tests.TestDao;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import lombok.extern.apachecommons.CommonsLog;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@CommonsLog
public abstract class TestHandler {
    private final static ObjectMapper objectMapper = new ObjectMapper();
    protected final TestDao testDao = new DynamoDBTestDao();

    public final Optional<Test> getTest(Map<String, Object> requestInput) {
        try {
            JsonNode node = HandlerUtils.getBody(requestInput);
            log.debug("Node in TestHandler::getTest" + node);
            return Optional.ofNullable(objectMapper.treeToValue(node, Test.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    public boolean isValid(Test test) {
        return true;
    }
}
