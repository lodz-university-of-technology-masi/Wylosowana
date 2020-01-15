package wylosowana.creators;

import com.fasterxml.jackson.databind.JsonNode;
import wylosowana.model.Test.LangObject;
import wylosowana.model.Test.Test;

import java.util.ArrayList;
import java.util.List;

public class TestCreator {
    public static Test createTestJSON(JsonNode body, ArrayList<LangObject> langs, List<String> candidates){
//        Test test = new Test();
//        test.setTitle(body.get("testName").asText());
//        test.setLangs(langs);
//        test.setCandidateLogins(candidates);
        return null;
    }



    public static Test createUpdateTestJSON(JsonNode body, ArrayList<LangObject> langs, List<String> candidates){
        Test test = TestCreator.createTestJSON(body, langs, candidates);
        test.setId(body.get("id").asText());
        return test;
    }

    public static Test UpdateTestLanguageJSON(LangObject lang, Test test){
        test.addLang(lang);
        return test;
    }



}
