package wylosowana.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import wylosowana.creators.TestCreator;
import wylosowana.mappers.TablesMapperTest;
import wylosowana.model.Test;
import wylosowana.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class CreateTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private ObjectMapper mapper = new ObjectMapper();

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        TablesMapperTest tablesMapperTest = new TablesMapperTest();
        Test test = new Test();
        try {
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));

            // wlasna implementacja
            test = TestCreator.createTestJSON(body, mapper.convertValue(body.get("questions"), ArrayList.class));
            tablesMapperTest.saveTest(test);
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
