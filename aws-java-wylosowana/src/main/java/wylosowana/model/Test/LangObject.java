package wylosowana.model.Test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.util.ArrayList;

@DynamoDBDocument
public class LangObject {

    private String lang;
    private ArrayList<Questions> questions;

//    public LangObject(String lang, Questions questions) {
//        this.lang = lang;
//        this.questions = questions;
//    }

    public LangObject() { }

    @DynamoDBAttribute(attributeName = "lang")
    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    @DynamoDBAttribute(attributeName = "questions")
    public ArrayList<Questions> getQuestions() {
        return questions;
    }

    public void setQuestions(ArrayList<Questions> questions) {
        this.questions = questions;
    }

}
