package wylosowana.model.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Questions {

    private Optional<List<String>> answers;
    private Optional<List<String>> correct;
    private int no;
    private String question;

    public Questions(List<String> answers, List<String> correct, int no, String question) {
        this.answers = Optional.ofNullable(answers);
        this.correct = Optional.ofNullable(correct);
        this.no = no;
        this.question = question;
    }

    public Questions() { }

    public List<String> getAnswers() {
        return answers.orElseGet(ArrayList::new);
    }

    public void setAnswers(List<String> answers) {
        this.answers = Optional.ofNullable(answers);
    }

    public List<String> getCorrect() {
        return correct.orElseGet(ArrayList::new);
    }

    public void setCorrect(List<String> correct) {
        this.correct = Optional.ofNullable(correct);
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
