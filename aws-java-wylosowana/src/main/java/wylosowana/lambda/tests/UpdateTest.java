package wylosowana.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import wylosowana.creators.TestCreator;
import wylosowana.mappers.TablesMapperTest;
import wylosowana.model.Test.Test;
import wylosowana.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class UpdateTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private ObjectMapper mapper = new ObjectMapper();
    private TablesMapperTest tablesMapperTest;

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        this.tablesMapperTest = new TablesMapperTest();
        Test test = new Test();
        try {
            JsonNode body = new ObjectMapper().readTree((String) input.get("body"));
            test = TestCreator.createUpdateTestJSON(body,
                    mapper.convertValue(body.get("langs"), ArrayList.class),
                    mapper.convertValue(body.get("candidate_logins"), ArrayList.class));
            this.tablesMapperTest.updateTest(test);
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}
