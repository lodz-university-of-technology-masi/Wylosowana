package wylosowana.converters;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import wylosowana.model.Test.LangObject;

import java.util.List;

public class LangConverter implements DynamoDBTypeConverter<String, List<LangObject>> {
    @Override
    public String convert(List<LangObject> langObjects) {
        return new Gson().toJson(langObjects);
    }

    @Override
    public List<LangObject> unconvert(String s) { return new Gson().fromJson(s, new TypeToken<List<LangObject>>(){}.getType()); }
}

