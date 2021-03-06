package com.wylosowana.db.answers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.wylosowana.db.DynamoDBAdapter;
import com.wylosowana.db.exceptions.ElementNotExist;
import com.wylosowana.domain.answers.Answer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class DynamoDBAnswerDao implements AnswerDao {

    private static DynamoDBAdapter dbAdapter;
    private static AmazonDynamoDB dbClient;
    private static DynamoDBMapper dbMapper;

    public DynamoDBAnswerDao() {
        if (dbAdapter == null) {
            dbAdapter = DynamoDBAdapter.getInstance();
        }

        if (dbClient == null) {
            dbClient = dbAdapter.getClient();
        }

        if (dbMapper == null) {
            DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder().withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(Answer.ANSWER_TABLE_NAME)).build();
            dbMapper = dbAdapter.createDbMapper(mapperConfig);
        }
    }

    @Override
    public List<Answer> findAll() {
        return dbMapper.scan(Answer.class, new DynamoDBScanExpression());
    }

    @Override
    public Optional<Answer> findById(String id) {
        return Optional.ofNullable(dbMapper.load(Answer.class, id));
    }

    @Override
    public Optional<Answer> save(Answer answer) {
        if (answer == null) {
            throw new IllegalArgumentException("You cannot save null!");
        }
        dbMapper.save(answer);
        return findById(answer.getId());
    }

    @Override
    public void delete(Answer answer) throws ElementNotExist {
        if (answer != null) {
            findById(answer.getId()).orElseThrow(ElementNotExist::new);
            dbMapper.delete(answer);
        }
        throw new ElementNotExist("You cannot ask for deleting null!");
    }

    @Override
    public boolean existsById(String id) {
        return findById(id).isPresent();
    }

    @Override
    public Optional<Answer> findByTestIdAndLogin(String testId, String login) {
        Map<String, AttributeValue> attributeValues = new HashMap();
        attributeValues.put(":testId", new AttributeValue().withS(testId));
        DynamoDBScanExpression scanRequest = new DynamoDBScanExpression()
                .withFilterExpression("login = :login")
                .withFilterExpression("testId = :testId")
                .withExpressionAttributeValues(attributeValues);

        return dbMapper.scan(Answer.class, scanRequest).stream().findFirst();
    }

    @Override
    public List<Answer> findByTestId(String testId) {
        Map<String, AttributeValue> attributeValues = new HashMap();
        attributeValues.put(":testId", new AttributeValue().withS(testId));
        DynamoDBScanExpression scanRequest = new DynamoDBScanExpression()
                .withFilterExpression("testId = :testId")
                .withExpressionAttributeValues(attributeValues);

        return dbMapper.scan(Answer.class, scanRequest);
    }
}
