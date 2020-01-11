package wylosowana.lambda.csv;

//1;O;EN;List at least two corporate values at IBM;|;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.serverless.ApiGatewayResponse;
import wylosowana.responses.ApiResponseHandler;
import wylosowana.service.s3.BucketService;

import java.io.File;
import java.util.Map;

public class Import implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private ObjectMapper mapper = new ObjectMapper();

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

            return ApiResponseHandler.createResponse("sucess", 400);
    }
}
