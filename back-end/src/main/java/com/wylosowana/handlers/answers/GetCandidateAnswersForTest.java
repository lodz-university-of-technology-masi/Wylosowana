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

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class GetCandidateAnswersForTest extends AnswersHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    public static final String ID_KEY = "testId";
    public static final String LOGIN_KEY = "login";

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            Map<String, String> pathParams = HandlerUtils.getPathParams(input);
            String login = pathParams.get(LOGIN_KEY);
            String id = pathParams.get(ID_KEY);
            System.out.println("LOGIN: " + login);
            System.out.println("ID: " + id);
            Answer answer = answerDao.findByTestIdAndLogin(id, login).orElseThrow(() -> new ResourceNotFoundException("Such answer doesn't exist"));

            TestDao testDao = new DynamoDBTestDao();
            List<Lang> langs = testDao.findById(answer.getTestId()).map(Test::getLangs).orElseThrow(() -> new ResourceNotFoundException("Such test doesn't exist"));
            Lang solvedLang = langs.stream().filter(lang -> lang.getLang().equals(answer.getLang())).findFirst().orElseThrow(() -> new ResourceNotFoundException("Such answer doesn't exist!"));

            List<Question> openQuestions = solvedLang.getQuestions().stream().filter(Question::isOpen).collect(Collectors.toList());
            List<Question> closedQuestions = solvedLang.getQuestions().stream().filter(Question::isClosed).collect(Collectors.toList());

            int points = checkAnswers(closedQuestions, answer);
            int maxPoints = solvedLang.getQuestions().size() + 1;

            answer.setPoints(points);
            answer.setMaxPoints(maxPoints);
            answerDao.save(answer);

            List<ResponsePOJO> responseBody = openQuestions.stream().map(question -> getResponsePOJO(question, answer)).collect(Collectors.toList());
            return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_OK).setObjectBody(responseBody).build();
        } catch (ResourceNotFoundException e) {
            return HandlerUtils.buildResponse().setStatusCode(HttpStatus.SC_NOT_FOUND).build();
        }
    }

    private int checkAnswers(List<Question> closedQuestions, Answer answer) {
        List<Solution> solutionsOfClosedQuestions = answer.getAnswers().stream().filter(Solution::isClosed).collect(Collectors.toList());

        if (closedQuestions.size() != solutionsOfClosedQuestions.size()) {
            throw new IllegalArgumentException("Different number of closed questions and answers!");
        }

        Iterator<Question> questionIterator = closedQuestions.iterator();
        Iterator<Solution> solutionIterator = solutionsOfClosedQuestions.iterator();

        int points = 0;

        while (solutionIterator.hasNext() && questionIterator.hasNext()) {
            Question question = questionIterator.next();
            Solution solution = solutionIterator.next();

            if (question.getAnswers().containsAll(solution.getAnswers()) && solution.getAnswers().containsAll(question.getAnswers())) {
                points++;
            }
        }

        return points;
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

        public ResponsePOJO() {
        }

        public ResponsePOJO(String question, String answer) {
            this.question = question;
            this.answer = answer;
        }

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public String getAnswer() {
            return answer;
        }

        public void setAnswer(String answer) {
            this.answer = answer;
        }
    }
}
