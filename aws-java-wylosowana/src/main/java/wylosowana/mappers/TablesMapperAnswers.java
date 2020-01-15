package wylosowana.mappers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.serverless.DynamoDBAdapter;
import wylosowana.creators.TestAnswerCreator;
import wylosowana.model.Test.Test;
import wylosowana.model.TestAnswers.TestAnswer;
import wylosowana.model.TestResult;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TablesMapperAnswers {
    private DynamoDBAdapter db_adapter;
    private AmazonDynamoDB client;
    private DynamoDBMapper mapper;


    public TablesMapperAnswers(){
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride("Answers"))
                .build();
        this.db_adapter = DynamoDBAdapter.getInstance();
        this.client = this.db_adapter.getDbClient();
        this.mapper = this.db_adapter.createDbMapper(mapperConfig);
    }


    public List<TestAnswer> getAllTestAnswers() throws IOException {
        List<TestAnswer> results = this.mapper.scan(TestAnswer.class, new DynamoDBScanExpression());
        return results;
    }


    public TestAnswer getUserTestAnswers(String userId, String testId) throws IOException {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":v_u_id", new AttributeValue().withS(userId));
        eav.put(":v_t_id", new AttributeValue().withS(testId));
        DynamoDBQueryExpression<TestAnswer> query = new DynamoDBQueryExpression<TestAnswer>()
                .withKeyConditionExpression("userId = :v_u_id and testId = :v_t_id")
                .withExpressionAttributeValues(eav);
        return this.mapper.query(TestAnswer.class, query).get(0);
    }

    public void deleteTestAnswer(String id) throws IOException {
        TestAnswer result = this.getTestAnswer(id);
        this.mapper.delete(result);
    }

    public TestAnswer getTestAnswer(String id) throws IOException {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":v_t_id", new AttributeValue().withS(id));
        DynamoDBQueryExpression<TestAnswer> query = new DynamoDBQueryExpression<TestAnswer>()
                .withKeyConditionExpression("testId = :v_t_id")
                .withExpressionAttributeValues(eav);
        return this.mapper.query(TestAnswer.class, query).get(0);
    }


    public List<TestAnswer> getTestUsers(String login) throws IOException{
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(login));
        DynamoDBScanExpression scanRequest = new DynamoDBScanExpression()
                .withFilterExpression("login = :val1")
                .withExpressionAttributeValues(eav);

        return this.mapper.scan(TestAnswer.class, scanRequest);
    }

    public List<TestResult> getResultUser(String userId) throws IOException{
        List<TestAnswer> all = this.getUserTestsUSLS(userId);
        List<TestResult> answer = new ArrayList<TestResult>();
        for(TestAnswer ans : all){
         //   if(ans.getResult() != null)

       //         answer.add(new TestResult(new TablesMapperTest().getTest(ans.getTestId()).getTitle()  , ans.getResult()));
        }

        return answer;
    }


    public List<TestAnswer> getObjectsWithTestId(String testId) throws IOException {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(testId));
        DynamoDBScanExpression scanRequest = new DynamoDBScanExpression()
                .withFilterExpression("testId = :val1")
                .withExpressionAttributeValues(eav);
        return this.mapper.scan(TestAnswer.class, scanRequest);
    }




    public void saveTestAnswer(TestAnswer answer) throws IOException {
        this.mapper.save(answer);
    }



    public void saveUsersToTest(String testId, List<String> userId) throws IOException {
        for(String uId : userId)
            this.mapper.save(TestAnswerCreator.addUserToTest(uId, testId));
    }

    public void updateTestAnswer(TestAnswer answer) throws IOException {
        this.mapper.delete(answer);
        this.mapper.save(answer);
    }


    public List<Test> getUserTests(String userId) throws IOException {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":candidate_login", new AttributeValue().withS(userId));
        DynamoDBScanExpression scanRequest = new DynamoDBScanExpression()
                .withProjectionExpression("id, testName, langs")
                .withFilterExpression("contains(candidate_logins, :candidate_login)")
                .withExpressionAttributeValues(eav);
        return this.mapper.scan(Test.class, scanRequest);
    }

    public List<TestAnswer> getUserTestsUSLS(String userId) throws IOException {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(userId));
        DynamoDBScanExpression scanRequest = new DynamoDBScanExpression()
                .withFilterExpression("userId = :val1")
                .withExpressionAttributeValues(eav);
        return this.mapper.scan(TestAnswer.class, scanRequest);
    }


    public void deleteAllTestsOnList(String testId) throws IOException{
        List<TestAnswer> tests =  this.getObjectsWithTestId(testId);
        for(TestAnswer answer : tests){
            this.mapper.delete(answer);
        }
    }
}
