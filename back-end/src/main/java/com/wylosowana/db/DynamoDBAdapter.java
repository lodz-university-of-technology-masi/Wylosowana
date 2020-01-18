package com.wylosowana.db;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import lombok.Data;

import java.util.Objects;

@Data
public class DynamoDBAdapter {

    private final AmazonDynamoDB client;
    private static DynamoDBAdapter dbAdapter;
    private DynamoDBMapper mapper;

    private DynamoDBAdapter() {
        this.client = AmazonDynamoDBClientBuilder.standard()
                .withRegion(Regions.US_EAST_1)
                .build();
    }

    public static DynamoDBAdapter getInstance() {
        if (Objects.equals(dbAdapter, null)) {
            dbAdapter = new DynamoDBAdapter();
        }

        return dbAdapter;
    }

    public DynamoDBMapper createDbMapper(DynamoDBMapperConfig mapperConfig) {
        if (this.client != null) {
            mapper = new DynamoDBMapper(this.client, mapperConfig);
        }

        return this.mapper;
    }
}
