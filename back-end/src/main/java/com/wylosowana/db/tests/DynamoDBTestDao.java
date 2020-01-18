package com.wylosowana.db.tests;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.wylosowana.db.DynamoDBAdapter;
import com.wylosowana.db.exceptions.ElementNotExist;
import com.wylosowana.domain.tests.Test;
import lombok.extern.apachecommons.CommonsLog;

import java.util.List;
import java.util.Optional;

@CommonsLog
public class DynamoDBTestDao implements TestDao {

    private static DynamoDBAdapter dbAdapter;
    private static AmazonDynamoDB dbClient;
    private static DynamoDBMapper dbMapper;

    public DynamoDBTestDao() {
        if (dbAdapter == null) {
            dbAdapter = DynamoDBAdapter.getInstance();
        }

        if (dbClient == null) {
            dbClient = dbAdapter.getClient();
        }

        if (dbMapper == null) {
            DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder().withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride(Test.TESTS_TABLE_NAME)).build();
            dbMapper = dbAdapter.createDbMapper(mapperConfig);
        }
    }

    @Override
    public Optional<Test> findById(String id) {
        return Optional.ofNullable(dbMapper.load(Test.class, id));
    }

    @Override
    public List<Test> findAll() {
        return dbMapper.scan(Test.class, new DynamoDBScanExpression());
    }

    @Override
    public void delete(Test test) throws ElementNotExist {
        if(test != null){
            findById(test.getId()).orElseThrow(ElementNotExist::new);
            dbMapper.delete(test);
        }
        throw new ElementNotExist("You cannot ask for deleting null!");
    }

    @Override
    public Optional<Test> save(Test test) {
        dbMapper.save(test);
        return findById(test.getId());
    }
}
