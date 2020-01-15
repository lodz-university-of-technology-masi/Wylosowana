package wylosowana.creators;

import wylosowana.model.TestAnswers.Answers;
import wylosowana.model.TestAnswers.TestAnswer;

import java.util.ArrayList;
import java.util.List;

public class TestAnswerCreator {
    public static TestAnswer addUserToTest(String userId, String testId){
//        TestAnswer answer = new TestAnswer();
//        answer.setUserId(userId);
//        answer.setTestId(testId);
//        answer.setAnswers(null);
//        answer.setResult(null);
        return null;
    }

    public static TestAnswer addUserAnswer(String testId, String  login,  ArrayList<Answers> answers){
        TestAnswer testAnswer = new TestAnswer();
        testAnswer.setLogin(login);
        testAnswer.setTestId(testId);
        testAnswer.setAnswers(answers);
        return testAnswer;
    }



    public static TestAnswer addRecruiterResult(TestAnswer answer, List<Boolean> results){
    //    answer.setResult(TestAnswerCreator.calculatePercent(results));
        return answer;
    }


    public static String calculatePercent(List<Boolean> results){
        float flag = 0;
        for(boolean b : results){
            if(b)
                flag+= 1.0f;
        }
        float answer = flag/results.size();
        return answer * 100.0f + "%";
    }
}
