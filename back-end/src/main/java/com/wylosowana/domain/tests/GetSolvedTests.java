package com.wylosowana.domain.tests;

import com.amazonaws.services.cognitoidp.model.ResourceNotFoundException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.db.answers.AnswerDao;
import com.wylosowana.db.answers.DynamoDBAnswerDao;
import com.wylosowana.domain.answers.Answer;
import com.wylosowana.handlers.HandlerUtils;
import com.wylosowana.handlers.tests.TestHandler;
import org.apache.http.HttpStatus;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class GetSolvedTests extends TestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        AnswerDao answersDao = new DynamoDBAnswerDao();

        List<Answer> answers = answersDao.findAll();
        List<Test> tests = testDao.findAll();

        String recruiterLogin = HandlerUtils.getUser(input);
        List<Test> recruiterTests = tests.stream().filter(test -> test.getRecruiterLogin().equals(recruiterLogin)).collect(Collectors.toList());
        List<String> recruiterTestIds = recruiterTests.stream().map(Test::getId).collect(Collectors.toList());
        List<String> uniqueSolvedTestIds = answers.stream().filter(test -> recruiterTestIds.contains(test.getId())).map(Answer::getId).collect(Collectors.toList());

        List<GetSolvedTests.ResponsePOJO> responseBody = uniqueSolvedTestIds.stream().map(id -> getResponsePOJO(id, recruiterTests, answers)).collect(Collectors.toList());

        return HandlerUtils.buildResponse().setObjectBody(responseBody).setStatusCode(HttpStatus.SC_OK).build();
    }

    private ResponsePOJO getResponsePOJO(String testId, List<Test> tests, List<Answer> answers) {
        String testName = tests.stream().filter(test -> test.getId().equals(testId)).map(Test::getTestName).findFirst().orElseThrow(() -> new ResourceNotFoundException("Such test does not exist!"));
        List<String> logins = answers.stream().filter(answer -> answer.getTestId().equals(testId)).map(Answer::getLogin).collect(Collectors.toList());

        return new ResponsePOJO(testId, testName, logins);
    }

    private static class ResponsePOJO {
        String id;
        String name;
        List<String> logins;

        public ResponsePOJO(String id, String name, List<String> logins) {
            this.id = id;
            this.name = name;
            this.logins = logins;
        }

        public ResponsePOJO() {
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<String> getLogins() {
            return logins;
        }

        public void setLogins(List<String> logins) {
            this.logins = logins;
        }
    }
}
