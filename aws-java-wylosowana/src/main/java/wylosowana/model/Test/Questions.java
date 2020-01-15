package wylosowana.model.Test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.util.List;

@DynamoDBDocument
public class Questions {

    private List<String> answers;
    private List<String> correct;
    private Integer  no;
    private String question;

//    public Questions(List<String> answers, List<String> correct, int no, String question) {
//        this.answers = Optional.ofNullable(answers);
//        this.correct = Optional.ofNullable(correct);
//        this.no = no;
//        this.question = question;
//    }

    public Questions() { }

    @DynamoDBAttribute(attributeName = "answers")
    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    @DynamoDBAttribute(attributeName = "correct")
    public List<String> getCorrect() {
        return correct;
    }

    public void setCorrect(List<String> correct) {
        this.correct = correct;
    }

    @DynamoDBAttribute(attributeName = "no")
    public Integer getNo() {
        return no;
    }

    public void setNo(Integer no) {
        this.no = no;
    }


    @DynamoDBAttribute(attributeName = "question")
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
