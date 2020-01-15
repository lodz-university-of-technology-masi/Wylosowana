package wylosowana.OwnLambda.Tests;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import wylosowana.mappers.TablesMapperTest;
import wylosowana.model.Test.Test;
import wylosowana.responses.ApiResponseHandler;

import java.util.Map;

public class ReadTest  implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

        // getTest
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

        try {
            Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
            Test test = new TablesMapperTest().getTest(pathParameters.get("id"));
            return ApiResponseHandler.createResponse(test, 200);
        } catch (Exception  e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}