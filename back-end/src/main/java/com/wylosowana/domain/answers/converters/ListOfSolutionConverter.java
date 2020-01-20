package com.wylosowana.domain.answers.converters;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.wylosowana.domain.answers.Solution;

import java.util.List;

public class ListOfSolutionConverter implements DynamoDBTypeConverter<String, List<Solution>> {

    public final static Gson converter = new Gson();

    @Override
    public String convert(List<Solution> solutions) {
        return converter.toJson(solutions);
    }

    @Override
    public List<Solution> unconvert(String s) {
        return new Gson().fromJson(s, new TypeToken<List<Solution>>(){}.getType());
    }
}
