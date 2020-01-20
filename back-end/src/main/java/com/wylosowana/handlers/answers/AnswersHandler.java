package com.wylosowana.handlers.answers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wylosowana.db.answers.AnswerDao;
import com.wylosowana.db.answers.DynamoDBAnswerDao;
import com.wylosowana.db.tests.DynamoDBTestDao;
import com.wylosowana.db.tests.TestDao;
import com.wylosowana.domain.answers.Answer;
import com.wylosowana.domain.answers.Solution;
import com.wylosowana.domain.tests.Lang;
import com.wylosowana.domain.tests.Question;
import com.wylosowana.domain.tests.Test;
import com.wylosowana.handlers.HandlerUtils;
import lombok.extern.apachecommons.CommonsLog;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CommonsLog
public abstract class AnswersHandler {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    protected final AnswerDao answerDao = new DynamoDBAnswerDao();

    public final Optional<Answer> getAnswer(Map<String, Object> requestInput) {
        try {
            JsonNode node = HandlerUtils.getBody(requestInput);
            return Optional.ofNullable(objectMapper.treeToValue(node, Answer.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }

    public boolean isValid(Answer answer) {
        Optional<Test> testOptional = getTestIfExists(answer.getTestId());
        try {
            boolean isValid = testOptional.isPresent();
            Test test = testOptional.get();
            isValid &= canCandidateSolveTheTest(answer.getLogin(), test.getCandidateLogins());
            Optional<Lang> testLang = langMatches(test.getLangs(), answer.getLang());
            isValid &= testLang.isPresent();
            Lang existingTestLang = testLang.get();

            isValid &= numberOfQuestionsMatches(existingTestLang, answer);
            isValid &= closedAndOpenQuestionsMatch(existingTestLang, answer);

            return isValid;
        } catch (Exception e) {
            return false;
        }
    }

    private Optional<Test> getTestIfExists(String testId) {
        TestDao testDao = new DynamoDBTestDao();
        return testDao.findById(testId);
    }

    private boolean canCandidateSolveTheTest(String login, List<String> candidateLogins) {
        return candidateLogins.contains(login);
    }

    private boolean closedAndOpenQuestionsMatch(Lang existingTestLang, Answer answer) {
        List<Question> questions = existingTestLang.getQuestions();
        List<Solution> solutions = answer.getAnswers();

        try {
            checkAnswersIndices(answer.getAnswers().stream().map(Solution::getNo));
            checkAnswersTypes(solutions, questions);
        } catch (Exception e) {
            return false;
        }

        return true;
    }

    private void checkAnswersTypes(List<Solution> answers, List<Question> questions) {
        Iterator<Solution> solutionIterator = answers.iterator();
        Iterator<Question> questionIterator = questions.iterator();

        while (solutionIterator.hasNext() && questionIterator.hasNext()) {
            Solution solution = solutionIterator.next();
            Question question = questionIterator.next();

            if (solution.isOpen() && question.isClosed()) {
                throw new IllegalArgumentException("Answer type does not match question type!");
            }
        }

    }

    private void checkAnswersIndices(Stream<Integer> numbersStream) {
        List<Integer> sortedNo = numbersStream.sorted().collect(Collectors.toList());

        for (int i = 0; i < sortedNo.size() - 1; i++) {
            if (sortedNo.get(i) != i) {
                throw new IllegalArgumentException("Answers indexes are nor valid!");
            }
        }
    }

    private boolean numberOfQuestionsMatches(Lang lang, Answer answer) {
        return lang.getQuestions().size() == answer.getAnswers().size();
    }

    private Optional<Lang> langMatches(List<Lang> langs, String lang) {
        return langs.stream().filter(l -> Objects.equals(l.getLang(), lang)).findFirst();
    }
}
