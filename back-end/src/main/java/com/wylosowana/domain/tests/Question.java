package com.wylosowana.domain.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.util.CollectionUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@DynamoDBDocument
public class Question {
    private int no;
    private String question;
    private List<String> answers;
    private List<String> correct;

    @JsonIgnore
    public boolean isOpen() {
        return CollectionUtils.isNullOrEmpty(answers) && CollectionUtils.isNullOrEmpty(correct);
    }

    @JsonIgnore
    public boolean isClosed() {
        return !isOpen();
    }

    @DynamoDBAttribute(attributeName = "no")
    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    @DynamoDBAttribute(attributeName = "question")
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

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
}
