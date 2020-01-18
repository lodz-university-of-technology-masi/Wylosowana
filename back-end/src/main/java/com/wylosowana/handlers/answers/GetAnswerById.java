package com.wylosowana.handlers.answers;

import com.amazonaws.services.cognitoidp.model.ResourceNotFoundException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.db.tests.DynamoDBTestDao;
import com.wylosowana.db.tests.TestDao;
import com.wylosowana.domain.answers.Answer;
import com.wylosowana.domain.answers.Solution;
import com.wylosowana.domain.tests.Lang;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import lombok.Builder;
import lombok.Data;
import lombok.extern.apachecommons.CommonsLog;
import org.apache.http.HttpStatus;

import java.util.List;
import java.util.Map;

@CommonsLog
public class GetAnswerById extends AnswersHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private static final String ID_KEY = "id";

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            String id = HandlerUtils.getPathParams(input).get(ID_KEY);
            Answer answer = answerDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Such answer does not exist!"));

            TestDao testDao = new DynamoDBTestDao();
            Test test = testDao.findById(answer.getTestId()).orElseThrow(() -> new ResourceNotFoundException("Such test does not exist!"));

            ResponsePOJO responseBody = ResponsePOJO.builder()
                    .testName(test.getTestName())
                    .login(answer.getLogin())
                    .answerId(answer.getId())
                    .testId(test.getId())
                    .answerList(answer.getAnswers())
                    .langs(test.getLangs())
                    .build();

            return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_OK).setObjectBody(responseBody).build();
        } catch (ResourceNotFoundException e) {
            log.error("Exception thrown in GetAnswerById::handleRequest!\n" + e.getMessage());
            return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_NOT_FOUND).setObjectBody(e.getMessage()).build();
        }
    }

    @Data
    @Builder
    private static class ResponsePOJO {
        private String testName;
        private String login;
        private String answerId;
        private String testId;
        private List<Solution> answerList;
        private List<Lang> langs;
    }
}
