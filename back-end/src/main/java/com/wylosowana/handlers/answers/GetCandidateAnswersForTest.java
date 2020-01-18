package com.wylosowana.handlers.answers;

import com.amazonaws.services.dynamodbv2.model.ResourceNotFoundException;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;
import com.wylosowana.db.tests.DynamoDBTestDao;
import com.wylosowana.db.tests.TestDao;
import com.wylosowana.domain.answers.Answer;
import com.wylosowana.domain.answers.Solution;
import com.wylosowana.domain.tests.Lang;
import com.wylosowana.domain.tests.Question;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import org.apache.http.HttpStatus;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class GetCandidateAnswersForTest extends AnswersHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    public static final String ID_KEY = "id";
    public static final String LOGIN_KEY = "login";

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            //TODO SUMOWANIE POUNKTÓW Z PYTAŃ ZAMKNIĘTYCH
            Map<String, String> pathParams = HandlerUtils.getPathParams(input);
            String login = pathParams.get(LOGIN_KEY);
            String id = pathParams.get(ID_KEY);
            Answer answer = answerDao.getByTestIdAndLogin(id, login).orElseThrow(() -> new ResourceNotFoundException("Such answer doesn't exist"));

            TestDao testDao = new DynamoDBTestDao();
            List<Lang> langs = testDao.findById(answer.getTestId()).map(Test::getLangs).orElseThrow(() -> new ResourceNotFoundException("Such test doesn't exist"));
            Lang solvedLang = langs.stream().filter(lang -> lang.getLang().equals(answer.getLang())).findFirst().orElseThrow(() -> new ResourceNotFoundException("Such answer doesn't exist!"));

            List<Question> openQuestions = solvedLang.getQuestions().stream().filter(question -> question.getAnswers().isEmpty()).collect(Collectors.toList());
            List<ResponsePOJO> responseBody = openQuestions.stream().map(question -> getResponsePOJO(question, answer)).collect(Collectors.toList());

            return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_OK).setObjectBody(responseBody).build();

        } catch (ResourceNotFoundException e) {
            return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_NOT_FOUND).build();
        }


    }

    private ResponsePOJO getResponsePOJO(Question question, Answer answer) {
        int questionNumber = question.getNo();
        String givenAnswer = answer.getAnswers().stream().filter(solution -> solution.getNo() == questionNumber).map(Solution::getAnswer).findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Answer for this question doesn't exist!"));

        return new ResponsePOJO(question.getQuestion(), givenAnswer);
    }

    private static class ResponsePOJO {
        String question;
        String answer;

        public ResponsePOJO(String question, String answer) {
            this.question = question;
            this.answer = answer;
        }
    }
}
