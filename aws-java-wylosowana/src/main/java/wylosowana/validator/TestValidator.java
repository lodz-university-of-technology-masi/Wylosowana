package wylosowana.validator;

import wylosowana.model.Question;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

public class TestValidator {
    public static boolean checkLanguages(LinkedHashMap<String, String> languageObject){
        return (languageObject.get("label").equals("Polish") || languageObject.get("label").equals("English")
        || languageObject.get("label").equals("polish") || languageObject.get("label").equals("english"))
                && (languageObject.get("value").equals("pl") || languageObject.get("value").equals("en"));
    }


    public static boolean checkNulls(Map<String, Object> input){
        return (LinkedHashMap<String, String>) input.get("language") != null
                && input.get("title").toString() != null
                && (ArrayList<Question>) input.get("questions") != null;
    }
}
