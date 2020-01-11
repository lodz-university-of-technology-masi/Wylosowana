package wylosowana.lambda.tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import wylosowana.mappers.TablesMapperPaarticipant;
import wylosowana.mappers.TablesMapperTest;
import wylosowana.model.Participant;
import wylosowana.model.Test;
import wylosowana.responses.ApiResponseHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public class ReadMyTests implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");

        try {
            List<Test> tests = new TablesMapperTest().getUserTest(pathParameters.get("userId"));
            return ApiResponseHandler.createResponse(tests, 200);
        } catch (IOException e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
