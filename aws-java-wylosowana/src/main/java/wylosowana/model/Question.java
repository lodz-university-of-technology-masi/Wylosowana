package wylosowana.model;

import java.util.List;

public class Question {
    private String question;
    private String type;
    private List<String> answers;

    public Question(String question, String type, List<String> answers) {
        this.question = question;
        this.type = type;
        this.answers = answers;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String questionName) {
        this.question = questionName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }
}
