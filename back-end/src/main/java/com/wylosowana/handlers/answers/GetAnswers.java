package com.wylosowana.handlers.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.db.tests.DynamoDBTestDao;
import com.wylosowana.db.tests.TestDao;
import com.wylosowana.domain.answers.Answer;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.apachecommons.CommonsLog;
import org.apache.http.HttpStatus;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CommonsLog
public class GetAnswers extends AnswersHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            String username = HandlerUtils.getUsername(input);

            TestDao testDao = new DynamoDBTestDao();
            List<SimpleTest> simpleTests = testDao.findByRecruiterLogin(username).stream().map(SimpleTest::fromTest).collect(Collectors.toList());
            Stream<Answer> answers = simpleTests.stream().map(simpleTest -> answerDao.findByTestId(simpleTest.getTestId())).flatMap(Collection::stream);
            List<ResponsePOJO> responseBody = answers.map(ResponsePOJO::fromAnswer).map(pojo -> setTestNameByTestId(pojo, simpleTests)).collect(Collectors.toList());

            return HandlerUtils.buildResponse()
                    .setStatusCode(HttpStatus.SC_OK)
                    .setObjectBody(responseBody)
                    .build();
        } catch (Exception e) {
            log.error("Exception thrown in AnswersHandler::handleRequest! " + e.getMessage());
            return HandlerUtils.buildError().setObjectBody(e.getMessage()).build();
        }
    }

    private ResponsePOJO setTestNameByTestId(ResponsePOJO pojo, List<SimpleTest> simpleTests) {
        String testId = pojo.getTestId();
        String testName = simpleTests.stream().filter(simpleTest -> Objects.equals(simpleTest.getTestId(), testId)).map(SimpleTest::getTestName).findFirst().get();
        pojo.setTestName(testName);
        return pojo;
    }

    private static class ResponsePOJO {
        String testId;
        String testName;
        String candidateLogin;

        public ResponsePOJO() {
        }

        public ResponsePOJO(String testId, String testName, String candidateLogin) {
            this.testId = testId;
            this.testName = testName;
            this.candidateLogin = candidateLogin;
        }

        private static ResponsePOJO fromAnswer(Answer answer) {
            return new ResponsePOJO(answer.getTestId(), null, answer.getLogin());
        }

        public String getTestName() {
            return testName;
        }

        public void setTestName(String testName) {
            this.testName = testName;
        }

        public String getTestId() {
            return testId;
        }

        public void setTestId(String testId) {
            this.testId = testId;
        }

        public String getCandidateLogin() {
            return candidateLogin;
        }

        public void setCandidateLogin(String candidateLogin) {
            this.candidateLogin = candidateLogin;
        }
    }

    @Data
    @AllArgsConstructor
    private static class SimpleTest {
        String testId;
        String testName;

        static SimpleTest fromTest(Test test) {
            return new SimpleTest(test.getId(), test.getTestName());
        }
    }
}
