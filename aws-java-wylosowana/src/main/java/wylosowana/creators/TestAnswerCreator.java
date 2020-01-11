package wylosowana.creators;

import wylosowana.model.TestAnswer;

import java.util.List;

public class TestAnswerCreator {
    public static TestAnswer addUserToTest(String userId, String testId){
        TestAnswer answer = new TestAnswer();
        answer.setUserId(userId);
        answer.setTestId(testId);
        answer.setAnswers(null);
        answer.setResult(null);
        return answer;
    }

    public static TestAnswer addUserAnswer(TestAnswer answer, List<String> answers){
        answer.setAnswers(answers);
        answer.setResult(null);
        return answer;
    }



    public static TestAnswer addRecruiterResult(TestAnswer answer, List<Boolean> results){
        answer.setResult(TestAnswerCreator.calculatePercent(results));
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
