package wylosowana.mappers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.serverless.DynamoDBAdapter;
import wylosowana.model.Test.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TablesMapperTest {
    private DynamoDBAdapter db_adapter;
    private AmazonDynamoDB client;
    private DynamoDBMapper mapper;


    public TablesMapperTest() {
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride("Tests"))
                .build();
        this.db_adapter = DynamoDBAdapter.getInstance();
        this.client = this.db_adapter.getDbClient();
        this.mapper = this.db_adapter.createDbMapper(mapperConfig);
    }


    public List<Test> getAllTests() throws IOException {
        List<Test> results = this.mapper.scan(Test.class, new DynamoDBScanExpression());
        return results;
    }


    public void saveTest(Test test) throws IOException {
        this.mapper.save(test);
    }

    public void deleteTest(String id) throws IOException {
        Test result = this.getTest(id);
        new TablesMapperAnswers().deleteAllTestsOnList(id);
        this.mapper.delete(result);
    }

    public void updateTest(Test test) throws IOException {
        this.mapper.delete(test);
        this.saveTest(test);
    }

    public Test getTest(String id) throws IOException {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":t_id", new AttributeValue().withS(id));
        DynamoDBQueryExpression<Test> query = new DynamoDBQueryExpression<Test>()
                .withKeyConditionExpression("id = :t_id")
                .withExpressionAttributeValues(eav);
        return this.mapper.query(Test.class, query).get(0);
    }


    public List<Test> getUserTest(String userId) throws IOException {
        List<Test> ans = new TablesMapperAnswers().getUserTests(userId);
        List<Test> answer = new ArrayList<>();
        // TODO sprawdzanie czy dany test nie jest juz napisany!
        return ans;
    }
}
