package wylosowana.model.Test;

public class LangObject {

    private String lang;
    private Questions questions;

    public LangObject(String lang, Questions questions) {
        this.lang = lang;
        this.questions = questions;
    }

    public LangObject() { }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public Questions getQuestions() {
        return questions;
    }

    public void setQuestions(Questions questions) {
        this.questions = questions;
    }
}
