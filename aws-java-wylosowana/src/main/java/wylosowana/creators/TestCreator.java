package wylosowana.creators;

import com.fasterxml.jackson.databind.JsonNode;
import wylosowana.model.Language;
import wylosowana.model.Question;
import wylosowana.model.Test;

import java.util.List;

public class TestCreator {
    public static Test createTestJSON(JsonNode body, List<Question> questions){
        Test test = new Test();
        JsonNode language = body.get("language");
        test.setTitle(body.get("title").asText());
        test.setLanguage(new Language(language.get("label").textValue(), language.get("value").textValue()));
        test.setQuestions(questions);
        return test;
    }



    public static Test createUpdateTestJSON(JsonNode body, List<Question> questions){
        Test test = TestCreator.createTestJSON(body, questions);
        test.setId(body.get("id").asText());
        return test;
    }
}
