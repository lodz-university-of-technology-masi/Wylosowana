package com.wylosowana.handlers.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.domain.tests.Lang;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import org.apache.http.HttpStatus;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class GetTestsForCandidate extends TestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private static final String LOGIN_KEY = "login";
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        String login = HandlerUtils.getPathParams(input).get(LOGIN_KEY);
        System.out.println(login);
        List<ResponsePOJO> tests = testDao.findByCandidateLogin(login).stream().map(ResponsePOJO::fromTest).collect(Collectors.toList());

        return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_OK).setObjectBody(tests).build();
    }

    private static class ResponsePOJO {
        private String id;
        private String testName;
        private List<Lang> langs;

        public ResponsePOJO(String id, String testName, List<Lang> langs) {
            this.id = id;
            this.testName = testName;
            this.langs = langs;
        }

        public static ResponsePOJO fromTest(Test test) {
            return new ResponsePOJO(test.getId(), test.getTestName(), test.getLangs());
        }
    }
}
