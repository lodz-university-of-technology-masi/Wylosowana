package wylosowana.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import wylosowana.mappers.TablesMapperTest;
import wylosowana.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.Map;

public class DeleteTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private TablesMapperTest tablesMapperTest;
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
        tablesMapperTest = new TablesMapperTest();
        try {
            tablesMapperTest.deleteTest(pathParameters.get("id"));
            return ApiResponseHandler.createResponse("sucess.", 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database." , 401);
        }
    }

}
