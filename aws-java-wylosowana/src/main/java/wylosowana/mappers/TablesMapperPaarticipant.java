package wylosowana.mappers;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.serverless.DynamoDBAdapter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import wylosowana.model.Participant;
import wylosowana.model.TestAnswers.TestAnswer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TablesMapperPaarticipant {
    private final Logger logger = LogManager.getLogger(this.getClass());
    private DynamoDBAdapter db_adapter;
    private AmazonDynamoDB client;
    private DynamoDBMapper mapper;


    public TablesMapperPaarticipant(){
        DynamoDBMapperConfig mapperConfig = DynamoDBMapperConfig.builder()
                .withTableNameOverride(new DynamoDBMapperConfig.TableNameOverride("participants_table"))
                .build();
        this.db_adapter = DynamoDBAdapter.getInstance();
        this.client = this.db_adapter.getDbClient();
        this.mapper = this.db_adapter.createDbMapper(mapperConfig);
    }

    public Participant getAllParticipant(String id) throws IOException {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":p_id", new AttributeValue().withS(id));
        DynamoDBQueryExpression<Participant> query = new DynamoDBQueryExpression<Participant>()
                .withKeyConditionExpression("id = :p_id")
                .withExpressionAttributeValues(eav);
        return this.mapper.query(Participant.class, query).get(0);

    }


    public List<Participant> getAllParticipants() throws IOException {
        DynamoDBScanExpression scanExp = new DynamoDBScanExpression();
        List<Participant> results = this.mapper.scan(Participant.class, scanExp);
        return results;
    }


    public void saveParticipant(Participant participant) throws IOException {
        this.mapper.save(participant);
    }


    public List<Participant> getTestUsers(String testId) throws IOException{
        List<TestAnswer> answers = new TablesMapperAnswers().getObjectsWithTestId(testId);
        List<Participant> answer = new ArrayList<Participant>();
        for(TestAnswer ans : answers){
          //      answer.add(this.getAllParticipant(ans.getUserId()));
        }
        return answer;
    }

    public void deleteParticipant(String id) throws IOException {
        Participant result = this.mapper.load(Participant.class, id);
        this.mapper.delete(result);
    }
}
