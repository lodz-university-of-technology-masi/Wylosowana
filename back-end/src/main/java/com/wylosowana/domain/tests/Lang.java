package com.wylosowana.domain.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.util.List;

@DynamoDBDocument
public class Lang {
    private String lang;
    private List<Question> questions;

    @DynamoDBAttribute(attributeName = "lang")
    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    @DynamoDBAttribute(attributeName = "questions")
    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "Lang{" +
                "lang='" + lang + '\'' +
                ", questions=" + questions +
                '}';
    }
}
