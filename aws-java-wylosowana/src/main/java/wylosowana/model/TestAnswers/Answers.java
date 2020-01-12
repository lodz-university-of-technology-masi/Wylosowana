package wylosowana.model.TestAnswers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Answers {

    private Optional<String> answer;
    private Optional<List<String>> answers;
    private int no;

    public Answers() {};

    public Answers(String answer, int no) {
        this.answer = Optional.ofNullable(answer);
        this.no = no;
    }

    public Answers(List<String> answers, int no) {
        this.answers = Optional.ofNullable(answers);
        this.no = no;
    }

    public String getAnswer() {
        return answer.orElseGet(String::new);
    }

    public void setAnswer(String answer) {
        this.answer = Optional.ofNullable(answer);
    }

    public List<String> getAnswers() {
        return answers.orElseGet(ArrayList::new);
    }

    public void setAnswers(List<String> answers) {
        this.answers = Optional.ofNullable(answers);
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }
}
