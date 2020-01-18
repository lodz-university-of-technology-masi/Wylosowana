package com.wylosowana.handlers.answers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wylosowana.db.answers.AnswerDao;
import com.wylosowana.db.answers.DynamoDBAnswerDao;
import com.wylosowana.domain.answers.Answer;
import com.wylosowana.handlers.HandlerUtils;
import lombok.extern.apachecommons.CommonsLog;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@CommonsLog
public abstract class AnswersHandler {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    protected final AnswerDao answerDao = new DynamoDBAnswerDao();

    public final Optional<Answer> getAnswer(Map<String, Object> requestInput) {
        try {
            JsonNode node = HandlerUtils.getBody(requestInput);
            log.debug("Node in AnswersHandler::getAnswer" + node);
            return Optional.ofNullable(objectMapper.treeToValue(node, Answer.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    public boolean isValid(Answer answer) {
        return true;
    }
}
