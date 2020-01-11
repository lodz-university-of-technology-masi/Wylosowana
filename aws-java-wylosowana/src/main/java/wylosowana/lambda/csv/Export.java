package wylosowana.lambda.csv;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import wylosowana.responses.ApiResponseHandler;

import java.util.Map;

public class Export implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        return ApiResponseHandler.createResponse(input.get("body"), 400);
    }
}
