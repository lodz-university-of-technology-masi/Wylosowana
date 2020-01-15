package wylosowana.OwnLambda.Tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import wylosowana.mappers.TablesMapperTest;
import wylosowana.model.Test.Test;
import wylosowana.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class UpdateTestCandidates implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private final Logger logger = LogManager.getLogger(this.getClass());

    // AddTestTranslation
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        TablesMapperTest tablesMapperTest = new TablesMapperTest();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode body = objectMapper.convertValue(input.get("candidateLogins"), JsonNode.class);

            Test test = new TablesMapperTest().getTest((String) input.get("id"));
            test.setCandidateLogins( objectMapper.treeToValue(body, ArrayList.class));

            tablesMapperTest.saveTest(test);
            return ApiResponseHandler.createResponse("sucess.", 200);

        } catch (IOException e) {
            logger.error("Error in getting Answers: " + e);
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
