package wylosowana.creators;

import com.fasterxml.jackson.databind.JsonNode;
import wylosowana.model.Test.LangObject;
import wylosowana.model.Test.Test;

import java.util.List;

public class TestCreator {
    public static Test createTestJSON(JsonNode body, List<LangObject> langs, List<String> candidates){
        Test test = new Test();
        test.setTitle(body.get("title").asText());
        test.setLanguage(body.get("language").asText());
        test.setLangs(langs);
        test.setCandidateLogins(candidates);
        return test;
    }



    public static Test createUpdateTestJSON(JsonNode body, List<LangObject> langs, List<String> candidates){
        Test test = TestCreator.createTestJSON(body, langs, candidates);
        test.setId(body.get("id").asText());
        return test;
    }
}
