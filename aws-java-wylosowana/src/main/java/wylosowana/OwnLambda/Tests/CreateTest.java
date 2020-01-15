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
import java.util.Map;

public class CreateTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private final Logger logger = LogManager.getLogger(this.getClass());

        // postTest
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        TablesMapperTest tablesMapperTest = new TablesMapperTest();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode body = objectMapper.convertValue(input, JsonNode.class);
            Test test = objectMapper.treeToValue(body, Test.class);

            tablesMapperTest.saveTest(test);
            return ApiResponseHandler.createResponse("sucess.", 200);

        } catch (IOException e) {
            logger.error("Error in getting Answers: " + e);
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
