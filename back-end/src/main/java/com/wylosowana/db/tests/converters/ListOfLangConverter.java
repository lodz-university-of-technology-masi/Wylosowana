package com.wylosowana.db.tests.converters;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wylosowana.domain.tests.Lang;

import java.util.List;

public class ListOfLangConverter implements DynamoDBTypeConverter<String, List<Lang>> {

    public final static Gson converter = new Gson();

    @Override
    public String convert(List<Lang> langs) {
        return converter.toJson(langs);
    }

    @Override
    public List<Lang> unconvert(String s) {
        return new Gson().fromJson(s, new TypeToken<List<Lang>>(){}.getType());
    }
}
