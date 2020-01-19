package com.wylosowana.domain.tests;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.wylosowana.db.tests.converters.ListOfLangConverter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@DynamoDBTable(tableName = "SHOULD_BE_OVERRIDDEN")
public class Test implements Serializable {
    public static final String TESTS_TABLE_NAME = System.getenv("TESTS_TABLE_NAME");
    private static final long serialVersionUID = 3770134645057297509L;

    private String id;
    private String testName;
    private String recruiterLogin;
    private List<Lang> langs;
    private List<String> candidateLogins;

    @DynamoDBHashKey(attributeName = "id")
    @DynamoDBAutoGeneratedKey
    public String getId() {
        return id;
    }

    @DynamoDBAttribute(attributeName = "testName")
    public String getTestName() {
        return testName;
    }

    @DynamoDBAttribute(attributeName = "langs")
    @DynamoDBTypeConverted(converter = ListOfLangConverter.class)
    public List<Lang> getLangs() {
        return langs;
    }

    @DynamoDBAttribute(attributeName = "candidateLogins")
    public List<String> getCandidateLogins() {
        return candidateLogins;
    }

    @DynamoDBAttribute(attributeName = "recruiterLogin")
    public String getRecruiterLogin() {
        return recruiterLogin;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public void setLangs(List<Lang> langs) {
        this.langs = langs;
    }

    public void setCandidateLogins(List<String> candidateLogins) {
        this.candidateLogins = candidateLogins;
    }

    public void setRecruiterLogin(String recruiterLogin) {
        this.recruiterLogin = recruiterLogin;
    }

    @Override
    public String toString() {
        return "Test{" +
                "id='" + id + '\'' +
                ", testName='" + testName + '\'' +
                ", recruiterLogin='" + recruiterLogin + '\'' +
                ", langs=" + langs +
                ", candidateLogins=" + candidateLogins +
                '}';
    }
}