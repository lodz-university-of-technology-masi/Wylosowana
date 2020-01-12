package wylosowana.converters;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import wylosowana.model.TestAnswers.Answers;

import java.util.List;

public class AnswersConverter implements DynamoDBTypeConverter<String, List<Answers>> {
    @Override
    public String convert(List<Answers> langObjects) {
        return new Gson().toJson(langObjects);
    }

    @Override
    public List<Answers> unconvert(String s) {
        return new Gson().fromJson(s, new TypeToken<List<Answers>>() {
        }.getType());
    }
}

